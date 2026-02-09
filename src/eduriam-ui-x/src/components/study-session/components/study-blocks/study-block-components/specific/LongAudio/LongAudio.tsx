import { Icon } from "@eduriam/ui-core";

import React, { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";

import { LongAudioComponent } from "../../types/StudyBlockComponentDTO";

export interface ILongAudioStudyBlockComponent {
  component: LongAudioComponent;
  playOnMount?: boolean;
}

export const LongAudio: React.FC<ILongAudioStudyBlockComponent> = ({
  component,
  playOnMount = false,
}) => {
  const [value, setValue] = useState(0);
  const [state, setState] = useState<"STOPPED" | "RUNNING" | "PAUSED">(
    playOnMount ? "RUNNING" : "STOPPED",
  );
  const audioRef = useRef(new Audio(component.audioUrl));

  function reset() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setState("STOPPED");
    setValue(0);
  }

  useEffect(() => {
    state === "RUNNING" ? audioRef.current.play() : audioRef.current.pause();
  }, [state]);

  useEffect(() => {
    const ref = audioRef.current;
    return () => ref.pause();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current.currentTime >= audioRef.current.duration) {
        setState("STOPPED");
      }
      setValue(
        () => (audioRef.current.currentTime / audioRef.current.duration) * 100,
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (audioRef.current.paused) {
      if (audioRef.current.currentTime === audioRef.current.duration) {
        reset();
      }
      setState("RUNNING");
    } else {
      setState("PAUSED");
    }
  };

  const handleReplay = () => {
    if (state === "STOPPED") {
      setState("RUNNING");
      audioRef.current.play();
    }
    audioRef.current.currentTime -= 10;
  };

  const handleForward = () => {
    audioRef.current.currentTime += 10;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <LinearProgress value={value} variant="determinate" color="primary" />
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box>
          <IconButton onClick={handleReplay} size="medium">
            <Icon name="play" color="primary" />
          </IconButton>
        </Box>
        <IconButton onClick={handleClick} size="large" aria-label="Play audio">
          {state === "STOPPED" || state === "PAUSED" ? (
            <Icon name="play" color="primary" fontSize="large" />
          ) : (
            <Icon name="play" color="primary" fontSize="large" />
          )}
        </IconButton>
        <Box>
          <IconButton onClick={handleForward} size="medium">
            <Icon name="play" color="primary" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default LongAudio;
