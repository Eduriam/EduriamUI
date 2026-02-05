import { TypographyVariant } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

/**
 * Props for the `DividerWithText` component.
 *
 * Shows a horizontal divider with centered text in the middle.
 */
export interface DividerWithTextProps {
  /**
   * Text label rendered in the center of the divider.
   */
  text: string;

  /**
   * Typography variant used for the label text.
   *
   * @default theme default for `Typography` when omitted.
   */
  variant?: TypographyVariant;
}

/**
 * Horizontal divider with a short label in the center.
 *
 * Use this to visually separate sections with labels such as “or continue with”.
 */
export const DividerWithText: React.FC<DividerWithTextProps> = ({
  text,
  variant,
}) => {
  return (
    <Divider>
      <Typography variant={variant}>{text}</Typography>
    </Divider>
  );
};

export default DividerWithText;
