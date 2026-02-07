import Typography, { TypographyProps } from "@mui/material/Typography";

/**
 * Logical heading variants supported by the `Header` component.
 *
 * - `"page"` – top-level page heading (`h1`).
 * - `"title"` – primary section heading (`h2`).
 * - `"section"` – subsection heading (`h5`).
 * - `"subsection"` – smaller nested heading (`h6`).
 */
export type HeaderVariant = "page" | "title" | "section" | "subsection";

/** Alignment options for the `Header` component. */
export type HeaderAlign = "left" | "center" | "right";

/**
 * Props for the `Header` component.
 *
 * Wraps MUI `Typography` to render semantic heading text with the correct
 * size and weight for different heading levels.
 */
export interface HeaderProps {
  /**
   * Logical heading variant used to choose the underlying typography variant.
   *
   * @default "page"
   */
  variant?: HeaderVariant;

  /**
   * Text content to render inside the heading.
   *
   * @default "Header"
   */
  text?: string;

  /**
   * Text alignment of the header.
   *
   * @default "left"
   */
  align?: HeaderAlign;
}

const TYPOGRAPHY_VARIANT_BY_VARIANT: Record<HeaderVariant, TypographyProps["variant"]> = {
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
  variant = "page",
  text = "Header",
  align = "left",
}) => {
  return (
    <Typography
      color="text.primary"
      variant={TYPOGRAPHY_VARIANT_BY_VARIANT[variant]}
      sx={{ textAlign: align }}
    >
      {text}
    </Typography>
  );
};

export default Header;
