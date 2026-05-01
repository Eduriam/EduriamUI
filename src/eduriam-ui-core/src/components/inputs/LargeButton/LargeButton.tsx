import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { Theme } from "@mui/material/styles";

/**
 * Color palette choices for `LargeButton`.
 *
 * Maps to `theme.palette[color]` except "textPrimary" which uses
 * `theme.palette.text.primary`.
 */
export type LargeButtonColor = "primary" | "success" | "error" | "textPrimary";

/**
 * Visual variants for `LargeButton`, mirroring MUI button variants.
 */
export type LargeButtonVariant = "contained" | "outlined" | "text";

/**
 * Props for the `LargeButton` component.
 *
 * Primary call-to-action button with opinionated styling, built on top of
 * MUI `Button`.
 */
export interface LargeButtonProps {
  /**
   * Color slot from the theme palette to use.
   *
   * @default "primary"
   */
  color?: LargeButtonColor;

  /**
   * Button style variant.
   *
   * @default "contained"
   */
  variant?: LargeButtonVariant;

  /**
   * Whether the button is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button should take the full available width.
   *
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Optional icon shown before the label.
   */
  startIcon?: ReactNode;

  /**
   * Optional icon shown after the label.
   */
  endIcon?: ReactNode;

  /**
   * Button label or custom content.
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
   *
   * Passed directly to the underlying MUI `Button` as `data-test`.
   */
  "data-test"?: string;
}

/**
 * Large primary action button with extra height and strong visual weight.
 *
 * Use `LargeButton` for main actions on a screen instead of raw MUI `Button`.
 */
export const LargeButton: React.FC<LargeButtonProps> = ({
  color = "primary",
  variant = "contained",
  disabled,
  fullWidth = true,
  startIcon,
  endIcon,
  children,
  type = "button",
  onClick,
  "data-test": dataTest,
}) => {
  const isDisabled = Boolean(disabled);
  const muiVariant =
    variant === "contained"
      ? "contained"
      : variant === "outlined"
        ? "outlined"
        : "text";
  const computedSx = (theme: Theme) => {
    const mainColor =
      color === "textPrimary"
        ? theme.palette.text.primary
        : theme.palette[color].main;
    const darkColor =
      color === "textPrimary"
        ? theme.palette.text.primary
        : (theme.palette[color].dark ?? theme.palette[color].main);
    const filledTextColor = isDisabled
      ? theme.palette.text.disabled
      : theme.palette.common.white;
    const textColor = isDisabled ? theme.palette.text.disabled : mainColor;

    const baseStyles = {
      borderRadius: "16px",
      columnGap: "8px",
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: "16px",
      paddingRight: "16px",
      textTransform: "none",
      typography: "button",
      "& .MuiButton-startIcon": {
        marginRight: 0,
      },
      "& .MuiButton-endIcon": {
        marginLeft: 0,
      },
      "&.Mui-disabled": {
        opacity: 1,
      },
      transform: "translateY(0)",
    } as const;

    if (variant === "contained") {
      return {
        ...baseStyles,
        backgroundColor: isDisabled
          ? theme.palette.action.disabledBackground
          : mainColor,
        border: "none",
        borderBottom: `3px solid ${isDisabled ? "transparent" : darkColor}`,
        color: filledTextColor,
        boxShadow: "none",
        "&:hover": {
          backgroundColor: isDisabled
            ? theme.palette.action.disabledBackground
            : mainColor,
          borderBottomColor: isDisabled ? "transparent" : darkColor,
          boxShadow: "none",
        },
        "&:active": {
          backgroundColor: isDisabled
            ? theme.palette.action.disabledBackground
            : mainColor,
          borderBottomColor: isDisabled ? "transparent" : darkColor,
          borderBottomWidth: "1px",
          transform: "translateY(2px)",
        },
      };
    }

    if (variant === "outlined") {
      const outlinedBorderColor =
        color === "primary" || color === "textPrimary"
          ? theme.palette.divider
          : mainColor;
      const outlinedBackground =
        color === "primary" || color === "textPrimary"
          ? theme.palette.background.default
          : "transparent";

      return {
        ...baseStyles,
        backgroundColor: outlinedBackground,
        border: `1px solid ${outlinedBorderColor}`,
        borderBottomWidth: "3px",
        color: textColor,
        "&:hover": {
          backgroundColor: outlinedBackground,
          borderColor: outlinedBorderColor,
          borderBottomWidth: "3px",
        },
        "&:active": {
          backgroundColor: outlinedBackground,
          borderColor: outlinedBorderColor,
          borderBottomWidth: "1px",
          transform: "translateY(2px)",
        },
      };
    }

    return {
      ...baseStyles,
      backgroundColor: "transparent",
      color: textColor,
      "&:hover": {
        backgroundColor: "transparent",
      },
    };
  };

  return (
    <Box
      sx={{
        height: 48,
        width: fullWidth ? "100%" : "fit-content",
        maxWidth: 400,
        mx: fullWidth ? "auto" : undefined,
        alignSelf: fullWidth ? "center" : undefined,
      }}
    >
      <Button
        data-test={dataTest}
        disabled={isDisabled}
        disableRipple
        variant={muiVariant}
        type={type}
        fullWidth={fullWidth}
        startIcon={startIcon}
        endIcon={endIcon}
        onClick={onClick}
        sx={computedSx}
      >
        {children}
      </Button>
    </Box>
  );
};

export default LargeButton;
