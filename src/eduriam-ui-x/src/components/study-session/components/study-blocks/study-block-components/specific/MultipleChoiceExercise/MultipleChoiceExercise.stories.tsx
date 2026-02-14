import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "storybook/test";

import { StudyBlockComponentType } from "../../types/StudyBlockComponentTypes";
import MultipleChoiceExercise from "./MultipleChoiceExercise";

const meta = {
  title: "x/study-block-components/MultipleChoiceExercise",
  component: MultipleChoiceExercise,
  parameters: { layout: "centered" },
} satisfies Meta<typeof MultipleChoiceExercise>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    onAnswerStateChange: fn(),
    component: {
      id: "mc-1",
      type: StudyBlockComponentType.MULTIPLE_CHOICE,
      question: "Question",
      options: [
        { id: "0", text: "Option 1" },
        { id: "1", text: "Option 2" },
        { id: "2", text: "Option 3" },
        { id: "3", text: "Option 4" },
      ],
      correctOptionId: "1",
    },
  },
  play: async ({ canvas, args, step }) => {
    await step?.("None", async () => {
      await expect(args.onAnswerStateChange).toHaveBeenCalledWith("NONE");
    });

    await step?.("Incorrect", async () => {
      await userEvent.click(canvas.getByText("Option 1"));
      await expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("WRONG");
    });

    await step?.("Correct", async () => {
      await userEvent.click(canvas.getByText("Option 2"));
      await expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("RIGHT");
    });
  },
};

export const WithAssignmentTitle: Story = {
  args: {
    onAnswerStateChange: fn(),
    component: {
      id: "mc-2",
      type: StudyBlockComponentType.MULTIPLE_CHOICE,
      question: "Question Lorem Ipsum Dolor sit amet.",
      options: [
        { id: "0", text: "Option 1" },
        { id: "1", text: "Option 2" },
        { id: "2", text: "Option 3" },
        { id: "3", text: "Option 4" },
      ],
      correctOptionId: "1",
    },
    localization: {
      assignmentTitle: "Select correct answer",
    },
  },
};
