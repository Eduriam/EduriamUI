import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

export type ProgressBarSize = "small" | "medium" | "large";

export interface ProgressBarProps extends Omit<
  LinearProgressProps,
  "variant" | "value"
> {
  size?: ProgressBarSize;
  value?: number;
}

const SIZE_CONFIG: Record<ProgressBarSize, { height: number; radius: number }> =
  {
    small: { height: 4, radius: 0 },
    medium: { height: 8, radius: 4 },
    large: { height: 12, radius: 12 },
  };

const clampValue = (value: number) => Math.min(100, Math.max(0, value));

export const ProgressBar: React.FC<ProgressBarProps> = ({
  size = "small",
  value = 40,
  sx,
  ...rest
}) => {
  const config = SIZE_CONFIG[size];
  const clampedValue = clampValue(value);
  const borderRadius = config.radius ? `${config.radius}px` : 0;

  return (
    <LinearProgress
      variant="determinate"
      value={clampedValue}
      sx={[
        {
          backgroundColor: "background.paper",
          borderRadius,
          height: config.height,
          position: "relative",
          width: "100%",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "primary.main",
            borderRadius,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ].filter(Boolean)}
      {...rest}
    />
  );
};

export default ProgressBar;
