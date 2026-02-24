import type { Meta, StoryObj } from "@storybook/react";

import type { Caption } from "../video-scenes/Scene";
import type { VideoDefinition } from "../video/VideoDefinition";
import { VideoPlayer } from "./VideoPlayer";

const sampleDefinition: VideoDefinition = {
  fps: 30,
  videoWidth: 1920,
  videoHeight: 1080,
  scenes: [
    {
      id: "scene-1",
      duration: 10000,
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
              id: "h1",
              type: "HEADER",
              startTime: 0,
              text: "Welcome to Eduriam",
              position: "CENTER",
            },
          ],
        },
      ],
    },
  ],
};

const multiSceneDefinition: VideoDefinition = {
  fps: 30,
  videoWidth: 1920,
  videoHeight: 1080,
  scenes: [
    {
      id: "scene-1",
      duration: 5000,
      slides: [
        {
          id: "slide-1",
          type: "RAW",
          components: [
            {
              id: "bg1",
              type: "BACKGROUND_COLOR",
              startTime: 0,
              color: "#ffffff",
            },
            {
              id: "ph1",
              type: "PAGE_HEADER",
              startTime: 0,
              text: "Key Concepts",
            },
            {
              id: "ps1",
              type: "PAGE_SUBHEADER",
              startTime: 1000,
              text: "Understanding the fundamentals",
            },
          ],
        },
      ],
    },
    {
      id: "scene-2",
      duration: 15000,
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
              id: "l1",
              type: "LIST",
              startTime: 0,
              position: "CENTER",
              title: "Topics",
              ordered: true,
              items: [
                { id: "i1", text: "Variables and Types" },
                { id: "i2", text: "Functions" },
                { id: "i3", text: "Control Flow" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const templateSlideDefinition: VideoDefinition = {
  fps: 30,
  videoWidth: 1920,
  videoHeight: 1080,
  scenes: [
    {
      id: "scene-1",
      duration: 5000,
      slides: [
        {
          id: "oh-1",
          type: "ONE_HEADER",
          text: "Welcome to Eduriam",
        },
      ],
    },
    {
      id: "scene-2",
      duration: 10000,
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
              id: "h1",
              type: "HEADER",
              startTime: 0,
              text: "Second Scene",
              position: "CENTER",
            },
          ],
        },
      ],
    },
  ],
};

const codeExplainerDefinition: VideoDefinition = {
  fps: 30,
  videoWidth: 1920,
  videoHeight: 1080,
  scenes: [
    {
      id: "scene-code-1",
      duration: 10000,
      slides: [
        {
          id: "slide-code-1",
          type: "RAW",
          components: [
            {
              id: "bg-code-1",
              type: "BACKGROUND_COLOR",
              startTime: 0,
              color: "#020617",
            },
            {
              id: "ce-1",
              type: "CODE_EXPLAINER",
              startTime: 0,
              position: "CENTER",
              colorMode: "DARK",
              steps: [
                {
                  id: "step-1",
                  startTime: 0,
                  language: "ts",
                  code: `const user = {
  name: "Ada",
  age: 26,
};

console.log(user);
//           ^?`,
                },
                {
                  id: "step-2",
                  startTime: 2600,
                  language: "ts",
                  code: `const user = {
  name: "Ada",
  age: 26,
};

// @errors: 2339
console.log(user.location);`,
                },
                {
                  id: "step-3",
                  startTime: 5200,
                  language: "ts",
                  code: `const user = {
  name: "Ada",
  age: 26,
  location: "London",
};

console.log(user.location);
//           ^?`,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const meta: Meta<typeof VideoPlayer> = {
  title: "x/video-manager/video-player/VideoPlayer",
  component: VideoPlayer,
};

export default meta;
type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  args: {
    videoDefinition: sampleDefinition,
  },
};

export const MultiScene: Story = {
  args: {
    videoDefinition: multiSceneDefinition,
  },
};

export const WithTemplateSlide: Story = {
  args: {
    videoDefinition: templateSlideDefinition,
  },
};

export const WithCodeExplainer: Story = {
  args: {
    videoDefinition: codeExplainerDefinition,
  },
};

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
    text: " Mute",
    startMs: 2000,
    endMs: 2400,
    timestampMs: 2200,
    confidence: null,
  },
  {
    text: " to",
    startMs: 2400,
    endMs: 2600,
    timestampMs: 2500,
    confidence: null,
  },
  {
    text: " see",
    startMs: 2600,
    endMs: 2900,
    timestampMs: 2750,
    confidence: null,
  },
  {
    text: " captions.",
    startMs: 2900,
    endMs: 3600,
    timestampMs: 3250,
    confidence: null,
  },
];

/** When audio is muted, captions are displayed. Turn sound off to see them. */
export const WithCaptions: Story = {
  args: {
    videoDefinition: sampleDefinition,
    captions: sampleCaptions,
  },
};
