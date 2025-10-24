import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor } from "storybook/test";

import React from "react";

import { StudyBlockComponentType } from "../../types/StudyBlockComponentTypes";
import BuildWord from "./BuildWord";

const meta = {
  title: "x/study-block-components/BuildWord",
  component: BuildWord,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BuildWord>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    onAnswerStateChange: fn(),
    component: {
      type: StudyBlockComponentType.BUILD_WORD,
      id: "bw-1",
      title: "Build the word",
      word: "chat",
      letterOptions: ["c", "h", "a", "t"],
    },
    showAnswerState: false,
  },
  play: async ({ canvas, args, step }) => {
    await step?.("None", async () => {
      await expect(args.onAnswerStateChange).not.toHaveBeenCalled();
    });
    await step?.("Correct", async () => {
      for (const ch of ["c", "h", "a", "t"]) {
        await userEvent.click(canvas.getByRole("button", { name: ch }));
      }
      await waitFor(() =>
        expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("RIGHT"),
      );
    });
    await step?.("Incorrect", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "t" }));
      await userEvent.click(canvas.getByRole("button", { name: "h" }));
      await waitFor(() =>
        expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("WRONG"),
      );
    });
  },
};
