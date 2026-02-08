import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";

/**
 * Styles matching Figma: thin divider border, 16px JetBrains Mono (mobile/code).
 * Filled uses background.default; blank uses background.paper.
 */
const baseBoxSx = {
  borderRadius: 2,
  padding: 1,
  border: "1px solid",
  borderColor: "divider",
} as const;

const blankBoxSx = {
  ...baseBoxSx,
  backgroundColor: "background.paper",
  width: "fit-content",
  minWidth: "6ch",
  display: "inline-flex",
  verticalAlign: "middle",
};
const filledBoxSx = {
  ...baseBoxSx,
  backgroundColor: "background.default",
  width: "fit-content",
  display: "inline-flex",
  verticalAlign: "middle",
};

/**
 * Props for the `CodeBlank` component.
 *
 * Option button with monospace (code) typography per Figma: light grey
 * background, divider border. When not filled, same box is shown as a
 * blank placeholder.
 */
export interface CodeBlankProps {
  /**
   * The code text. Shown when filled is true; when filled is false, a blank
   * placeholder of the same size is shown.
   */
  code: string;

  /**
   * When true, the button shows the code text. When false, a blank
   * placeholder box is shown (same size, background.paper).
   *
   * @default true
   */
  filled?: boolean;

  /**
   * Native button type.
   *
   * @default "button"
   */
  type?: "button" | "submit" | "reset";

  /**
   * Called when the button is clicked. Only relevant when filled is true.
   */
  onClick?: () => void;

  /**
   * Optional data attribute used to identify this button in E2E tests.
   */
  "data-test"?: string;
}

/**
 * Code blank matching Figma (Eduriam Web App): filled state uses
 * background.default, blank state uses background.paper; thin divider
 * border, JetBrains Mono 16px.
 */
export const CodeBlank: React.FC<CodeBlankProps> = ({
  code,
  filled = true,
  type = "button",
  onClick,
  "data-test": dataTest,
}) => {
  if (!filled) {
    return (
      <Box sx={blankBoxSx} data-test={dataTest} component="span">
        <Typography
          component="span"
          variant={"code" as TypographyProps["variant"]}
          sx={{ color: "background.paper", userSelect: "none" }}
        >
          {code}
        </Typography>
      </Box>
    );
  }

  return (
    <ButtonBase
      component="span"
      role="button"
      onClick={onClick}
      focusRipple
      disableTouchRipple
      sx={filledBoxSx}
      data-test={dataTest}
    >
      <Typography
        component="span"
        variant={"code" as TypographyProps["variant"]}
        sx={{
          color: "text.primary",
          userSelect: "none",
          textAlign: "left",
          width: "100%",
        }}
      >
        {code}
      </Typography>
    </ButtonBase>
  );
};

export default CodeBlank;
