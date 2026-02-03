import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

export type LinkColor = "textPrimary" | "textSecondary";

export interface LinkProps extends Omit<
  MuiLinkProps,
  "color" | "children" | "underline"
> {
  color?: LinkColor;
  text?: string;
}

export const Link: React.FC<LinkProps> = ({
  color = "textPrimary",
  text = "Link",
  sx,
  ...rest
}) => {
  const typographyColor =
    color === "textSecondary" ? "text.secondary" : "text.primary";

  return (
    <MuiLink
      color={typographyColor}
      variant="body1"
      underline="always"
      sx={[
        { textDecoration: "underline" },
        ...(Array.isArray(sx) ? sx : [sx]),
      ].filter(Boolean)}
      {...rest}
    >
      {text}
    </MuiLink>
  );
};

export default Link;
