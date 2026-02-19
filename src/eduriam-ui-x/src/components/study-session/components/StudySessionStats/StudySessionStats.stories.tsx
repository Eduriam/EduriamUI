import type { Meta, StoryObj } from "@storybook/react";

import { STUDY_SESSION_LOCALIZATION_DEFAULT } from "../../StudySessionLocalizationDefault";
import { StudySessionStats } from "./StudySessionStats";

const meta: Meta<typeof StudySessionStats> = {
  title: "x/study-session/StudySessionStats",
  component: StudySessionStats,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof StudySessionStats>;

export const Default: Story = {
  args: {
    totalXp: 30,
    timeStudiedMs: 86_000,
    correctRate: 90,
    conceptCount: 4,
    onContinue: () => {},
    localization: STUDY_SESSION_LOCALIZATION_DEFAULT,
  },
};

export const PerfectScore: Story = {
  args: {
    totalXp: 50,
    timeStudiedMs: 180_000,
    correctRate: 100,
    conceptCount: 8,
    onContinue: () => {},
    localization: STUDY_SESSION_LOCALIZATION_DEFAULT,
  },
};

export const LowAccuracy: Story = {
  args: {
    totalXp: 10,
    timeStudiedMs: 45_000,
    correctRate: 33,
    conceptCount: 1,
    onContinue: () => {},
    localization: STUDY_SESSION_LOCALIZATION_DEFAULT,
  },
};

export const LongSession: Story = {
  args: {
    totalXp: 120,
    timeStudiedMs: 1_800_000,
    correctRate: 75,
    conceptCount: 15,
    onContinue: () => {},
    localization: STUDY_SESSION_LOCALIZATION_DEFAULT,
  },
};
