import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Theme } from "@mui/material/styles";

/**
 * Props for the `LargeRadioButton` component.
 *
 * Visual building block for a large, card-like radio choice.
 */
export interface LargeRadioButtonProps {
  /**
   * Whether this option is currently selected.
   *
   * @default true
   */
  selected?: boolean;

  /**
   * Whether to expand and show the `subText` below the main label.
   *
   * @default false
   */
  expanded?: boolean;

  /**
   * Primary label text for the option.
   *
   * @default "Button"
   */
  text?: string;

  /**
   * Secondary description shown when `expanded` is true.
   *
   * @default "Sub Text"
   */
  subText?: string;

  /**
   * Whether the option should take the full available width.
   *
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Click handler to select this option.
   */
  onClick?: () => void;

  /**
   * Optional ARIA role, typically `"radio"` when used in a radiogroup.
   */
  role?: string;

  /**
   * ARIA checked state, used when `role="radio"`.
   */
  "aria-checked"?: boolean;
}

/**
 * Large, card-style radio option used inside `LargeRadioButtonGroup`.
 *
 * Prefer using `LargeRadioButtonGroup` for full behavior and accessibility
 * instead of using this component directly.
 */
export const LargeRadioButton: React.FC<LargeRadioButtonProps> = ({
  selected = true,
  expanded = false,
  text = "Button",
  subText = "Sub Text",
  fullWidth = false,
  onClick,
  role,
  "aria-checked": ariaChecked,
}) => {
  const isExpanded = Boolean(expanded);

  return (
    <Box
      role={role}
      aria-checked={ariaChecked}
      onClick={onClick}
      sx={(theme: Theme) => ({
        alignItems: isExpanded ? "flex-start" : "center",
        border: `1.5px solid ${
          selected ? theme.palette.primary.main : theme.palette.divider
        }`,
        borderBottomWidth: "3px",
        borderRadius: "16px",
        boxSizing: "border-box",
        cursor: "pointer",
        display: "flex",
        flexDirection: isExpanded ? "column" : "row",
        gap: isExpanded ? "8px" : 0,
        minHeight: isExpanded ? "auto" : "48px",
        padding: isExpanded ? "16px" : "0 16px",
        width: fullWidth ? "100%" : "357px",
      })}
    >
      <Typography color="text.primary" variant="body1">
        {text}
      </Typography>
      {isExpanded && (
        <Typography color="text.secondary" variant="body2">
          {subText}
        </Typography>
      )}
    </Box>
  );
};

export default LargeRadioButton;
