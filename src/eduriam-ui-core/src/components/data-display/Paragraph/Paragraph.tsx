import Typography, { TypographyProps } from "@mui/material/Typography";

export interface ParagraphProps
  extends Omit<TypographyProps, "variant" | "color" | "children"> {
  text?: string;
}

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
