import { Icon } from "@eduriam/ui-core";

import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";

import styles from "./MatchAudioOption.module.css";

export interface IMatchAudioOptionProps {
  audioUrl: string;
  selected?: boolean;
  disabled?: boolean;
  animateWrong?: boolean;
  onClick?: () => void;
}

const MatchAudioOption: React.FC<IMatchAudioOptionProps> = ({
  audioUrl,
  selected,
  disabled,
  animateWrong,
  onClick,
}) => {
  const [value, setValue] = useState(0);
  const [state, setState] = useState<"STOPPED" | "RUNNING" | "PAUSED">(
    "STOPPED",
  );
  const audioRef = useRef(new Audio(audioUrl));

  useEffect(() => {
    if (disabled === true) {
      resetSound();
    }
  }, [disabled]);

  function resetSound() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setState("STOPPED");
    setValue(0);
  }

  useEffect(() => {
    if (state === "RUNNING") {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      audioRef.current.pause();
    }
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

  const handleButtonClick = () => {
    if (audioRef.current.paused) {
      if (audioRef.current.currentTime === audioRef.current.duration) {
        resetSound();
      }

      setState("RUNNING");
    } else {
      setState("PAUSED");
    }

    onClick?.();
  };

  return (
    <Card
      sx={{
        borderStyle: selected === true ? "solid" : undefined,
        borderWidth: selected === true ? 2 : undefined,
        borderColor: selected === true ? "primary.main" : undefined,
        borderRadius: "8px",
      }}
      elevation={0}
      className={animateWrong ? `${styles.shake}` : undefined}
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        sx={{ width: "100%", height: "100%" }}
      >
        <Box>
          <IconButton
            onClick={handleButtonClick}
            sx={{ zIndex: 1, borderRadius: 0 }}
            disabled={disabled}
            aria-label="toggle-audio"
          >
            {state === "STOPPED" || state === "PAUSED" ? (
              <Icon
                name="play_arrow"
                color={disabled ? undefined : "primary"}
                fontSize="large"
              />
            ) : (
              <Icon
                name="pause"
                color={disabled ? undefined : "primary"}
                fontSize="large"
              />
            )}
          </IconButton>
        </Box>
        <CardActionArea
          onClick={handleButtonClick}
          disabled={disabled}
          sx={{
            height: "100%",
            width: "100%",
            minWidth: "128px",
            px: 1,
            py: "auto",
          }}
        >
          <LinearProgress
            value={value}
            variant="determinate"
            color={disabled ? "inherit" : "primary"}
          />
        </CardActionArea>
      </Box>
    </Card>
  );
};

export default MatchAudioOption;
