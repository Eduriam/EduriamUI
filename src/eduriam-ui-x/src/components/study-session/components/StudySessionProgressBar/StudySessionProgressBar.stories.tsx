import type { Meta, StoryObj } from "@storybook/react";

import StudySessionProgressBar from "./StudySessionProgressBar";

const meta: Meta<typeof StudySessionProgressBar> = {
  title: "x/study-session/StudySessionProgressBar",
  component: StudySessionProgressBar,
  argTypes: {
    currentIndex: { control: { type: "number", min: 0 } },
    furthestCompletedIndex: { control: { type: "number", min: -1 } },
    total: { control: { type: "number", min: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof StudySessionProgressBar>;

export const Default: Story = {
  args: {
    currentIndex: 2,
    furthestCompletedIndex: 4,
    total: 8,
    onExit: () => {},
  },
};

export const FirstStep: Story = {
  args: {
    currentIndex: 0,
    furthestCompletedIndex: -1,
    total: 5,
    onExit: () => {},
  },
};

export const LastStep: Story = {
  args: {
    currentIndex: 4,
    furthestCompletedIndex: 4,
    total: 5,
    onExit: () => {},
  },
};
