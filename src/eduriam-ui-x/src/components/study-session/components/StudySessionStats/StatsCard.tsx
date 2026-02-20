import { Card, Illustration, type IllustrationName } from "@eduriam/ui-core";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/**
 * Props for the `StatsCard` component.
 *
 * Compact card used in the study session stats grid to display a single
 * metric (e.g. XP gained, time studied) with an illustration icon.
 */
export interface StatsCardProps {
  /** Illustration icon shown on the left side of the card. */
  illustration: IllustrationName;

  /** Primary value displayed in bold (e.g. "12", "1:26", "90%"). */
  value: string;

  /** Secondary label below the value (e.g. "XP gained", "min studied"). */
  label: string;
}

/**
 * Compact stats card showing an illustration, a bold metric value, and a label.
 *
 * Used in the `StudySessionStats` 2x2 grid to present post-session metrics.
 * Wraps the design-system `Card` component with small padding.
 */
export const StatsCard: React.FC<StatsCardProps> = ({
  illustration,
  value,
  label,
}) => (
  <Card paddingX="small" paddingY="small">
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Illustration name={illustration} width={32} height={32} />

      <Box>
        <Typography variant="body2" fontWeight="bold" color="text.primary">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Box>
  </Card>
);

export default StatsCard;
