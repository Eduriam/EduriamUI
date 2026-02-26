import { ContentContainer } from "@eduriam/ui-core";
import { keyframes } from "@emotion/react";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Box, Stack, useMediaQuery } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

import { ID } from "../../models/ID";
import { STUDY_SESSION_LOCALIZATION_DEFAULT } from "./StudySessionLocalizationDefault";
import StudySessionDrawer, {
  StudySessionDrawerVariant,
} from "./components/StudySessionDrawer/StudySessionDrawer";
import { StudySessionNavigationButton } from "./components/StudySessionNavigationButton";
import StudySessionProgressBar from "./components/StudySessionProgressBar/StudySessionProgressBar";
import { StudySessionStats } from "./components/StudySessionStats/StudySessionStats";
import { XP_PER_EXERCISE } from "./components/StudySessionStats/studySessionStatsConfig";
import { StudyBlockDTO as StudyBlockModel } from "./components/study-blocks/StudyBlockDTO";
import { ExerciseStudyBlock } from "./components/study-blocks/exercise/ExerciseStudyBlock";
import { ExplanationStudyBlock } from "./components/study-blocks/explanation/ExplanationStudyBlock";
import { StudySessionAudioProvider } from "./context/StudySessionAudioContext";
import {
  type TransitionDirection,
  useStudySessionTransition,
} from "./hooks/useStudySessionTransition";
import { useSwipeNavigation } from "./hooks/useSwipeNavigation";
import { AnswerState } from "./types/AnswerState";
import type { StudySessionDTO as StudySessionModel } from "./types/StudySessionDTO";
import type { StudySessionDataTest } from "./types/StudySessionDataTest";
import type { StudySessionLocalization } from "./types/StudySessionLocalization";

const slideForward = keyframes({
  "0%": { transform: "translate3d(0, 0, 0)" },
  "49.99%": { transform: "translate3d(-100%, 0, 0)" },
  "50%": { transform: "translate3d(100%, 0, 0)" },
  "100%": { transform: "translate3d(0, 0, 0)" },
});

const slideBack = keyframes({
  "0%": { transform: "translate3d(0, 0, 0)" },
  "49.99%": { transform: "translate3d(100%, 0, 0)" },
  "50%": { transform: "translate3d(-100%, 0, 0)" },
  "100%": { transform: "translate3d(0, 0, 0)" },
});

export interface AtomProgressRating {
  atomId: ID;
  rating: number;
}

export interface IStudySession {
  studySession: StudySessionModel;
  onFinish: (atomProgressRatings: AtomProgressRating[]) => void;
  onExit: () => void;
  onReportStudyBlockClick?: (studyBlock: Pick<StudyBlockModel, "id" | "type">) => void;
  localization?: StudySessionLocalization;
  dataTest?: StudySessionDataTest;
}

interface AtomStats {
  right: number;
  wrong: number;
}

