import { IconProps } from "@mui/material";
import MuiIcon from "@mui/material/Icon";
import type { Palette } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

import { ICON_CONFIG } from "./iconConfig";

/**
 * Semantic color names mapped to palette colors.
 */
export type IconColor =
  | "textPrimary"
  | "textSecondary"
  | "white"
  | "black"
  | "primary"
  | "success"
  | "error"
  | "warning";

const ICON_COLOR_MAP: Record<IconColor, (palette: Palette) => string> = {
  textPrimary: (p) => p.text.primary,
  textSecondary: (p) => p.text.secondary,
  white: (p) => p.common.white,
  black: (p) => p.common.black,
  primary: (p) => p.primary.main,
  success: (p) => p.success.main,
  error: (p) => p.error.main,
  warning: (p) => p.warning.main,
};

/**
 * Additional props required by the `Icon` component.
 *
 * Extends MUI `IconProps` with a `name` that maps to a Material Icon glyph
 * and variant via `iconConfig`.
 */
export interface IconPropsExtended {
  /**
   * Icon name. Must be a key in `iconConfig` (e.g. `"report"`, `"home"`, `"close"`).
   */
  name: string;

  /**
   * Semantic color from the theme palette.
   */
  color?: IconColor;
}

/**
 * Resolves an icon name to glyph and variant via iconConfig.
 */
function resolveIcon(name: string): { glyph: string; outlined: boolean } {
  const entry = ICON_CONFIG[name];
  if (entry) {
    return {
      glyph: entry.glyph,
      outlined: entry.variant === "outlined",
    };
  }
  return { glyph: name, outlined: false };
}

/**
 * Wrapper around MUI `Icon` that supports both filled and outlined
 * Material Icons via the `name` prop and `iconConfig`.
 *
 * Use this whenever you need a Material icon so styling and font setup
 * remain consistent.
 */
export const Icon: React.FC<IconPropsExtended & IconProps> = (props) => {
  const { name, color, sx, ...rest } = props;
  const theme = useTheme();
  const { glyph, outlined } = resolveIcon(name);

  const colorStyle =
    color !== undefined
      ? { color: ICON_COLOR_MAP[color](theme.palette) }
      : undefined;

  const combinedSx = [
    ...(colorStyle ? [colorStyle] : []),
    ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
  ];

  return (
    <MuiIcon
      baseClassName={outlined ? "material-icons-outlined" : undefined}
      sx={combinedSx.length > 0 ? combinedSx : undefined}
      {...rest}
    >
      {glyph}
    </MuiIcon>
  );
};

export default Icon;
