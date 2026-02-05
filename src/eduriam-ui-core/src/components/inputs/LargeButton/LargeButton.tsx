import Button, { ButtonProps } from "@mui/material/Button";
import type { Theme } from "@mui/material/styles";

export type LargeButtonColor = "primary" | "success" | "error";
export type LargeButtonVariant = "contained" | "outlined" | "text";

export interface LargeButtonProps extends Omit<
  ButtonProps,
  "color" | "variant"
> {
  color?: LargeButtonColor;
  variant?: LargeButtonVariant;
}

export const LargeButton: React.FC<LargeButtonProps> = ({
  color = "primary",
  variant = "contained",
  disabled,
  sx,
  ...rest
}) => {
  const isDisabled = Boolean(disabled);
  const muiVariant =
    variant === "contained"
      ? "contained"
      : variant === "outlined"
        ? "outlined"
        : "text";
  const computedSx = (theme: Theme) => {
    const palette = theme.palette[color];
    const mainColor = palette.main;
    const darkColor = palette.dark ?? palette.main;
    const filledTextColor = isDisabled
      ? theme.palette.text.disabled
      : theme.palette.common.white;
    const textColor = isDisabled ? theme.palette.text.disabled : mainColor;

    const baseStyles = {
      borderRadius: "16px",
      columnGap: "8px",
      minHeight: theme.spacing(12),
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
        color === "primary" ? theme.palette.divider : mainColor;
      const outlinedBackground =
        color === "primary" ? theme.palette.background.default : "transparent";

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
    <Button
      disabled={isDisabled}
      disableRipple
      variant={muiVariant}
      sx={[
        computedSx,
        ...(Array.isArray(sx) ? sx : [sx]),
        { textTransform: "none" },
      ].filter(Boolean)}
      {...rest}
    />
  );
};

export default LargeButton;
