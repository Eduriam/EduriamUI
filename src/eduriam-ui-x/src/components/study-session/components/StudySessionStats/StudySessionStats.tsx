import { ContentContainer, Illustration, LargeButton } from "@eduriam/ui-core";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { StudySessionDataTest } from "../../types/StudySessionDataTest";
import type { StudySessionLocalization } from "../../types/StudySessionLocalization";
import { StatsCard } from "./StatsCard";
import Confetti from "./components/Confetti";

/**
 * Props for the `StudySessionStats` screen.
 *
 * All metric values are pre-computed by the parent `StudySession` component
 * and passed down as display-ready primitives.
 */
export interface StudySessionStatsProps {
  /** Total XP earned in the session (unique exercises x XP_PER_EXERCISE). */
  totalXp: number;

  /** Duration of the study session in milliseconds. */
  timeStudiedMs: number;

  /** Percentage of correct answers (0-100). */
  correctRate: number;

  /** Number of distinct concepts (unique atomIds) studied. */
  conceptCount: number;

  /** Called when the user taps the continue button to leave the stats screen. */
  onContinue: () => void;

  /** Localization strings for the stats screen. */
  localization: StudySessionLocalization;
  dataTest?: StudySessionDataTest;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Full-page stats screen shown after a study session ends.
 *
 * Displays a celebratory header, a 2x2 grid of key metrics, and a continue
 * button. Rendered inside `StudySession` as a top-level replacement for the
 * exercise UI once the session is complete.
 */
export const StudySessionStats: React.FC<StudySessionStatsProps> = ({
  totalXp,
  timeStudiedMs,
  correctRate,
  conceptCount,
  onContinue,
  localization,
  dataTest,
}) => {
  const loc = localization.studySessionStats;

  return (
    <>
      <Stack
        data-test={dataTest?.studyStatsSection ?? "study-session-stats"}
        sx={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Confetti />
        <ContentContainer
          paddingTop="large"
          width="small"
          justifyContent="space-between"
        >
          <Stack
            sx={{
              flex: 1,
              alignItems: "center",
              gap: 25,
            }}
          >
            {/* Header + illustration */}
            <Stack sx={{ alignItems: "center", gap: "24px", width: "100%" }}>
              <Typography
                variant="h5"
                fontWeight={600}
                color="text.primary"
                textAlign="center"
              >
                {loc.title}
              </Typography>

              <Illustration name="finish" width={160} height={160} />
            </Stack>

            {/* 2x2 Stats grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                columnGap: "8px",
                rowGap: "12px",
                width: "100%",
              }}
            >
              <StatsCard
                illustration="xp"
                value={String(totalXp)}
                label={loc.xpGained}
              />
              <StatsCard
                illustration="timer"
                value={formatTime(timeStudiedMs)}
                label={loc.minStudied}
              />
              <StatsCard
                illustration="target"
                value={`${Math.round(correctRate)}%`}
                label={loc.correct}
              />
              <StatsCard
                illustration="concept"
                value={String(conceptCount)}
                label={loc.newConcepts}
              />
            </Box>
          </Stack>

          <Box
            alignItems="center"
            justifyContent="center"
            width="100%"
            display="flex"
          >
            <LargeButton
              fullWidth={true}
              onClick={onContinue}
              data-test="study-session-stats-continue"
            >
              {loc.continueButton}
            </LargeButton>
          </Box>
        </ContentContainer>
      </Stack>
    </>
  );
};

export default StudySessionStats;
