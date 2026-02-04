import Box from "@mui/material/Box";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

export interface TextFieldProps extends Omit<InputBaseProps, "size"> {
  displayLabel?: boolean;
  label?: string;
  containerSx?: SxProps<Theme>;
}

export const TextField: React.FC<TextFieldProps> = ({
  displayLabel = false,
  label = "Label",
  multiline = false,
  disabled = false,
  fullWidth = false,
  placeholder = "Placeholder",
  minRows,
  containerSx,
  sx,
  ...rest
}) => {
  const resolvedMinRows = multiline ? (minRows ?? 4) : undefined;

  return (
    <Box
      sx={[
        {
          display: "flex",
          flexDirection: displayLabel ? "column" : "row",
          gap: displayLabel ? "8px" : 0,
          width: fullWidth ? "100%" : "357px",
        },
        ...(Array.isArray(containerSx) ? containerSx : [containerSx]),
      ].filter(Boolean)}
    >
      {displayLabel && (
        <Typography color="text.primary" variant="fieldLabel">
          {label}
        </Typography>
      )}
      <Box
        sx={(theme: Theme) => ({
          alignItems: multiline ? "flex-start" : "center",
          backgroundColor: theme.palette.background.default,
          border: `1.5px solid ${theme.palette.divider}`,
          borderRadius: "12px",
          boxSizing: "border-box",
          display: "flex",
          minHeight: multiline ? "160px" : "56px",
          width: "100%",
        })}
      >
        <InputBase
          disabled={disabled}
          fullWidth
          minRows={resolvedMinRows}
          multiline={multiline}
          placeholder={placeholder}
          sx={[
            (theme: Theme) => ({
              backgroundColor: "transparent",
              color: disabled
                ? theme.palette.text.disabled
                : theme.palette.text.primary,
              flex: 1,
              lineHeight: "100%",
              padding: 4,
              "& .MuiInputBase-input": {
                fontSize: theme.typography.body1.fontSize,
                fontWeight: theme.typography.body1.fontWeight,
                lineHeight: "100%",
                padding: 0,
              },
              "& .MuiInputBase-input::placeholder": {
                color: theme.palette.text.secondary,
                opacity: 1,
              },
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
          ].filter(Boolean)}
          {...rest}
        />
      </Box>
    </Box>
  );
};

export default TextField;
