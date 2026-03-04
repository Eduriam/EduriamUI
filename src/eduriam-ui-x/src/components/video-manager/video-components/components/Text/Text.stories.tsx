import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "x/video-manager/video-components/Text",
  component: Text,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          aspectRatio: "1920/1080",
          position: "relative",
          overflow: "hidden",
          background: theme.palette.background.paper,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Text>;

const baseComp = {
  id: "text-1",
  type: "TEXT" as const,
  startTime: 0,
  column: "first" as const,
  align: "center" as const,
};

export const ShortText: Story = {
  args: {
    comp: {
      ...baseComp,
      text: "Eduriam",
    },
  },
};

export const MediumText: Story = {
  args: {
    comp: {
      ...baseComp,
      text: "Teach smarter.\nEngage every learner.\nMeasure real outcomes.",
    },
  },
};

export const LongText: Story = {
  args: {
    comp: {
      ...baseComp,
      text: "Build better lessons with ready-made content blocks, adaptive quizzes, and instant progress analytics.",
    },
  },
};

export const ExtraLongText: Story = {
  args: {
    comp: {
      ...baseComp,
      text: "Design, assign, and track complete learning journeys from one place while learners receive personalized recommendations, targeted practice tasks, and real-time feedback.",
    },
  },
};

export const FormattedText: Story = {
  args: {
    comp: {
      ...baseComp,
      text: "Ship **faster** with __clear__ workflows and `video-components`.",
    },
  },
};
