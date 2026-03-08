import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

import { Icon } from "../../data-display/Icon";

/**
 * Props for the `Select` component.
 *
 * Clickable select-like input used to trigger an external picker
 * (for example a bottom drawer with options).
 */
export interface SelectProps {
  /**
   * Label text shown above the input when provided.
   */
  label?: string;

  /**
   * Current selected value label.
   */
  value?: string;

  /**
   * Placeholder text shown when `value` is not provided.
   *
   * @default "Placeholder"
   */
  placeholder?: string;

  /**
   * Whether the component should fill the available horizontal space.
   *
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether interaction is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to show error styling.
   *
   * @default false
   */
  error?: boolean;

  /**
   * Additional styling for the outer container.
   */
  containerSx?: SxProps<Theme>;

  /**
   * Additional styling for the select trigger.
   */
  sx?: SxProps<Theme>;

  /**
   * Called when the trigger is clicked.
   */
  onClick?: () => void;

  /**
   * Optional data attribute used to identify the trigger in E2E tests.
   */
  "data-test"?: string;
}

/**
 * Select-like trigger input styled to match Eduriam text fields.
 */
export const Select: React.FC<SelectProps> = ({
  label,
  value,
  placeholder = "Placeholder",
  fullWidth = false,
  disabled = false,
  error = false,
  containerSx,
  sx,
  onClick,
  "data-test": dataTest,
}) => {
  const hasLabel = label !== undefined;
  const hasValue = Boolean(value);

  return (
    <Box
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          gap: hasLabel ? "8px" : 0,
          width: fullWidth ? "100%" : "357px",
        },
        ...(Array.isArray(containerSx) ? containerSx : [containerSx]),
      ].filter(Boolean)}
    >
      {hasLabel && (
        <Typography color="text.primary" variant="fieldLabel">
          {label}
        </Typography>
      )}
      <ButtonBase
        data-test={dataTest}
        disabled={disabled}
        onClick={onClick}
        sx={[
          (theme: Theme) => ({
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
            border: `1.5px solid ${
              error ? theme.palette.error.main : theme.palette.divider
            }`,
            borderRadius: "12px",
            display: "flex",
            height: "54px",
            justifyContent: "space-between",
            padding: theme.spacing(4),
            width: "100%",
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ].filter(Boolean)}
      >
        <Typography
          color={hasValue ? "text.primary" : "text.secondary"}
          sx={{ textAlign: "left", width: "100%" }}
          variant="body1"
        >
          {hasValue ? value : placeholder}
        </Typography>
        <Icon
          color={disabled ? "textSecondary" : "textPrimary"}
          name="arrowDown"
          sx={{ fontSize: 24, flexShrink: 0 }}
        />
      </ButtonBase>
    </Box>
  );
};

export default Select;
