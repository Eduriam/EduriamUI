import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn } from "storybook/test";

import { StudyBlockComponentType } from "../../types/StudyBlockComponentTypes";
import { TextAnswer } from "./TextAnswer";

const meta: Meta<typeof TextAnswer> = {
  title: "x/study-block-components/TextAnswer",
  component: TextAnswer,
};

export default meta;
type Story = StoryObj<typeof TextAnswer>;

export const Base: Story = {
  args: {
    component: {
      type: StudyBlockComponentType.TEXT_ANSWER,
      id: "abc",
      correctAnswer: "Hello",
      evaluationStrategy: "case_insensitive",
      variant: "short",
    },
    showAnswerState: false,
    onAnswerStateChange: fn(),
  },
  play: async ({ canvas, userEvent, args, step }) => {
    const input = canvas.getByRole("textbox") as HTMLInputElement;

    await step?.("None", async () => {
      await expect(input).toBeInTheDocument();
      await expect(args.onAnswerStateChange).toHaveBeenCalledWith("NONE");
    });

    await step?.("Correct", async () => {
      await userEvent.clear(input);
      await userEvent.type(input, "hello");
      await expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("RIGHT");
    });

    await step?.("Incorrect", async () => {
      await userEvent.clear(input);
      await userEvent.type(input, "world");
      await expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("WRONG");
    });
  },
};
