import Box from "@mui/material/Box";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

/**
 * Props for the `TextField` component.
 *
 * Opinionated wrapper around MUI `InputBase` that applies Eduriam's layout,
 * borders and typography for text inputs and textareas.
 */
export interface TextFieldProps extends Omit<InputBaseProps, "size"> {
  /**
   * Whether to show a label above the input.
   *
   * When true, the label is rendered using the `fieldLabel` typography variant.
   *
   * @default false
   */
  displayLabel?: boolean;

  /**
   * Label text shown when `displayLabel` is true.
   *
   * @default "Label"
   */
  label?: string;

  /**
   * Additional styling for the outer container box.
   */
  containerSx?: SxProps<Theme>;

  /**
   * Optional data attribute used to identify the underlying input in E2E tests.
   *
   * Passed to the underlying MUI `InputBase`'s input element as `data-test`.
   */
  "data-test"?: string;
}

/**
 * Text input component with consistent sizing and border treatment.
 *
 * Supports both single-line and multiline usage. Use this instead of raw
 * MUI `TextField` when you want Eduriam's visual style.
 */
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
  "data-test": dataTest,
  ...rest
}) => {
  const { inputProps, ...restInputBaseProps } = rest;
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
          inputProps={{
            ...(inputProps || {}),
            "data-test": dataTest,
          }}
          {...restInputBaseProps}
        />
      </Box>
    </Box>
  );
};

export default TextField;
