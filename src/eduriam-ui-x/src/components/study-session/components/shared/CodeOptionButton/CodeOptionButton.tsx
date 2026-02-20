import { LargeButton, theme } from "@eduriam/ui-core";

import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";

/** Padding and size match LargeButton (height 48, borderRadius 16, spacing(3) vertical, 16px horizontal). */
const LARGE_BUTTON_HEIGHT = 48;
const LARGE_BUTTON_BORDER_RADIUS = "16px";

/**
 * Props for the `CodeOptionButton` component.
 *
 * Option button with monospace (code) typography, built on `LargeButton`
 * with outlined variant and codeButton label. When selected, a rounded box
 * with background.paper is shown instead (same size, no button).
 */
export interface CodeOptionButtonProps {
  /**
   * Whether this option is selected. When true, a rounded paper box is shown
   * instead of the button (same size and padding).
   *
   * @default false
   */
  selected?: boolean;

  /**
   * Button label or custom content. Omit or pass empty for placeholder state.
   */
  children?: ReactNode;

  /**
   * Native button type.
   *
   * @default "button"
   */
  type?: "button" | "submit" | "reset";

  /**
   * Called when the button is clicked.
   */
  onClick?: () => void;

  /**
   * Optional data attribute used to identify this button in E2E tests.
   */
  "data-test"?: string;
}

/**
 * Option button with code-style typography (JetBrains Mono). Uses `LargeButton`
 * in outlined variant with textPrimary color. When selected, renders a rounded
 * box with background.paper (same size as the button) containing the label.
 */
export const CodeOptionButton: React.FC<CodeOptionButtonProps> = ({
  selected = false,
  children,
  onClick,
  "data-test": dataTest,
}) => {
  if (selected) {
    return (
      <Box
        height={LARGE_BUTTON_HEIGHT}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: LARGE_BUTTON_BORDER_RADIUS,
          paddingTop: (theme) => theme.spacing(3),
          paddingBottom: (theme) => theme.spacing(3),
          paddingLeft: "16px",
          paddingRight: "16px",
          backgroundColor: "background.paper",
          display: "flex",
          alignItems: "center",
        }}
        data-test={dataTest}
      >
        <Typography
          variant={"codeButton" as TypographyProps["variant"]}
          sx={{ color: "background.paper", userSelect: "none" }}
        >
          {children}
        </Typography>
      </Box>
    );
  }

  return (
    <LargeButton
      variant="outlined"
      color="textPrimary"
      onClick={onClick}
      data-test={dataTest}
      fullWidth={false}
    >
      <Typography
        variant={"codeButton" as TypographyProps["variant"]}
        sx={{ userSelect: "none" }}
      >
        {children}
      </Typography>
    </LargeButton>
  );
};

export default CodeOptionButton;
