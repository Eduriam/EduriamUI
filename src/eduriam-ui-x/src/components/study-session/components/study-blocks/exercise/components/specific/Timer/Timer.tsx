import { Icon } from "@eduriam/ui-core";

import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import SimpleCircularProgress from "../../../../../shared/SimpleCircularProgress/SimpleCircularProgress";
import { TimerComponent } from "../../ExerciseStudyBlockComponentDTO";

export interface ITimerExerciseStudyBlockComponent {
  component: TimerComponent;
}

function formatMmSs(remainingMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const mm = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = (totalSeconds % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

export const Timer: React.FC<ITimerExerciseStudyBlockComponent> = ({
  component,
}) => {
  const totalMs = component.seconds * 1000;
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [state, setState] = useState<"STOPPED" | "RUNNING" | "PAUSED">(
    "RUNNING",
  );

  function resetTimer() {
    setElapsedMs(0);
    setState("RUNNING");
  }

  useEffect(() => {
    if (state !== "RUNNING") return;
    const tickMs = 1000;
    const interval = setInterval(() => {
      setElapsedMs((prev) => {
        const next = prev + tickMs;
        return next >= totalMs ? totalMs : next;
      });
    }, tickMs);
    return () => clearInterval(interval);
  }, [state, totalMs]);

  useEffect(() => {
    if (elapsedMs >= totalMs && state === "RUNNING") {
      setState("STOPPED");
    }
  }, [elapsedMs, totalMs, state]);

  const progress = (elapsedMs / totalMs) * 100;
  const remaining = totalMs - elapsedMs;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <SimpleCircularProgress progress={progress}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">{formatMmSs(remaining)}</Typography>
          <Box>
            {state === "STOPPED" ? (
              <IconButton onClick={resetTimer} size="large">
                <Icon name="play" />
              </IconButton>
            ) : state === "RUNNING" ? (
              <IconButton onClick={() => setState("PAUSED")} size="large">
                <Icon name="play" />
              </IconButton>
            ) : (
              <IconButton onClick={() => setState("RUNNING")} size="large">
                <Icon name="play" />
              </IconButton>
            )}
          </Box>
        </Box>
      </SimpleCircularProgress>
    </Box>
  );
};

export default Timer;
