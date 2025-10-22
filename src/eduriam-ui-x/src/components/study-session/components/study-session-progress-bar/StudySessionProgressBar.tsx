import { Icon } from "@eduriam/ui-core";

import React from "react";

import {
  Container,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export interface IStudySessionProgressBar {
  value: number;
  maxValue: number;
  onExit: () => void;
}

const StudySessionProgressBar: React.FC<IStudySessionProgressBar> = ({
  value,
  maxValue,
  onExit,
}) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Toolbar />

      {desktop ? (
        <Container maxWidth="md" sx={{ mb: 2 }}>
          <Toolbar sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                color="primary"
                variant="determinate"
                value={value <= maxValue ? (value / maxValue) * 100 : 100}
                sx={{
                  height: 9,
                  borderRadius: 5,
                }}
              />
            </Box>

            <IconButton onClick={() => onExit()}>
              <Icon name={"close"} />
            </IconButton>
          </Toolbar>
        </Container>
      ) : (
        <>
          <Box
            sx={{
              display: "block",
              position: "fixed",
              width: "100%",
              zIndex: 1,
            }}
          >
            <Toolbar />
            <LinearProgress
              color="primary"
              variant="determinate"
              value={value <= maxValue ? (value / maxValue) * 100 : 100}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default StudySessionProgressBar;
