import Box from "@mui/material/Box";
import MuiChip, { ChipProps as MuiChipProps } from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import { Icon } from "../Icon";

/**
 * Chip color variants aligned with the Eduriam Figma design system.
 *
 * - `neutral`: Grey border/text
 * - `chipGreen`: Light green background, dark green text
 * - `chipYellow`: Light yellow background, amber text
 * - `chipBlue`: Light blue background, blue text
 * - `chipPink`: Light pink background, dark pink text
 */
export type ChipColor =
  | "neutral"
  | "chipGreen"
  | "chipYellow"
  | "chipBlue"
  | "chipPink";

/**
 * Chip size. Small uses body2, medium uses body1 typography.
 */
export type ChipSize = "small" | "medium";

export interface ChipProps extends Omit<
  MuiChipProps,
  "color" | "icon" | "size" | "sx"
> {
  /**
   * Chip color variant.
   * @default "neutral"
   */
  color?: ChipColor;

  /**
   * Chip size. Small uses body2, medium uses body1 typography.
   * @default "medium"
   */
  size?: ChipSize;

  /**
   * Trailing icon (always on the right). Any icon name from `iconConfig` (e.g. `"arrowRight"`, `"check"`).
   */
  icon?: string;
}

/**
 * Chip component based on MUI Chip, styled to match the Eduriam design system.
 *
 * - **variant**: `outlined` uses border + contrastText for text; `filled` uses background + contrastText for text.
 * - **size**: `small` (body2) or `medium` (body1).
 * - **icon**: Trailing icon (right side) via any icon name from the Icon component.
 */
export const Chip: React.FC<ChipProps> = ({
  color = "neutral",
  variant = "outlined",
  size = "medium",
  icon: iconName,
  label,
  onClick,
}) => {
  const theme = useTheme();
  const chipColor = color === "neutral" ? "default" : color;
  const muiSize = size;
  const labelVariant = size === "small" ? "body2" : "body1";

  const iconSize = size === "small" ? 14 : 16;

  const chipLabel =
    iconName !== undefined && label !== undefined ? (
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{ lineHeight: 1 }}
      >
        {label}
        <Icon
          name={iconName}
          sx={{
            fontSize: iconSize,
            display: "flex",
            alignItems: "center",
            lineHeight: 0,
          }}
        />
      </Stack>
    ) : (
      label
    );

  const paletteColor =
    color !== "neutral"
      ? (
          theme.palette as unknown as Record<
            string,
            { main: string; contrastText: string }
          >
        )[chipColor]
      : null;

  const neutralStyles =
    color === "neutral"
      ? {
          ...(variant === "outlined" && {
            backgroundColor: "transparent",
            borderColor: "divider",
            color: "text.secondary",
          }),
          ...(variant === "filled" && {
            backgroundColor: "action.disabledBackground",
            borderColor: "transparent",
            color: "text.secondary",
          }),
        }
      : {};

  const colorStyles =
    paletteColor && color !== "neutral" && variant === "outlined"
      ? {
          backgroundColor: "transparent",
          borderColor: paletteColor.contrastText,
          color: paletteColor.contrastText,
        }
      : {};

  return (
    <MuiChip
      color={chipColor}
      variant={variant}
      size={muiSize}
      label={chipLabel}
      onClick={onClick}
      sx={{
        borderRadius: size === "small" ? "12px" : "16px",
        px: size === "small" ? 2 : 3,
        fontWeight: 400,
        "& .MuiChip-label": {
          ...theme.typography[labelVariant],
          px: 0,
        },
        ...neutralStyles,
        ...(typeof colorStyles === "object" ? colorStyles : {}),
      }}
    />
  );
};

export default Chip;
