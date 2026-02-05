import Typography, { TypographyProps } from "@mui/material/Typography";

/**
 * Props for the `Paragraph` component.
 *
 * Wraps MUI `Typography` for standard body text paragraphs.
 */
export interface ParagraphProps extends Omit<
  TypographyProps,
  "variant" | "color" | "children"
> {
  /**
   * Text content of the paragraph.
   *
   * @default "Paragraph"
   */
  text?: string;
}

/**
 * Body text paragraph styled with the standard secondary text color.
 *
 * Use `Paragraph` for explanatory copy instead of raw `Typography` to keep
 * body text visually consistent.
 */
export const Paragraph: React.FC<ParagraphProps> = ({
  text = "Paragraph",
  ...rest
}) => {
  return (
    <Typography color="text.secondary" variant="body1" {...rest}>
      {text}
    </Typography>
  );
};

export default Paragraph;
