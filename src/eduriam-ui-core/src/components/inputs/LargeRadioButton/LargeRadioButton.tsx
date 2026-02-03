import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Theme } from "@mui/material/styles";

export interface LargeRadioButtonProps extends Omit<BoxProps, "children"> {
  selected?: boolean;
  expanded?: boolean;
  text?: string;
  subText?: string;
  fullWidth?: boolean;
}

export const LargeRadioButton: React.FC<LargeRadioButtonProps> = ({
  selected = true,
  expanded = false,
  text = "Button",
  subText = "Sub Text",
  fullWidth = false,
  sx,
  ...rest
}) => {
  const isExpanded = Boolean(expanded);

  return (
    <Box
      sx={[
        (theme: Theme) => ({
          alignItems: isExpanded ? "flex-start" : "center",
          border: `1.5px solid ${
            selected ? theme.palette.primary.main : theme.palette.divider
          }`,
          borderBottomWidth: "3px",
          borderRadius: "16px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: isExpanded ? "column" : "row",
          gap: isExpanded ? "8px" : 0,
          minHeight: isExpanded ? "auto" : "48px",
          padding: isExpanded ? "16px" : "0 16px",
          width: fullWidth ? "100%" : "357px",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ].filter(Boolean)}
      {...rest}
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
