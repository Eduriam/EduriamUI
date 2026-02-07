import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Toolbar from "@mui/material/Toolbar";

import { Icon } from "../../data-display/Icon";
import { ProgressBar, ProgressBarSize } from "../../feedback/ProgressBar";

/**
 * Icon button configuration for `ProgressNavbar`.
 */
export type ProgressNavbarIconButton = {
  /**
   * Material icon name to display as the left action.
   */
  icon: string;

  /**
   * Click handler for the icon button.
   */
  onClick: () => void;

  /**
   * Optional test id written to `data-test`.
   */
  dataTest?: string;
};

/**
 * Props for the `ProgressNavbar` component.
 *
 * Combines a top app bar with a progress bar to show step or course progress.
 */
export interface ProgressNavbarProps {
  /**
   * Optional left icon button, e.g. back or close.
   */
  leftButton?: ProgressNavbarIconButton;

  /**
   * Progress percentage value from 0 to 100.
   *
   * @default 40
   */
  progressValue?: number;

  /**
   * Visual size of the embedded `ProgressBar`.
   *
   * @default "large"
   */
  progressSize?: ProgressBarSize;
}

/**
 * Top navigation bar that displays linear progress across the page.
 *
 * Use this for flows where the user moves through a series of steps and
 * you want to show progress inline with the header.
 */
export const ProgressNavbar: React.FC<ProgressNavbarProps> = ({
  leftButton,
  progressValue = 40,
  progressSize = "large",
}) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "background.default",
        boxShadow: "none",
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
          {leftButton && (
            <ButtonBase
              data-test={leftButton.dataTest}
              onClick={leftButton.onClick}
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
              <Icon name={leftButton.icon} sx={{ fontSize: 24 }} />
            </ButtonBase>
          )}
        </Box>
        <ProgressBar size={progressSize} value={progressValue} />
      </Toolbar>
    </AppBar>
  );
};

export default ProgressNavbar;
