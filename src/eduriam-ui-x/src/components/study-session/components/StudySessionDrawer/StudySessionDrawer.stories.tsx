import type { Meta, StoryObj } from "@storybook/react";

import StudySessionDrawer from "./StudySessionDrawer";

const meta: Meta<typeof StudySessionDrawer> = {
  title: "x/study-session/StudySessionDrawer",
  component: StudySessionDrawer,
};

export default meta;
type Story = StoryObj<typeof StudySessionDrawer>;

export const WithoutExplanation: Story = {
  args: {
    variant: "correct",
    onReportClick: () => {},
    onContinueClick: () => {},
  },
};

export const WithExplanation: Story = {
  args: {
    variant: "incorrect",
    onExplanationClick: () => {},
    onReportClick: () => {},
    onContinueClick: () => {},
  },
};

