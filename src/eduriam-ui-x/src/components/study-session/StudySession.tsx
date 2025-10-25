import { Icon } from "@eduriam/ui-core";

import { useState } from "react";

import {
  IconButton,
  LinearProgress,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";

import { ID } from "../../models/ID";
import { StudyBlock } from "./components/study-blocks/StudyBlock";
import { StudyBlockDTO as StudyBlockModel } from "./components/study-blocks/types/StudyBlockDTO";
import StudySessionProgressBar from "./components/study-session-progress-bar/StudySessionProgressBar";
import { AnswerState } from "./types/AnswerState";
import type { StudySessionDTO as StudySessionModel } from "./types/StudySessionDTO";

export interface StudyStats {
  correctAnswerCount: number;
  incorrectAnswerCount: number;
}

export interface AtomProgressRating {
  atomId: ID;
  rating: number;
}

export interface IStudySession {
  studySession: StudySessionModel;
  onFinish: (
    studyStats: StudyStats,
    atomProgressRatings: AtomProgressRating[],
  ) => void;
  onExit: () => void;
}

const StudySession: React.FC<IStudySession> = ({
  studySession,
  onFinish,
  onExit,
}) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const [finishedSession, setFinishedSession] = useState(false);
  const [index, setIndex] = useState(0);
  interface AtomStats {
    right: number;
    wrong: number;
  }
  const [atomStatsMap, setAtomStatsMap] = useState<Map<ID, AtomStats>>(
    new Map(),
  );
  const [studyBlockQueue, setStudyBlockQueue] = useState(
    studySession.studyBlocks,
  );

  function rescheduleStudyBlock(studyBlock: StudyBlockModel) {
    setStudyBlockQueue((prev) => [...prev, studyBlock]);
  }

  function handleContinue(result: AnswerState) {
    const currentBlock = studyBlockQueue[index];
    const atomId = currentBlock.atomId;

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

    if (result === "WRONG") {
      rescheduleStudyBlock(currentBlock);
    }

    if (index < studyBlockQueue.length - 1) {
      setIndex(index + 1);
    } else {
      setFinishedSession(true);
      const studyStats = evaluateStats(atomStatsMap);
      const atomProgressRatings = computeAtomRatings(
        studySession.studyBlocks,
        atomStatsMap,
      );
      onFinish(studyStats, atomProgressRatings);
    }
  }

  function evaluateStats(statsMap: Map<ID, AtomStats>) {
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

  return (
    <>
      {!finishedSession && (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
          <StudySessionProgressBar
            value={index}
            maxValue={studySession.studyBlocks.length}
            onExit={onExit}
          />

          {/* Study Block */}
          <Box sx={{ flexGrow: 1, pt: desktop ? undefined : 2 }}>
            <Container maxWidth="sm">
              {studyBlockQueue[index] && (
                <StudyBlock
                  key={index}
                  components={studyBlockQueue[index].components}
                  onContinue={handleContinue}
                />
              )}
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
};

export default StudySession;
