import { Drawer, IconButton, LargeButton } from "@eduriam/ui-core";

import Box from "@mui/material/Box";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";

import { AudioPlayer } from "../../../../audio";

import type { StudySessionLocalization } from "../../types/StudySessionLocalization";

export type StudySessionDrawerVariant = "correct" | "incorrect";

export interface StudySessionDrawerProps {
  /**
   * Visual state of the drawer content.
   *
   * - `"correct"` – success / positive state.
   * - `"incorrect"` – error / negative state.
   */
  variant: StudySessionDrawerVariant;

  /**
   * Called when the explanation button is clicked.
   *
   * If undefined, the explanation button is not rendered.
   */
  onExplanationClick?: () => void;

  /**
   * Called when the report icon button is clicked.
   */
  onReportClick: () => void;

  /**
   * Called when the continue button is clicked.
   */
  onContinueClick: () => void;

  /**
   * Optional data attribute used to identify this drawer in E2E tests.
   *
   * Passed to the underlying `Drawer` as `data-test`.
   */
  "data-test"?: string;

  /**
   * Localization strings for the study session (passed from StudySession).
   * Can be extended with drawer-specific keys when needed.
   */
  localization: StudySessionLocalization;
}

/**
 * Study session specific drawer built on top of the core `Drawer`.
 *
 */
export const StudySessionDrawer: React.FC<StudySessionDrawerProps> = ({
  variant,
  onExplanationClick,
  onReportClick,
  onContinueClick,
  "data-test": dataTest,
  localization,
}) => {
  const hasExplanation = Boolean(onExplanationClick);

  const isCorrect = variant === "correct";

  useEffect(() => {
    const sound = isCorrect ? "success" : "error";
    new AudioPlayer()
      .play(sound)
      .catch((err: unknown) => {
        console.warn("[StudySessionDrawer] Sound playback failed:", {
          sound,
          error: err,
          name: err instanceof Error ? err.name : undefined,
          message: err instanceof Error ? err.message : undefined,
        });
      });
  }, [isCorrect]);

  const primaryColor = isCorrect ? "success" : "error";
  const { studySessionDrawer } = localization;
  const title = isCorrect
    ? studySessionDrawer.titleCorrect
    : studySessionDrawer.titleIncorrect;
  const continueButtonLabel = studySessionDrawer.continueButton;
  const whyButtonLabel = studySessionDrawer.whyButton;

  return (
    <Drawer
      open
      onClose={() => undefined}
      maxDialogWidth={520}
      data-test={dataTest ?? "study-session-drawer"}
      backgroundColor={isCorrect ? "success" : "error"}
      disableDesktopDialog={true}
      maxContentWidth="medium"
    >
      <Box
        sx={(theme) => ({
          position: "relative",
          borderRadius: 2,
        })}
      >
        {/* Header row with title and report icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 3,
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>

          <IconButton
            size="medium"
            variant="text"
            color={isCorrect ? "success" : "error"}
            icon="report"
            onClick={onReportClick}
            data-test="study-session-drawer-report"
          />
        </Box>

        {/* Buttons row */}
        {hasExplanation ? (
          <Box
            sx={{
              display: "flex",
              gap: 1.25,
              alignItems: "stretch",
            }}
          >
            <LargeButton
              fullWidth={false}
              variant="outlined"
              color={primaryColor}
              onClick={onExplanationClick}
              data-test="study-session-drawer-why"
            >
              {whyButtonLabel}
            </LargeButton>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <LargeButton
                fullWidth
                variant="contained"
                color={primaryColor}
                onClick={onContinueClick}
                data-test="study-session-drawer-continue"
              >
                {continueButtonLabel}
              </LargeButton>
            </Box>
          </Box>
        ) : (
          <Box>
            <LargeButton
              fullWidth
              variant="contained"
              color={primaryColor}
              onClick={onContinueClick}
              data-test="study-session-drawer-continue"
            >
              {continueButtonLabel}
            </LargeButton>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default StudySessionDrawer;
