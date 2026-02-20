import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";

import { StudyBlockComponentType } from "../../StudyBlockComponentTypes";
import { Paragraph } from "./Paragraph";

const meta: Meta<typeof Paragraph> = {
  title: "x/study-session/study-blocks/exercise-components/Paragraph",
  component: Paragraph,
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Base: Story = {
  args: {
    component: {
      id: "para-1",
      type: StudyBlockComponentType.PARAGRAPH,
      text: "This is a paragraph.",
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("This is a paragraph.")).toBeInTheDocument();
  },
};
