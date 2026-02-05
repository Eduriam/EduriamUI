import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Theme } from "@mui/material/styles";

export interface LargeRadioButtonProps {
  selected?: boolean;
  expanded?: boolean;
  text?: string;
  subText?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  role?: string;
  "aria-checked"?: boolean;
}

export const LargeRadioButton: React.FC<LargeRadioButtonProps> = ({
  selected = true,
  expanded = false,
  text = "Button",
  subText = "Sub Text",
  fullWidth = false,
  onClick,
  role,
  "aria-checked": ariaChecked,
}) => {
  const isExpanded = Boolean(expanded);

  return (
    <Box
      role={role}
      aria-checked={ariaChecked}
      onClick={onClick}
      sx={(theme: Theme) => ({
        alignItems: isExpanded ? "flex-start" : "center",
        border: `1.5px solid ${
          selected ? theme.palette.primary.main : theme.palette.divider
        }`,
        borderBottomWidth: "3px",
        borderRadius: "16px",
        boxSizing: "border-box",
        cursor: "pointer",
        display: "flex",
        flexDirection: isExpanded ? "column" : "row",
        gap: isExpanded ? "8px" : 0,
        minHeight: isExpanded ? "auto" : "48px",
        padding: isExpanded ? "16px" : "0 16px",
        width: fullWidth ? "100%" : "357px",
      })}
    >
      <Typography color="text.primary" variant="body1">
        {text}
      </Typography>
      {isExpanded && (
        <Typography color="text.secondary" variant="body2">
          {subText}
        </Typography>
      )}
    </Box>
  );
};

export default LargeRadioButton;
