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
import {
  StudyBlockMode,
  StudyBlockType,
} from "./components/study-blocks/StudyBlock";
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

export interface SelectedStudyBlockData {
  id: StudyBlockModel["id"];
  type: StudyBlockModel["type"];
  answerState: AnswerState | null;
  userAnswerReport: string;
}

/**
 * Props for the `StudySession` component.
 */
export interface IStudySession {
  /** Full session payload including ordered study blocks. */
  studySession: StudySessionModel;

  /** Called once when the session is completed with aggregated atom ratings. */
  onFinish: (atomProgressRatings: AtomProgressRating[]) => void;

  /** Called when the user exits after the session has finished. */
  onExit: () => void;

  /**
   * Called when the user quits while the session is still in progress.
   * Falls back to `onExit` when not provided.
   */
  onQuit?: () => void;

  /** Optional callback used by report actions for the currently selected study block. */
  onReportStudyBlockClick?: (studyBlockData: SelectedStudyBlockData) => void;

  /** Optional localization overrides for labels and copy. */
  localization?: StudySessionLocalization;

  /** Optional `data-test` mapping used by E2E tests. */
  dataTest?: StudySessionDataTest;

  /**
   * Controlled mute state for study session audio.
   * When provided, the parent owns mute state.
   */
  audioMuted?: boolean;

  /**
   * Called whenever mute state changes.
   * Useful for persistence (e.g. localStorage).
   */
  onAudioMutedChange?: (isMuted: boolean) => void;
}

interface AtomStats {
  right: number;
  wrong: number;
}

const StudySession: React.FC<IStudySession> = ({
  studySession,
  onFinish,
  onExit,
  onQuit,
  onReportStudyBlockClick,
  localization: localizationProp,
  dataTest,
  audioMuted,
  onAudioMutedChange,
}) => {
  const localization = localizationProp ?? STUDY_SESSION_LOCALIZATION_DEFAULT;
  const onQuitHandler = onQuit ?? onExit;
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const [finishedSession, setFinishedSession] = useState(false);
  const [index, setIndex] = useState(0);
  const [drawerVariant, setDrawerVariant] =
    useState<StudySessionDrawerVariant | null>(null);
  const [checkedResult, setCheckedResult] = useState<AnswerState | null>(null);
  const [userAnswerReport, setUserAnswerReport] = useState("");
  const [studyBlockQueue, setStudyBlockQueue] = useState(
    studySession.studyBlocks,
  );

  const [furthestCompletedIndex, setFurthestCompletedIndex] = useState(-1);
  const [completedResults, setCompletedResults] = useState<
    Map<number, StudySessionDrawerVariant>
  >(new Map());
  const [playDrawerSound, setPlayDrawerSound] = useState(false);
  const [exerciseRenderVersion, setExerciseRenderVersion] = useState(0);
  const [suppressExerciseAudioAutoplay, setSuppressExerciseAudioAutoplay] =
    useState(false);
  const [wrongAttemptsByIndex, setWrongAttemptsByIndex] = useState<
    Map<number, number>
  >(new Map());
  const [pauseExplanationVideo, setPauseExplanationVideo] = useState(false);

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
    () =>
      studySession.studyBlocks.filter(
        (b) => b.type === StudyBlockType.Exercise,
      ).length,
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
  useEffect(() => {
    setSuppressExerciseAudioAutoplay(false);
  }, [index]);

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
      setUserAnswerReport("");

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

  const handleQuitRequest = useCallback(() => {
    setPauseExplanationVideo(true);
    onQuitHandler();
  }, [onQuitHandler]);

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
    setUserAnswerReport("");
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
      currentBlock.type === StudyBlockType.Exercise &&
      currentBlock.mode === StudyBlockMode.Review &&
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

    const hasNextBlock =
      index < studyBlockQueue.length - 1 || shouldRescheduleReviewBlock;

    if (hasNextBlock) {
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
    setUserAnswerReport("");
    setPlayDrawerSound(false);
    setSuppressExerciseAudioAutoplay(true);
    setCompletedResults((prev) => {
      if (!prev.has(index)) return prev;
      const next = new Map(prev);
      next.delete(index);
      return next;
    });
    setExerciseRenderVersion((prev) => prev + 1);
  }

  function handleExplanationComplete() {
    setUserAnswerReport("");
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
      const rating =
        totalBlocks > 0 && attempts > 0
          ? Math.round(((stats?.right ?? 0) / attempts) * 100)
          : 0;
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
    currentStudyBlock && currentStudyBlock.type === StudyBlockType.Exercise
      ? currentStudyBlock.content.answerExplanation
      : undefined;
  const currentWrongAttempts = wrongAttemptsByIndex.get(index) ?? 0;
  const allowSkipExercise =
    !isRevisiting &&
    drawerVariant === "incorrect" &&
    checkedResult === "WRONG" &&
    currentWrongAttempts >= 3;
  const studyBlockData =
    currentStudyBlock && onReportStudyBlockClick
      ? {
          id: currentStudyBlock.id,
          type: currentStudyBlock.type,
          answerState: checkedResult,
          userAnswerReport,
        }
      : null;

  return (
    <StudySessionAudioProvider
      isMuted={audioMuted}
      onMutedChange={onAudioMutedChange}
    >
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
            onExit={handleQuitRequest}
            quitButtonDataTest={dataTest?.quitButton}
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
                studyBlockQueue[index].type === StudyBlockType.Exercise && (
                  <ExerciseStudyBlock
                    key={`${index}-${exerciseRenderVersion}`}
                    components={studyBlockQueue[index].content.components}
                    onCheck={(result, report) => {
                      setCheckedResult(result);
                      setUserAnswerReport(report);
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
                    suppressAudioAutoplay={suppressExerciseAudioAutoplay}
                    dataTest={dataTest}
                  />
                )}
              {studyBlockQueue[index] &&
                studyBlockQueue[index].type === StudyBlockType.Explanation && (
                  <ExplanationStudyBlock
                    key={index}
                    scenes={studyBlockQueue[index].content.scenes}
                    pauseVideo={pauseExplanationVideo}
                    onComplete={handleExplanationComplete}
                    onReportClick={
                      studyBlockData
                        ? () => onReportStudyBlockClick?.(studyBlockData)
                        : undefined
                    }
                    localization={localization}
                    isRevisiting={isRevisiting}
                    dataTest={dataTest}
                  />
                )}
            </ContentContainer>
          </Box>

          {drawerVariant && (
            <StudySessionDrawer
              variant={drawerVariant}
              onReportClick={
                studyBlockData
                  ? () => onReportStudyBlockClick?.(studyBlockData)
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
              data-test={
                dataTest?.studyBlockNavigation?.previousStudyBlockButton
              }
            />
          )}
          {desktop && canGoForward && (
            <StudySessionNavigationButton
              direction="next"
              onClick={handleGoForward}
              data-test={dataTest?.studyBlockNavigation?.nextStudyBlockButton}
            />
          )}
        </Stack>
      )}
    </StudySessionAudioProvider>
  );
};

export default StudySession;
