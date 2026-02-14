import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";

import { StudyBlockComponentType } from "../../StudyBlockComponentTypes";
import Timer from "./Timer";

const meta: Meta<typeof Timer> = {
  title: "x/study-session/study-blocks/exercise-components/Timer",
  component: Timer,
};

export default meta;
type Story = StoryObj<typeof Timer>;

export const Base: Story = {
  args: {
    component: {
      id: "timer-1",
      type: StudyBlockComponentType.TIMER,
      seconds: 3,
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("00:03")).toBeInTheDocument();
  },
};
