import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { Paragraph } from "./Paragraph";
import { StudyBlockComponentType } from "../../types/StudyBlockComponentTypes";

const meta: Meta<typeof Paragraph> = {
  title: "x/study/Paragraph",
  component: Paragraph,
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Base: Story = {
  args: {
    component: {
      type: StudyBlockComponentType.PARAGRAPH,
      text: "This is a paragraph.",
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("This is a paragraph.")).toBeInTheDocument();
  },
};
