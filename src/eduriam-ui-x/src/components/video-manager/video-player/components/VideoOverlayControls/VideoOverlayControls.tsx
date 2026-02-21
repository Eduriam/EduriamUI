import { Icon, IconButton } from "@eduriam/ui-core";

import React from "react";

import { Box, LinearProgress } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

export type VideoPlaybackState = "playing" | "paused" | "ended";

export interface IVideoOverlayControls {
  playbackState: VideoPlaybackState;
  /** 0–100 progress percentage. */
  progress: number;
  isMuted: boolean;
  /** Whether the overlay is visible (hover / paused / ended). */
  visible: boolean;
  onPlayPause: () => void;
  onRestart: () => void;
  onMuteToggle: () => void;
  onSeek: (fraction: number) => void;
}

const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

export const VideoOverlayControls: React.FC<IVideoOverlayControls> = ({
  playbackState,
  progress,
  isMuted,
  visible,
  onPlayPause,
  onRestart,
  onMuteToggle,
  onSeek,
}) => {
  const theme = useTheme();

  const showOverlay = visible || playbackState === "paused" || playbackState === "ended";

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: showOverlay ? "auto" : "none",
        opacity: showOverlay ? 1 : 0,
        transition: "opacity 200ms ease",
      }}
    >
      {/* Center controls: mute + play/pause/replay */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <Box onClick={stopPropagation}>
          <IconButton
            icon={isMuted ? "audioOff" : "audioOn"}
            variant="contained"
            color="textPrimary"
            size="large"
            onClick={onMuteToggle}
          />
        </Box>

        {playbackState === "ended" ? (
          <Box
            component="button"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onRestart();
            }}
            sx={{
              width: 80,
              height: 80,
              borderRadius: "12px",
              backgroundColor: theme.palette.action.disabledBackground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              p: 0,
            }}
          >
            <Icon name="replay" sx={{ fontSize: 48, color: theme.palette.text.primary }} />
          </Box>
        ) : (
          <Box
            component="button"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onPlayPause();
            }}
            sx={{
              width: 80,
              height: 80,
              borderRadius: "12px",
              backgroundColor: theme.palette.action.disabledBackground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              p: 0,
            }}
          >
            <Icon
              name={playbackState === "playing" ? "pause" : "play"}
              sx={{ fontSize: 48, color: theme.palette.text.primary }}
            />
          </Box>
        )}
      </Box>

      {/* Bottom progress bar */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          px: 0,
          cursor: "pointer",
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          const rect = e.currentTarget.getBoundingClientRect();
          const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          onSeek(fraction);
        }}
      >
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: theme.palette.background.paper,
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
              backgroundColor: theme.palette.primary.main,
            },
          }}
        />
      </Box>
    </Box>
  );
};
