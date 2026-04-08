import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor } from "storybook/test";

import { ExerciseStudyBlockComponentType } from "../../ExerciseStudyBlockComponentTypes";
import { FillInSentence } from "./FillInSentence";

const meta = {
  title: "x/study-session/study-blocks/exercise-components/FillInSentence",
  component: FillInSentence,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof FillInSentence>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    onAnswerStateChange: fn(),
    component: {
      type: ExerciseStudyBlockComponentType.FILL_IN_SENTENCE,
      id: "fis-1",
      title: "Complete the sentence",
      sentence: "je suis content",
      blankWordIndexes: [1],
      wordOptions: ["suis", "est", "es"],
    },
  },
  play: async ({ canvas, args, step }) => {
    await step?.("Correct", async () => {
      await userEvent.click(canvas.getByText("suis"));
      await waitFor(() =>
        expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("RIGHT"),
      );
    });
    await step?.("Incorrect", async () => {
      await userEvent.click(canvas.getByText("suis"));
      await userEvent.click(canvas.getByText("est"));
      await waitFor(() =>
        expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("WRONG"),
      );
    });
  },
};
