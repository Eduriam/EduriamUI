import type { MouseEventHandler } from "react";

import { Link as MuiLink } from "@mui/material";

export type LinkColor = "textPrimary" | "textSecondary";
export type LinkVariant = "body1" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface LinkProps {
  color?: LinkColor;
  text?: string;
  href?: string;
  target?: "_blank";
  variant?: LinkVariant;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

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
