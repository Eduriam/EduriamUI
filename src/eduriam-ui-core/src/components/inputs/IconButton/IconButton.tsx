import ButtonBase from "@mui/material/ButtonBase";

import { Icon } from "../../Icon";

/**
 * Allowed visual sizes for `IconButton`.
 */
export type IconButtonSize = "small" | "medium" | "large";

/**
 * Visual variants for `IconButton`.
 *
 * - `"contained"` – filled primary background.
 * - `"outlined"` – neutral background with a border.
 * - `"text"` – no background or border.
 */
export type IconButtonVariant = "contained" | "outlined" | "text";

/**
 * Props for the `IconButton` component.
 *
 * Renders a square icon-only button with consistent sizing and styling.
 */
export interface IconButtonProps {
  /**
   * Size of the button and icon.
   *
   * @default "medium"
   */
  size?: IconButtonSize;

  /**
   * Visual variant of the button.
   *
   * @default "contained"
   */
  variant?: IconButtonVariant;

  /**
   * Material icon name to render inside the button.
   *
   * @default "play_arrow"
   */
  icon?: string;

  /**
   * Whether the button is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Called when the button is clicked.
   */
  onClick?: () => void;
}

const SIZE_CONFIG: Record<
  IconButtonSize,
  { button: number; icon: number; radius: number }
> = {
  small: { button: 32, icon: 24, radius: 8 },
  medium: { button: 40, icon: 24, radius: 12 },
  large: { button: 48, icon: 32, radius: 12 },
};

/**
 * Icon-only button used for compact actions like play, back, or close.
 *
 * Prefer `IconButton` over manually composing `ButtonBase` and `Icon` to
 * keep size, shape, and colors consistent.
 */
export const IconButton: React.FC<IconButtonProps> = ({
  size = "medium",
  variant = "contained",
  icon = "play_arrow",
  disabled,
  onClick,
}) => {
  const config = SIZE_CONFIG[size];

  return (
    <ButtonBase
      disabled={disabled}
      onClick={onClick}
      sx={(theme) => ({
        alignItems: "center",
        backgroundColor:
          variant === "contained"
            ? theme.palette.primary.main
            : variant === "outlined"
              ? theme.palette.background.default
              : "transparent",
        border:
          variant === "outlined"
            ? `1px solid ${theme.palette.divider}`
            : "none",
        borderRadius: `${config.radius}px`,
        color:
          variant === "contained"
            ? theme.palette.common.white
            : theme.palette.primary.main,
        display: "inline-flex",
        height: config.button,
        justifyContent: "center",
        width: config.button,
      })}
    >
      <Icon name={icon} sx={{ fontSize: config.icon }} />
    </ButtonBase>
  );
};

export default IconButton;
