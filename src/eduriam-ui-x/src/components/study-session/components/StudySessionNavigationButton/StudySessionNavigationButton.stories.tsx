import type { Meta, StoryObj } from "@storybook/react";

import { StudySessionNavigationButton } from "./StudySessionNavigationButton";

const meta: Meta<typeof StudySessionNavigationButton> = {
  title: "x/study-session/StudySessionNavigationButton",
  component: StudySessionNavigationButton,
  args: {
    onClick: () => {},
  },
  argTypes: {
    direction: {
      control: "radio",
      options: ["prev", "next"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof StudySessionNavigationButton>;

export const Previous: Story = {
  args: {
    direction: "prev",
  },
};

export const Next: Story = {
  args: {
    direction: "next",
  },
};
