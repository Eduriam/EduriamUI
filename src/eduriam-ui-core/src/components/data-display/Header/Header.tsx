import Typography, { TypographyProps } from "@mui/material/Typography";

export type HeaderLevel = "page" | "title" | "section" | "subsection";

export interface HeaderProps
  extends Omit<TypographyProps, "variant" | "color" | "children"> {
  level?: HeaderLevel;
  text?: string;
}

const VARIANT_BY_LEVEL: Record<HeaderLevel, TypographyProps["variant"]> = {
  page: "h1",
  title: "h2",
  section: "h5",
  subsection: "h6",
};

export const Header: React.FC<HeaderProps> = ({
  level = "page",
  text = "Header",
  ...rest
}) => {
  return (
    <Typography
      color="text.primary"
      variant={VARIANT_BY_LEVEL[level]}
      {...rest}
    >
      {text}
    </Typography>
  );
};

export default Header;
