import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import type { Theme } from "@mui/material/styles";

import { Icon, type IconName } from "../../data-display/Icon";

/**
 * Allowed visual sizes for `IconButton`.
 */
export type IconButtonSize = "small" | "medium" | "large";

/**
 * Visual variants for `IconButton`.
 *
 * - `"contained"` – filled background with contrasting icon.
 * - `"outlined"` – neutral background with border.
 * - `"text"` – no background or border.
 */
export type IconButtonVariant = "contained" | "outlined" | "text";

/**
 * Color slot for `IconButton`, mapped to theme palette.
 */
export type IconButtonColor =
  | "primary"
  | "success"
  | "error"
  | "textPrimary"
  | "textDisabled";

/**
 * Props for the `IconButton` component.
 *
 * Renders a square icon-only button with consistent sizing and styling.
 */
export interface IconButtonProps {
  /**
   * Color from the theme palette.
   *
   * @default "primary"
   */
  color?: IconButtonColor;

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
   * @default "play"
   */
  icon?: IconName;

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

  /**
   * Optional data attribute used to identify this icon button in E2E tests.
   *
   * Passed directly to the underlying MUI `ButtonBase` as `data-test`.
   */
  "data-test"?: string;
}

const SIZE_CONFIG: Record<
  IconButtonSize,
  { button: number; icon: number; radius: number; outlineWidth: number }
> = {
  small: { button: 32, icon: 24, radius: 8, outlineWidth: 2 },
  medium: { button: 40, icon: 24, radius: 12, outlineWidth: 2 },
  large: { button: 48, icon: 32, radius: 12, outlineWidth: 3 },
};

function getMainColor(theme: Theme, color: IconButtonColor): string {
  switch (color) {
    case "primary":
      return theme.palette.primary.main;
    case "success":
      return theme.palette.success.main;
    case "error":
      return theme.palette.error.main;
    case "textDisabled":
      return theme.palette.text.disabled;
    case "textPrimary":
      return theme.palette.text.primary;
    default:
      return theme.palette.primary.main;
  }
}

function getIconButtonStyles(
  theme: Theme,
  color: IconButtonColor,
  variant: IconButtonVariant,
  size: IconButtonSize,
  disabled: boolean,
) {
  const config = SIZE_CONFIG[size];

  const iconColor = getMainColor(theme, color);
  const filledIconColor = theme.palette.common.white;
  const disabledColor = theme.palette.text.disabled;

  const baseStyles = {
    borderRadius: `${config.radius}px`,
    height: config.button,
    width: config.button,
    transform: "translateY(0)",
  } as const;

  if (disabled) {
    return {
      ...baseStyles,
      backgroundColor:
        variant === "contained"
          ? theme.palette.action.disabledBackground
          : "transparent",
      border:
        variant === "outlined" ? `1px solid ${theme.palette.divider}` : "none",
      color: disabledColor,
    };
  }

  if (variant === "contained") {
    if (color === "textPrimary" || color === "textDisabled") {
      return {
        ...baseStyles,
        backgroundColor: theme.palette.action.disabledBackground,
        border: "none",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        color:
          color === "textPrimary"
            ? theme.palette.text.primary
            : theme.palette.text.disabled,
      };
    }
    return {
      ...baseStyles,
      backgroundColor: iconColor,
      border: "none",
      color: filledIconColor,
    };
  }

  if (variant === "outlined") {
    const outlineWidth = config.outlineWidth;
    const translateYAmount = outlineWidth - 1; // 2→1 = 1px, 3→1 = 2px
    return {
      ...baseStyles,
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.divider}`,
      borderBottomWidth: `${outlineWidth}px`,
      color: iconColor,
      "&:active": {
        borderBottomWidth: "1px",
        transform: `translateY(${translateYAmount + 1}px)`,
        height: config.button - 1,
      },
    };
  }

  return {
    ...baseStyles,
    backgroundColor: "transparent",
    border: "none",
    color: iconColor,
  };
}

/**
 * Icon-only button used for compact actions like play, back, or close.
 *
 * Prefer `IconButton` over manually composing `ButtonBase` and `Icon` to
 * keep size, shape, and colors consistent.
 */
export const IconButton: React.FC<IconButtonProps> = ({
  color = "primary",
  size = "medium",
  variant = "contained",
  icon = "play",
  disabled = false,
  onClick,
  "data-test": dataTest,
}) => {
  const config = SIZE_CONFIG[size];

  return (
    <Box
      sx={{
        height: config.button + 2,
      }}
    >
      <ButtonBase
        disabled={disabled}
        disableRipple
        onClick={onClick}
        data-test={dataTest}
        sx={(theme) => ({
          ...getIconButtonStyles(
            theme,
            color,
            variant,
            size,
            Boolean(disabled),
          ),
        })}
      >
        <Icon name={icon} sx={{ fontSize: config.icon }} />
      </ButtonBase>
    </Box>
  );
};

export default IconButton;
