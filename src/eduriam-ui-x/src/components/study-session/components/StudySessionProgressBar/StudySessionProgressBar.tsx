import { Icon, ProgressBar } from "@eduriam/ui-core";

import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Toolbar from "@mui/material/Toolbar";

/**
 * Props for the multi-layer `StudySessionProgressBar`.
 *
 * Visually implemented as two stacked `ProgressBar` components:
 *
 * - The **bottom** bar uses `primary.light` to show the furthest completed
 *   exercise index.
 * - The **top** bar uses `primary.main` to show the current exercise index,
 *   with a transparent track so the completed background remains visible.
 */
export interface IStudySessionProgressBar {
  /** Index of the exercise the user is currently viewing. */
  currentIndex: number;

  /**
   * Highest queue index the user has completed.
   * `-1` when no exercise has been completed yet.
   */
  furthestCompletedIndex: number;

  /** Total number of exercises in the session queue. */
  total: number;

  /** Called when the user clicks the close / exit button. */
  onExit: () => void;
}

/**
 * Study-session progress indicator composed from two overlaid progress bars.
 *
 * The back bar shows how far the learner has ever progressed in the queue,
 * while the front bar shows the currently viewed exercise.
 */
const StudySessionProgressBar: React.FC<IStudySessionProgressBar> = ({
  currentIndex,
  furthestCompletedIndex,
  total,
  onExit,
}) => {
  const safeTotal = total > 0 ? total : 1;

  const furthestValue =
    furthestCompletedIndex >= 0
      ? Math.min(100, ((furthestCompletedIndex + 1) / safeTotal) * 100)
      : 0;
  const currentValue = Math.min(100, (currentIndex / safeTotal) * 100);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "background.default",
        boxShadow: "none",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Toolbar
        sx={{
          alignItems: "center",
          display: "flex",
          gap: "24px",
          height: "64px",
          minHeight: "64px",
          padding: "0 24px",
          margin: "0 auto",
          maxWidth: 1000,
          width: "100%",
        }}
      >
        <Box>
          <ButtonBase
            onClick={onExit}
            data-test="study-session-exit"
            sx={{
              alignItems: "center",
              borderRadius: "12px",
              color: "text.primary",
              display: "inline-flex",
              height: "24px",
              justifyContent: "center",
              width: "24px",
            }}
          >
            <Icon name="close" sx={{ fontSize: 24 }} />
          </ButtonBase>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
            }}
          >
            <ProgressBar
              size="large"
              value={furthestValue}
              color="primary.light"
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
              }}
            >
              <ProgressBar
                size="large"
                value={currentValue}
                color="primary.main"
                backgroundColor="transparent"
              />
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StudySessionProgressBar;
