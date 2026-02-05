import Typography, { TypographyProps } from "@mui/material/Typography";

/**
 * Logical heading levels supported by the `Header` component.
 *
 * - `"page"` – top-level page heading (`h1`).
 * - `"title"` – primary section heading (`h2`).
 * - `"section"` – subsection heading (`h5`).
 * - `"subsection"` – smaller nested heading (`h6`).
 */
export type HeaderLevel = "page" | "title" | "section" | "subsection";

/**
 * Props for the `Header` component.
 *
 * Wraps MUI `Typography` to render semantic heading text with the correct
 * size and weight for different heading levels.
 */
export interface HeaderProps extends Omit<
  TypographyProps,
  "variant" | "color" | "children"
> {
  /**
   * Logical heading level used to choose the underlying typography variant.
   *
   * @default "page"
   */
  level?: HeaderLevel;

  /**
   * Text content to render inside the heading.
   *
   * @default "Header"
   */
  text?: string;
}

const VARIANT_BY_LEVEL: Record<HeaderLevel, TypographyProps["variant"]> = {
  page: "h1",
  title: "h2",
  section: "h5",
  subsection: "h6",
};

/**
 * Typography-based heading component for page and section titles.
 *
 * Prefer `Header` over raw `Typography` for top-level headings so that
 * pages use a consistent hierarchy.
 */
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