const StudySession: React.FC<IStudySession> = ({
  studySession,
  onFinish,
  onExit,
  onReportStudyBlockClick,
  localization: localizationProp,
  dataTest,
}) => {
  const localization = localizationProp ?? STUDY_SESSION_LOCALIZATION_DEFAULT;
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const [finishedSession, setFinishedSession] = useState(false);
  const [index, setIndex] = useState(0);
  const [drawerVariant, setDrawerVariant] =
    useState<StudySessionDrawerVariant | null>(null);
  const [checkedResult, setCheckedResult] = useState<AnswerState | null>(null);
  const [studyBlockQueue, setStudyBlockQueue] = useState(
    studySession.studyBlocks,
  );

  const [furthestCompletedIndex, setFurthestCompletedIndex] = useState(-1);
  const [completedResults, setCompletedResults] = useState<
    Map<number, StudySessionDrawerVariant>
  >(new Map());
  const [playDrawerSound, setPlayDrawerSound] = useState(false);
  const [exerciseRenderVersion, setExerciseRenderVersion] = useState(0);
  const [wrongAttemptsByIndex, setWrongAttemptsByIndex] = useState<
    Map<number, number>
  >(new Map());

  const [atomStatsMap, setAtomStatsMap] = useState<Map<ID, AtomStats>>(
    new Map(),
  );

  const startedAtRef = useRef(Date.now());
  const [finishedStatsSnapshot, setFinishedStatsSnapshot] = useState<{
    totalXp: number;
    timeStudiedMs: number;
    correctRate: number;
    conceptCount: number;
  } | null>(null);

  const exerciseBlockCount = useMemo(
    () => studySession.studyBlocks.filter((b) => b.type === "exercise").length,
    [studySession.studyBlocks],
  );

  const conceptCount = useMemo(
    () => new Set(studySession.studyBlocks.map((b) => b.atomId)).size,
    [studySession.studyBlocks],
  );

  const {
    triggerTransition,
    isTransitioning,
    direction,
    transitionDurationMs,
  } = useStudySessionTransition();

  const drawerTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(drawerTimeoutRef.current), []);

  // ---------------------------------------------------------------------------
  // Navigation helpers
  // ---------------------------------------------------------------------------

  const canGoBack = index > 0 && !isTransitioning;
  const canGoForward =
    index <= furthestCompletedIndex &&
    index + 1 < studyBlockQueue.length &&
    !isTransitioning;

  const navigateTo = useCallback(
    (targetIndex: number, dir: TransitionDirection) => {
      clearTimeout(drawerTimeoutRef.current);
      setDrawerVariant(null);
      setCheckedResult(null);

      triggerTransition(() => {
        setIndex(targetIndex);
      }, dir);

      const storedResult = completedResults.get(targetIndex);
      if (storedResult) {
        drawerTimeoutRef.current = setTimeout(() => {
          setPlayDrawerSound(false);
          setDrawerVariant(storedResult);
          setCheckedResult(storedResult === "correct" ? "RIGHT" : "WRONG");
        }, transitionDurationMs);
      }
    },
    [triggerTransition, completedResults, transitionDurationMs],
  );

  const handleGoBack = useCallback(() => {
    if (index > 0 && !isTransitioning) {
      navigateTo(index - 1, "back");
    }
  }, [index, isTransitioning, navigateTo]);

  const handleGoForward = useCallback(() => {
    if (
      index <= furthestCompletedIndex &&
      index + 1 < studyBlockQueue.length &&
      !isTransitioning
    ) {
      navigateTo(index + 1, "forward");
    }
  }, [
    index,
    furthestCompletedIndex,
    studyBlockQueue.length,
    isTransitioning,
    navigateTo,
  ]);

  useSwipeNavigation({
    onSwipeLeft: handleGoForward,
    onSwipeRight: handleGoBack,
    enabled: !desktop && !finishedSession,
  });

  // ---------------------------------------------------------------------------
  // Exercise completion
  // ---------------------------------------------------------------------------

  function rescheduleStudyBlock(studyBlock: StudyBlockModel) {
    setStudyBlockQueue((prev) => [...prev, studyBlock]);
  }

  function handleContinue(result: AnswerState, skippedExercise = false) {
    clearTimeout(drawerTimeoutRef.current);
    setDrawerVariant(null);
    setCheckedResult(null);
    setWrongAttemptsByIndex((prev) => {
      if (!prev.has(index)) return prev;
      const next = new Map(prev);
      next.delete(index);
      return next;
    });

    const variant: StudySessionDrawerVariant =
      result === "RIGHT" ? "correct" : "incorrect";
    setCompletedResults((prev) => new Map(prev).set(index, variant));
    setFurthestCompletedIndex((prev) => Math.max(prev, index));

    const currentBlock = studyBlockQueue[index];
    const atomId = currentBlock.atomId;
    const hadWrongAttempt = (wrongAttemptsByIndex.get(index) ?? 0) > 0;
    const shouldRescheduleReviewBlock =
      currentBlock.type === "exercise" &&
      currentBlock.mode === "review" &&
      result === "RIGHT" &&
      hadWrongAttempt &&
      !skippedExercise;

    setAtomStatsMap((prev) => {
      const next = new Map(prev);
      const prevStats = next.get(atomId) ?? { right: 0, wrong: 0 };
      const updated: AtomStats = {
        right: prevStats.right + (result === "RIGHT" ? 1 : 0),
        wrong: prevStats.wrong + (result === "WRONG" ? 1 : 0),
      };
      next.set(atomId, updated);
      return next;
    });

    if (shouldRescheduleReviewBlock) {
      rescheduleStudyBlock(currentBlock);
    }

    if (index < studyBlockQueue.length - 1) {
      triggerTransition(() => {
        setIndex(index + 1);
      }, "forward");
    } else {
      setFinishedSession(true);

      const updatedMap = new Map(atomStatsMap);
      const prevStats = updatedMap.get(atomId) ?? { right: 0, wrong: 0 };
      updatedMap.set(atomId, {
        right: prevStats.right + (result === "RIGHT" ? 1 : 0),
        wrong: prevStats.wrong + (result === "WRONG" ? 1 : 0),
      });

      const { correctAnswerCount, incorrectAnswerCount } =
        evaluateAnswerCounts(updatedMap);
      const atomProgressRatings = computeAtomRatings(
        studySession.studyBlocks,
        updatedMap,
      );

      const total = correctAnswerCount + incorrectAnswerCount;
      setFinishedStatsSnapshot({
        totalXp: exerciseBlockCount * XP_PER_EXERCISE,
        timeStudiedMs: Date.now() - startedAtRef.current,
        correctRate: total > 0 ? (correctAnswerCount / total) * 100 : 0,
        conceptCount,
      });

      onFinish(atomProgressRatings);
    }
  }

  // ---------------------------------------------------------------------------
  // Explanation completion
  // ---------------------------------------------------------------------------

  function handleRetryExercise() {
    clearTimeout(drawerTimeoutRef.current);
    setDrawerVariant(null);
    setCheckedResult(null);
    setPlayDrawerSound(false);
    setCompletedResults((prev) => {
      if (!prev.has(index)) return prev;
      const next = new Map(prev);
      next.delete(index);
      return next;
    });
    setExerciseRenderVersion((prev) => prev + 1);
  }

  function handleExplanationComplete() {
    setFurthestCompletedIndex((prev) => Math.max(prev, index));

    if (index < studyBlockQueue.length - 1) {
      triggerTransition(() => {
        setIndex(index + 1);
      }, "forward");
    } else {
      setFinishedSession(true);

      const { correctAnswerCount, incorrectAnswerCount } =
        evaluateAnswerCounts(atomStatsMap);
      const atomProgressRatings = computeAtomRatings(
        studySession.studyBlocks,
        atomStatsMap,
      );

      const total = correctAnswerCount + incorrectAnswerCount;
      setFinishedStatsSnapshot({
        totalXp: exerciseBlockCount * XP_PER_EXERCISE,
        timeStudiedMs: Date.now() - startedAtRef.current,
        correctRate: total > 0 ? (correctAnswerCount / total) * 100 : 0,
        conceptCount,
      });

      onFinish(atomProgressRatings);
    }
  }

  // ---------------------------------------------------------------------------
  // Stats helpers
  // ---------------------------------------------------------------------------

  function evaluateAnswerCounts(statsMap: Map<ID, AtomStats>) {
    let correctAnswerCount = 0;
    let incorrectAnswerCount = 0;

    statsMap.forEach((stats) => {
      correctAnswerCount += stats.right;
      incorrectAnswerCount += stats.wrong;
    });

    return {
      correctAnswerCount,
      incorrectAnswerCount,
    };
  }

  function computeAtomRatings(
    blocks: StudyBlockModel[],
    statsMap: Map<ID, AtomStats>,
  ): AtomProgressRating[] {
    const totalBlocksPerAtom = new Map<ID, number>();
    blocks.forEach((b) => {
      totalBlocksPerAtom.set(
        b.atomId,
        (totalBlocksPerAtom.get(b.atomId) ?? 0) + 1,
      );
    });

    const ratings: AtomProgressRating[] = [];
    totalBlocksPerAtom.forEach((totalBlocks, atomId) => {
      const stats = statsMap.get(atomId);
      const attempts = (stats?.right ?? 0) + (stats?.wrong ?? 0);
      const rating = totalBlocks > 0 ? totalBlocks / Math.max(attempts, 1) : 0;
      ratings.push({ atomId, rating });
    });
    return ratings;
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const isRevisiting = index <= furthestCompletedIndex;
  const currentStudyBlock = studyBlockQueue[index];
  const currentExerciseAnswerExplanation =
    currentStudyBlock && currentStudyBlock.type === "exercise"
      ? currentStudyBlock.answerExplanation
      : undefined;
  const currentWrongAttempts = wrongAttemptsByIndex.get(index) ?? 0;
  const allowSkipExercise =
    !isRevisiting &&
    drawerVariant === "incorrect" &&
    checkedResult === "WRONG" &&
    currentWrongAttempts >= 3;

  return (
    <StudySessionAudioProvider>
      {finishedSession && finishedStatsSnapshot ? (
        <StudySessionStats
          totalXp={finishedStatsSnapshot.totalXp}
          timeStudiedMs={finishedStatsSnapshot.timeStudiedMs}
          correctRate={finishedStatsSnapshot.correctRate}
          conceptCount={finishedStatsSnapshot.conceptCount}
          onContinue={onExit}
          localization={localization}
          dataTest={dataTest}
        />
      ) : (
        <Stack
          data-test={dataTest?.studySessionPage ?? "study-session-page"}
          sx={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <StudySessionProgressBar
            currentIndex={index}
            furthestCompletedIndex={furthestCompletedIndex}
            total={studyBlockQueue.length}
            onExit={onExit}
          />

          <Box
            sx={{
              animation: isTransitioning
                ? `${direction === "forward" ? slideForward : slideBack} ${transitionDurationMs}ms ease-out both`
                : "none",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
              width: "100%",
            }}
          >
            <ContentContainer
              paddingTop="small"
              width="medium"
              justifyContent="space-between"
            >
              {studyBlockQueue[index] &&
                studyBlockQueue[index].type === "exercise" && (
                  <ExerciseStudyBlock
                    key={`${index}-${exerciseRenderVersion}`}
                    components={studyBlockQueue[index].components}
                    onCheck={(result) => {
                      setCheckedResult(result);
                      setPlayDrawerSound(true);
                      setDrawerVariant(
                        result === "RIGHT" ? "correct" : "incorrect",
                      );
                      if (result === "WRONG") {
                        setWrongAttemptsByIndex((prev) => {
                          const next = new Map(prev);
                          next.set(index, (next.get(index) ?? 0) + 1);
                          return next;
                        });
                      }
                    }}
                    localization={localization}
                    isRevisiting={isRevisiting}
                    dataTest={dataTest}
                  />
                )}
              {studyBlockQueue[index] &&
                studyBlockQueue[index].type === "explanation" && (
                  <ExplanationStudyBlock
                    key={index}
                    scenes={studyBlockQueue[index].scenes}
                    onComplete={handleExplanationComplete}
                    localization={localization}
                    dataTest={dataTest}
                  />
                )}
            </ContentContainer>
          </Box>

          {drawerVariant && (
            <StudySessionDrawer
              variant={drawerVariant}
              onReportClick={
                onReportStudyBlockClick && currentStudyBlock
                  ? () =>
                      onReportStudyBlockClick({
                        id: currentStudyBlock.id,
                        type: currentStudyBlock.type,
                      })
                  : undefined
              }
              answerExplanation={currentExerciseAnswerExplanation}
              onContinueOrRetryClick={() => {
                if (drawerVariant === "incorrect") {
                  handleRetryExercise();
                  return;
                }

                if (isRevisiting) {
                  const nextIndex = index + 1;
                  if (nextIndex < studyBlockQueue.length) {
                    navigateTo(nextIndex, "forward");
                  }
                } else {
                  if (!checkedResult) return;
                  handleContinue(checkedResult);
                }
              }}
              onSkipExerciseClick={() => {
                if (!checkedResult) return;
                handleContinue(checkedResult, true);
              }}
              allowSkipExercise={allowSkipExercise}
              playSound={playDrawerSound}
              localization={localization}
              dataTest={dataTest}
              primaryButtonDataTest={
                drawerVariant === "incorrect"
                  ? dataTest?.studySessionDrawer?.retryExerciseButton
                  : dataTest?.studySessionDrawer?.continueButton
              }
            />
          )}

          {desktop && canGoBack && (
            <StudySessionNavigationButton
              direction="prev"
              onClick={handleGoBack}
              data-test="study-session-nav-prev"
            />
          )}
          {desktop && canGoForward && (
            <StudySessionNavigationButton
              direction="next"
              onClick={handleGoForward}
              data-test="study-session-nav-next"
            />
          )}
        </Stack>
      )}
    </StudySessionAudioProvider>
  );
};

export default StudySession;
