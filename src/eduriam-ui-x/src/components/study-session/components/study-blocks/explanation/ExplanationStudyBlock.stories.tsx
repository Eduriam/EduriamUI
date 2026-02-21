import { ContentContainer } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import type { Scene } from "../../../../video-manager";
import { STUDY_SESSION_LOCALIZATION_DEFAULT } from "../../../StudySessionLocalizationDefault";
import { ExplanationStudyBlock } from "./ExplanationStudyBlock";

const sampleScenes: Scene[] = [
  {
    id: "scene-1",
    duration: 5000,
    audio: {
      url: "https://mocks.eduriam.com/first-paragraph.mp3",
      captions: [
        { text: " This", startMs: 0, endMs: 280, timestampMs: 140, confidence: null },
        { text: " is", startMs: 280, endMs: 450, timestampMs: 365, confidence: null },
        { text: " the", startMs: 450, endMs: 650, timestampMs: 550, confidence: null },
        { text: " explanation", startMs: 650, endMs: 1200, timestampMs: 925, confidence: null },
        { text: " block.", startMs: 1200, endMs: 1700, timestampMs: 1450, confidence: null },
      ],
    },
    slides: [
      {
        id: "slide-1",
        type: "RAW",
        components: [
          {
            id: "bg1",
            type: "BACKGROUND_COLOR",
            startTime: 0,
            color: "#0ea5e9",
          },
          {
            id: "ph1",
            type: "PAGE_HEADER",
            startTime: 0,
            text: "Explanation",
          },
          {
            id: "ps1",
            type: "PAGE_SUBHEADER",
            startTime: 800,
            text: "Key concepts in this lesson",
          },
        ],
      },
    ],
  },
  {
    id: "scene-2",
    duration: 8000,
    audio: {
      url: "https://mocks.eduriam.com/second-paragraph.mp3",
      captions: [
        { text: " Here", startMs: 0, endMs: 280, timestampMs: 140, confidence: null },
        { text: " are", startMs: 280, endMs: 480, timestampMs: 380, confidence: null },
        { text: " more", startMs: 480, endMs: 760, timestampMs: 620, confidence: null },
        { text: " details", startMs: 760, endMs: 1180, timestampMs: 970, confidence: null },
        { text: " in", startMs: 1180, endMs: 1340, timestampMs: 1260, confidence: null },
        { text: " scene", startMs: 1340, endMs: 1680, timestampMs: 1510, confidence: null },
        { text: " two.", startMs: 1680, endMs: 2150, timestampMs: 1915, confidence: null },
      ],
    },
    slides: [
      {
        id: "slide-2",
        type: "RAW",
        components: [
          {
            id: "bg2",
            type: "BACKGROUND_COLOR",
            startTime: 0,
            color: "#e5e5e5",
          },
          {
            id: "h1",
            type: "HEADER",
            startTime: 0,
            text: "Scene 2",
            position: "CENTER",
          },
        ],
      },
    ],
  },
];

const meta: Meta<typeof ExplanationStudyBlock> = {
  title: "x/study-session/study-blocks/ExplanationStudyBlock",
  component: ExplanationStudyBlock,
  args: {
    onComplete: fn(),
    localization: STUDY_SESSION_LOCALIZATION_DEFAULT,
  },
  decorators: [
    (Story) => (
      <ContentContainer width="large">
        <Story />
      </ContentContainer>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ExplanationStudyBlock>;

export const Default: Story = {
  args: {
    scenes: sampleScenes,
  },
};
