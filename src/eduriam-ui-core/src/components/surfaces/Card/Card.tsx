import type { ReactNode } from "react";

import type { PaperProps } from "@mui/material/Paper";
import Paper from "@mui/material/Paper";
import type { Theme } from "@mui/material/styles";

export type CardVariant = "default" | "clickable" | "selected";
export type CardPadding = "small" | "medium";

export interface CardProps extends Omit<PaperProps, "variant" | "padding"> {
  variant?: CardVariant;
  padding?: CardPadding;
  children?: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  padding = "medium",
  sx,
  ...rest
}) => {
  const isClickable = variant === "clickable";
  const isSelected = variant === "selected";

  const borderColor = isSelected ? "primary.main" : "divider";
  const baseBottomBorderWidth = variant === "default" ? 2 : 4;
  const paddingScale = padding === "medium" ? 5 : 4;
  const borderWidths =
    variant === "default"
      ? { borderWidth: 2 }
      : {
          borderTopWidth: 2,
          borderRightWidth: 2,
          borderLeftWidth: 2,
          borderBottomWidth: baseBottomBorderWidth,
        };

  return (
    <Paper
      square={false}
      elevation={0}
      sx={[
        (theme: Theme) => {
          const basePadding = theme.spacing(paddingScale);

          return {
            width: "100%",
            boxSizing: "border-box",
            borderStyle: "solid",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: "background.default",
            borderColor,
            paddingTop: basePadding,
            paddingRight: basePadding,
            paddingLeft: basePadding,
            paddingBottom: basePadding,
            boxShadow: "none",
            transform: "translateY(0)",
            "&:hover": {
              boxShadow: "none",
              ...(isClickable || isSelected
                ? { borderBottomWidth: baseBottomBorderWidth }
                : {}),
            },
            "&:active": {
              boxShadow: "none",
              ...(isClickable || isSelected
                ? {
                    borderBottomWidth: 2,
                    transform: "translateY(2px)",
                  }
                : {}),
            },
            ...((isClickable || isSelected) && { cursor: "pointer" }),
            ...borderWidths,
          };
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ].filter(Boolean)}
      {...rest}
    />
  );
};

export default Card;
