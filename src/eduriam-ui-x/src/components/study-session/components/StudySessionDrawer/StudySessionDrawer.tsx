import {
  Drawer,
  ExplanationDrawer,
  IconButton,
  LargeButton,
} from "@eduriam/ui-core";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import { AudioPlayer } from "../../../../audio";
import type { StudySessionDataTest } from "../../types/StudySessionDataTest";
import type { StudySessionLocalization } from "../../types/StudySessionLocalization";
import type { ExerciseStudyBlockDTO } from "../study-blocks/exercise/ExerciseStudyBlockDTO";

export type StudySessionDrawerVariant = "correct" | "incorrect";

export interface StudySessionDrawerProps {
  /**
   * Visual state of the drawer content.
   *
   * - `"correct"` – success / positive state.
   * - `"incorrect"` – error / negative state.
   */
  variant: StudySessionDrawerVariant;

  answerExplanation?: ExerciseStudyBlockDTO["content"]["answerExplanation"];

  /**
   * Called when the report icon button is clicked.
   */
  onReportClick?: () => void;

  /**
   * Called when the primary action button is clicked ("Continue" or "Retry").
   */
  onContinueOrRetryClick: () => void;
  /**
   * Called when the skip exercise button is clicked.
   *
   * If undefined, `onContinueOrRetryClick` is used as fallback.
   */
  onSkipExerciseClick?: () => void;
  /**
   * When `true` and `variant` is `"incorrect"`, an additional skip button
   * is rendered.
   */
  allowSkipExercise?: boolean;

  /**
   * Whether to play the success/error sound when the drawer opens.
   *
   * Defaults to `true` for first-time completion. Can be disabled when
   * revisiting an already-completed exercise so the sound is not replayed.
   */
  playSound?: boolean;

