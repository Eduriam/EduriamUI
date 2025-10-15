import { TypographyVariant } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export interface DividerWithTextProps {
  text: string;
  variant?: TypographyVariant;
}

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
