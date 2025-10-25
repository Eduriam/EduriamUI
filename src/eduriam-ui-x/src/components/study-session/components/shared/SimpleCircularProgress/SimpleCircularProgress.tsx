import React, { ReactNode } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export interface ISimpleCircularProgress {
  progress: number; // 0..100
  children?: ReactNode;
}

export const SimpleCircularProgress: React.FC<ISimpleCircularProgress> = ({
  progress,
  children,
}) => {
  const px = 250; // medium
  const lineWidth = 2; // thin
  const boxSize = `${px}px`;

  return (
    <Box sx={{ width: boxSize, height: boxSize, position: "relative" }}>
      {/* Background ring */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={px}
        thickness={lineWidth}
        sx={{
          color: (theme) => theme.palette.grey[200],
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
      {/* Foreground progress */}
      <CircularProgress
        variant="determinate"
        value={progress}
        size={px}
        thickness={lineWidth}
        sx={{
          color: (theme) => theme.palette.primary.main,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      {/* Center content */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: boxSize,
          height: boxSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SimpleCircularProgress;