  /**
   * Optional data attribute used to identify this drawer in E2E tests.
   *
   * Passed to the underlying `Drawer` as `data-test`.
   */
  "data-test"?: string;
  primaryButtonDataTest?: string;
  dataTest?: StudySessionDataTest;

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
  answerExplanation,
  onReportClick,
  onContinueOrRetryClick: onContinueClick,
  onSkipExerciseClick,
  allowSkipExercise = false,
  playSound = true,
  "data-test": dataTest,
  primaryButtonDataTest,
  dataTest: dataTestConfig,
  localization,
}) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);

  const isCorrect = variant === "correct";
  const isDarkMode = theme.palette.mode === "dark";
  const hasExplanation = !isCorrect && Boolean(answerExplanation?.text);

  useEffect(() => {
    if (!playSound) return;

    const sound = isCorrect ? "success" : "error";
    new AudioPlayer().play(sound).catch((err: unknown) => {
      console.warn("[StudySessionDrawer] Sound playback failed:", {
        sound,
        error: err,
        name: err instanceof Error ? err.name : undefined,
        message: err instanceof Error ? err.message : undefined,
      });
    });
  }, [isCorrect, playSound]);

  const primaryColor = isCorrect ? "success" : "error";
  const drawerBackgroundColor = isDarkMode
    ? "paper"
    : isCorrect
      ? "success"
      : "error";
  const titleColor = isDarkMode
    ? isCorrect
      ? "success.main"
      : "error.main"
    : undefined;
  const { studySessionDrawer } = localization;
  const title = isCorrect
    ? studySessionDrawer.titleCorrect
    : studySessionDrawer.titleIncorrect;
  const continueButtonLabel = studySessionDrawer.continueButton;
  const retryButtonLabel = studySessionDrawer.retryButton;
  const primaryButtonLabel = isCorrect ? continueButtonLabel : retryButtonLabel;
  const whyButtonLabel = studySessionDrawer.whyButton;
  const skipExerciseButtonLabel = studySessionDrawer.skipExerciseButton;
  const showSkipButton = !isCorrect && allowSkipExercise;
  const drawerDataTest =
    dataTest ??
    (isCorrect
      ? dataTestConfig?.studySessionDrawer?.correctAnswerDrawer
      : dataTestConfig?.studySessionDrawer?.incorrectAnswerDrawer) ??
    "study-session-drawer";
  const primaryActionDataTest =
    primaryButtonDataTest ??
    (isCorrect
      ? dataTestConfig?.studySessionDrawer?.continueButton
      : dataTestConfig?.studySessionDrawer?.retryExerciseButton);
  const whyDataTest = dataTestConfig?.studySessionDrawer?.showExplanationButton;
  const skipDataTest = dataTestConfig?.studySessionDrawer?.skipExerciseButton;
  const handleSkipExerciseClick = onSkipExerciseClick ?? onContinueClick;
  const handleExplanationClick = () => {
    setIsExplanationOpen(true);
  };

  return (
    <>
      <Drawer
        open
        onClose={() => undefined}
        maxDialogWidth={520}
        data-test={drawerDataTest}
        backgroundColor={drawerBackgroundColor}
        disableDesktopDialog={true}
        maxContentWidth="medium"
        hideBackdrop={true}
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
            <Typography variant="h5" fontWeight={600} color={titleColor}>
              {title}
            </Typography>

            {onReportClick && (
              <IconButton
                size="medium"
                variant="text"
                color={isCorrect ? "success" : "error"}
                icon="report"
                onClick={onReportClick}
                data-test={dataTestConfig?.studySessionDrawer?.reportButton}
              />
            )}
          </Box>

          {/* Buttons */}
          {showSkipButton ? (
            hasExplanation ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: desktop ? "row" : "column",
                  gap: 1.25,
                  alignItems: "stretch",
                }}
              >
                <Box sx={{ display: "flex", gap: 1.25, alignItems: "stretch" }}>
                  <LargeButton
                    fullWidth={false}
                    variant="outlined"
                    color={primaryColor}
                    onClick={handleExplanationClick}
                    data-test={whyDataTest}
                  >
                    {whyButtonLabel}
                  </LargeButton>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <LargeButton
                      fullWidth
                      variant="outlined"
                      color={primaryColor}
                      onClick={handleSkipExerciseClick}
                      data-test={skipDataTest}
                    >
                      {skipExerciseButtonLabel}
                    </LargeButton>
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: desktop ? undefined : "100%",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <LargeButton
                    fullWidth
                    variant="contained"
                    color={primaryColor}
                    onClick={onContinueClick}
                    data-test={primaryActionDataTest}
                  >
                    {primaryButtonLabel}
                  </LargeButton>
                </Box>
              </Box>
            ) : (
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
                  onClick={handleSkipExerciseClick}
                  data-test={skipDataTest}
                >
                  {skipExerciseButtonLabel}
                </LargeButton>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <LargeButton
                    fullWidth
                    variant="contained"
                    color={primaryColor}
                    onClick={onContinueClick}
                    data-test={primaryActionDataTest}
                  >
                    {primaryButtonLabel}
                  </LargeButton>
                </Box>
              </Box>
            )
          ) : hasExplanation ? (
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
                onClick={handleExplanationClick}
                data-test={whyDataTest}
              >
                {whyButtonLabel}
              </LargeButton>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <LargeButton
                  fullWidth
                  variant="contained"
                  color={primaryColor}
                  onClick={onContinueClick}
                  data-test={primaryActionDataTest}
                >
                  {primaryButtonLabel}
                </LargeButton>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LargeButton
                fullWidth
                variant="contained"
                color={primaryColor}
                onClick={onContinueClick}
                data-test={primaryActionDataTest}
              >
                {primaryButtonLabel}
              </LargeButton>
            </Box>
          )}
        </Box>
      </Drawer>
      {answerExplanation?.text && (
        <ExplanationDrawer
          open={isExplanationOpen}
          onClose={() => setIsExplanationOpen(false)}
          title={studySessionDrawer.explanationTitle}
          bodyText={answerExplanation.text}
          continueButtonLabel={studySessionDrawer.continueButton}
          dataTest={{
            explanationSection: dataTestConfig?.explanation?.section,
            gotItButton: dataTestConfig?.explanation?.gotItButton,
          }}
        />
      )}
    </>
  );
};

export default StudySessionDrawer;
