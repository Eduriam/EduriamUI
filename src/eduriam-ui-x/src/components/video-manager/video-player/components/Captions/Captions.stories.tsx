import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { Box, Slider, Typography } from "@mui/material";

import { Caption } from "../../../video-scenes/Scene";
import Captions from "./Captions";

const sampleCaptions: Caption[] = [
  {
    text: " Hello",
    startMs: 0,
    endMs: 400,
    timestampMs: 200,
    confidence: null,
  },
  {
    text: " and",
    startMs: 400,
    endMs: 600,
    timestampMs: 500,
    confidence: null,
  },
  {
    text: " welcome",
    startMs: 600,
    endMs: 1000,
    timestampMs: 800,
    confidence: null,
  },
  {
    text: " to",
    startMs: 1000,
    endMs: 1100,
    timestampMs: 1050,
    confidence: null,
  },
  {
    text: " this",
    startMs: 1100,
    endMs: 1300,
    timestampMs: 1200,
    confidence: null,
  },
  {
    text: " video.",
    startMs: 1300,
    endMs: 1800,
    timestampMs: 1550,
    confidence: null,
  },
  {
    text: " When",
    startMs: 2000,
    endMs: 2300,
    timestampMs: 2150,
    confidence: null,
  },
  {
    text: " audio",
    startMs: 2300,
    endMs: 2600,
    timestampMs: 2450,
    confidence: null,
  },
  {
    text: " is",
    startMs: 2600,
    endMs: 2800,
    timestampMs: 2700,
    confidence: null,
  },
  {
    text: " off,",
    startMs: 2800,
    endMs: 3200,
    timestampMs: 3000,
    confidence: null,
  },
  {
    text: " captions",
    startMs: 3200,
    endMs: 3800,
    timestampMs: 3500,
    confidence: null,
  },
  {
    text: " will",
    startMs: 3800,
    endMs: 4100,
    timestampMs: 3950,
    confidence: null,
  },
  {
    text: " appear.",
    startMs: 4100,
    endMs: 4800,
    timestampMs: 4450,
    confidence: null,
  },
];

const meta: Meta<typeof Captions> = {
  title: "x/video-manager/video-player/components/Captions",
  component: Captions,
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%", maxWidth: 720, mx: "auto" }}>
        <Box
          sx={{
            position: "relative",
            aspectRatio: "16/9",
            bgcolor: "grey.900",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Story />
        </Box>
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Captions>;

export const Default: Story = {
  args: {
    captions: sampleCaptions,
    currentTimeMs: 1500,
    combineTokensWithinMilliseconds: 1200,
    visible: true,
  },
};

export const WordByWord: Story = {
  args: {
    captions: sampleCaptions,
    currentTimeMs: 800,
    combineTokensWithinMilliseconds: 500,
    visible: true,
  },
};

export const Hidden: Story = {
  args: {
    captions: sampleCaptions,
    currentTimeMs: 2000,
    visible: false,
  },
};

/** Interactive demo: drag the slider to scrub through caption time. */
export const WithTimeSlider: Story = {
  render: (args) => {
    const [timeMs, setTimeMs] = useState(0);
    return (
      <Box sx={{ width: "100%", maxWidth: 720, mx: "auto" }}>
        <Box
          sx={{
            position: "relative",
            aspectRatio: "16/9",
            bgcolor: "grey.900",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Captions {...args} currentTimeMs={timeMs} />
        </Box>
        <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
          Current time: {(timeMs / 1000).toFixed(1)}s
        </Typography>
        <Slider
          value={timeMs}
          onChange={(_, v) => setTimeMs(Number(v))}
          min={0}
          max={5000}
          step={50}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${(v / 1000).toFixed(1)}s`}
          sx={{ mt: 0.5 }}
        />
      </Box>
    );
  },
  args: {
    captions: sampleCaptions,
    currentTimeMs: 0,
    combineTokensWithinMilliseconds: 1200,
    visible: true,
  },
};
