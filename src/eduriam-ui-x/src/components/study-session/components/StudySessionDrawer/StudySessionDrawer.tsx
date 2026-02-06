import { Drawer, IconButton, LargeButton } from "@eduriam/ui-core";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
   * Optional data attribute used to identify this drawer in E2E tests.
   *
   * Passed to the underlying `Drawer` as `data-test`.
   */
  "data-test"?: string;
}

/**
 * Study session specific drawer built on top of the core `Drawer`.
 *
 */
export const StudySessionDrawer: React.FC<StudySessionDrawerProps> = ({
  variant,
  onExplanationClick,
  onReportClick,
  "data-test": dataTest,
}) => {
  const hasExplanation = Boolean(onExplanationClick);

  const isCorrect = variant === "correct";
  const primaryColor = isCorrect ? "success" : "error";
  const title = isCorrect ? "Correct!" : "Incorrect";

  return (
    <Drawer
      open
      onClose={() => undefined}
      maxWidth={520}
      data-test={dataTest ?? "study-session-drawer"}
      backgroundColor={isCorrect ? "success" : "error"}
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
              variant="outlined"
              color={primaryColor}
              onClick={onExplanationClick}
              data-test="study-session-drawer-why"
            >
              Why?
            </LargeButton>

            <Box sx={{ flexGrow: 1 }}>
              <LargeButton
                fullWidth
                variant="contained"
                color={primaryColor}
                onClick={() => undefined}
                data-test="study-session-drawer-continue"
              >
                Continue
              </LargeButton>
            </Box>
          </Box>
        ) : (
          <Box>
            <LargeButton
              fullWidth
              variant="contained"
              color={primaryColor}
              onClick={() => undefined}
              data-test="study-session-drawer-continue"
            >
              Continue
            </LargeButton>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default StudySessionDrawer;
