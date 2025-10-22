import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn } from "storybook/test";

import { StudyBlockComponentType } from "../../types/StudyBlockComponentTypes";
import { CheckList } from "./CheckList";

const meta: Meta<typeof CheckList> = {
  title: "x/study-block-components/CheckList",
  component: CheckList,
};

export default meta;
type Story = StoryObj<typeof CheckList>;

export const Base: Story = {
  args: {
    component: {
      id: "cl-1",
      type: StudyBlockComponentType.CHECKLIST,
      items: ["One", "Two", "Three"],
    },
    onAnswerStateChange: fn(),
  },
  play: async ({ canvas, userEvent, args, step }) => {
    // None
    await step?.("None", async () => {
      await expect(args.onAnswerStateChange).toHaveBeenCalledWith("NONE");
    });
    // Wrong (partial)
    await step?.("Partial", async () => {
      const boxes = canvas.getAllByRole("checkbox");
      await userEvent.click(boxes[0]);
      await expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("WRONG");
    });
    // Right (all)
    await step?.("All", async () => {
      const boxes = canvas.getAllByRole("checkbox");
      await userEvent.click(boxes[1]);
      await userEvent.click(boxes[2]);
      await expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("RIGHT");
    });
  },
};
