import type { MouseEventHandler } from "react";

import { Link as MuiLink } from "@mui/material";

/**
 * Color choices for the `Link` component, mapped to text colors.
 *
 * - `"textPrimary"` – main text color.
 * - `"textSecondary"` – secondary text color.
 */
export type LinkColor = "textPrimary" | "textSecondary";

/**
 * Typography variants supported by `Link`.
 */
export type LinkVariant =
  | "body1"
  | "body2"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2";

/**
 * Props for the `Link` component.
 *
 * Wrapper around MUI `Link` with constrained colors and variants.
 */
export interface LinkProps {
  /**
   * Text color mapping.
   *
   * @default "textPrimary"
   */
  color?: LinkColor;

  /**
   * Link label text.
   *
   * @default "Link"
   */
  text?: string;

  /**
   * Href for the anchor. Can be omitted for button-like links with onClick.
   */
  href?: string;

  /**
   * Target attribute, typically `"_blank"` when opening in a new tab.
   */
  target?: "_blank";

  /**
   * Typography variant controlling font size/weight.
   *
   * @default "body1"
   */
  variant?: LinkVariant;

  /**
   * Click handler for the anchor element.
   */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/**
 * Text link component styled consistently with Eduriam typography.
 *
 * Use this for navigational or inline links rather than plain `<a>` tags.
 */
export const Link: React.FC<LinkProps> = ({
  color = "textPrimary",
  text = "Link",
  href,
  target,
  variant = "body1",
  onClick,
}) => {
  const typographyColor =
    color === "textSecondary" ? "text.secondary" : "text.primary";

  return (
    <MuiLink
      href={href}
      target={target}
      onClick={onClick}
      color={typographyColor}
      variant={variant}
      underline="always"
      sx={{ textDecoration: "underline" }}
    >
      {text}
    </MuiLink>
  );
};

export default Link;
