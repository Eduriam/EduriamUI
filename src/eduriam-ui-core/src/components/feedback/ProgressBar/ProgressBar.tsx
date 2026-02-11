import LinearProgress from "@mui/material/LinearProgress";

/**
 * Visual sizes for the `ProgressBar`.
 *
 * - `"small"` – thin, subtle line.
 * - `"medium"` – default size.
 * - `"large"` – taller bar for emphasis.
 */
export type ProgressBarSize = "small" | "medium" | "large";

/**
 * Props for the `ProgressBar` component.
 *
 * Displays determinate progress with Eduriam styling.
 */
export interface ProgressBarProps {
  /**
   * Size of the bar, affecting height and border radius.
   *
   * @default "medium"
   */
  size?: ProgressBarSize;

  /**
   * Completion percentage from 0 to 100.
   *
   * Values outside the range are clamped.
   *
   * @default 40
   */
  value?: number;

  /**
   * Color used for the inner progress bar.
   *
   * Accepts any value suitable for the MUI `LinearProgress` bar
   * `backgroundColor`, such as theme palette keys (`"primary.main"`)
   * or raw color values (`"#1976d2"`).
   *
   * @default "primary.main"
   */
  color?: string;
}

const SIZE_CONFIG: Record<ProgressBarSize, { height: number; radius: number }> =
  {
    small: { height: 4, radius: 0 },
    medium: { height: 8, radius: 4 },
    large: { height: 12, radius: 12 },
  };

const clampValue = (value: number) => Math.min(100, Math.max(0, value));

/**
 * Determinate progress bar styled with the Eduriam theme.
 *
 * Use this for linear progress indicators tied to a known percentage.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  size = "medium",
  value = 40,
  color = "primary.main",
}) => {
  const config = SIZE_CONFIG[size];
  const clampedValue = clampValue(value);
  const borderRadius = config.radius ? `${config.radius}px` : 0;

  return (
    <LinearProgress
      variant="determinate"
      value={clampedValue}
      sx={{
        backgroundColor: "background.paper",
        borderRadius,
        height: config.height,
        position: "relative",
        width: "100%",
        "& .MuiLinearProgress-bar": {
          backgroundColor: color,
          borderRadius,
        },
      }}
    />
  );
};

export default ProgressBar;
