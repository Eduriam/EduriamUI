import type { MouseEventHandler, ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import type { SxProps, Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

/**
 * Visual variants for the `Card` component.
 *
 * - `"default"` – neutral card with standard border.
 * - `"clickable"` – interactive card that responds to hover/active.
 * - `"selected"` – highlighted card used for the chosen option.
 * - `"disabled"` – looks like `"default"` but uses `background.paper`.
 */
export type CardVariant = "default" | "clickable" | "selected" | "disabled";

/**
 * Props for the `Card` component.
 *
 * Eduriam-styled surface container for grouping related content.
 */
export interface CardProps {
  /**
   * Visual style and behavior of the card.
   *
   * @default "default"
   */
  variant?: CardVariant;

  /**
   * Vertical padding preset/scale for the content area.
   *
   * @default "medium"
   */
  paddingY?: "small" | "medium" | "large" | number;

  /**
   * Horizontal padding preset/scale for the content area.
   *
   * @default "medium"
   */
  paddingX?: "small" | "medium" | "large" | number;

  /**
   * Custom `sx` styles merged into the underlying MUI `Paper`.
   */
  sx?: SxProps<Theme>;

  /**
   * Content rendered inside the card.
   */
  children?: ReactNode;

  /**
   * Called when the card is clicked (only meaningful for clickable variants).
   */
  onClick?: MouseEventHandler<HTMLDivElement>;

  /**
   * Optional data attribute used to identify this card in E2E tests.
   *
   * Passed directly to the underlying MUI `Paper` as `data-test`.
   */
  "data-test"?: string;
}

/**
 * Card surface component for grouping related content.
 *
 * Use `Card` for panels, options, and sections that should stand out from
 * the background but still feel lightweight.
 */
export const Card: React.FC<CardProps> = ({
  variant = "default",
  paddingY = "large",
  paddingX = "large",
  sx,
  children,
  onClick,
  "data-test": dataTest,
}) => {
  const isClickable = variant === "clickable";
  const isSelected = variant === "selected";
  const isDisabled = variant === "disabled";
  const hasPressEffect = isClickable || isSelected;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (!hasPressEffect || !paperRef.current) return;
    const el = paperRef.current;
    setMinHeight(el.getBoundingClientRect().height);
  }, [hasPressEffect, children]);

  const borderColor = isSelected ? "primary.main" : "divider";
  const baseBottomBorderWidth = variant === "default" || isDisabled ? 2 : 4;
  const resolvePaddingScale = (
    value: "small" | "medium" | "large" | number,
  ) => {
    if (typeof value === "number") return value;
    switch (value) {
      case "small":
        return 3;
      case "large":
        return 5;
      case "medium":
      default:
        return 4;
    }
  };
  const paddingScaleY = resolvePaddingScale(paddingY);
  const paddingScaleX = resolvePaddingScale(paddingX);
  const borderWidths =
    variant === "default" || isDisabled
      ? { borderWidth: 2 }
      : {
          borderTopWidth: 2,
          borderRightWidth: 2,
          borderLeftWidth: 2,
          borderBottomWidth: baseBottomBorderWidth,
        };

  const paper = (
    <Paper
      ref={paperRef}
      square={false}
      elevation={0}
      onClick={onClick}
      data-test={dataTest}
      sx={(theme: Theme): SystemStyleObject<Theme> => {
        const basePaddingY = theme.spacing(paddingScaleY);
        const basePaddingX = theme.spacing(paddingScaleX);

        // Ensure the visual padding (from the outer edge including border)
        // matches the requested padding by subtracting the border width.
        const borderTopWidth = 2;
        const borderRightWidth = 2;
        const borderLeftWidth = 2;
        const borderBottomWidth =
          variant === "default" || isDisabled ? 2 : baseBottomBorderWidth;

        const baseStyles: SystemStyleObject<Theme> = {
          width: "100%",
          boxSizing: "border-box",
          borderStyle: "solid",
          borderRadius: theme.shape.borderRadius,
          backgroundColor: isDisabled
            ? "background.paper"
            : "background.default",
          borderColor,
          paddingTop: `calc(${basePaddingY} - ${borderTopWidth}px)`,
          paddingRight: `calc(${basePaddingX} - ${borderRightWidth}px)`,
          paddingLeft: `calc(${basePaddingX} - ${borderLeftWidth}px)`,
          paddingBottom: `calc(${basePaddingY} - ${borderBottomWidth}px)`,
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

        const resolvedSx =
          typeof sx === "function" ? sx(theme) : sx;

        return {
          ...baseStyles,
          ...(resolvedSx as SystemStyleObject<Theme> | undefined),
        };
      }}
    >
      {children}
    </Paper>
  );

  if (hasPressEffect) {
    return (
      <Box ref={wrapperRef} sx={{ minHeight: minHeight ?? undefined }}>
        {paper}
      </Box>
    );
  }

  return paper;
};

export default Card;
