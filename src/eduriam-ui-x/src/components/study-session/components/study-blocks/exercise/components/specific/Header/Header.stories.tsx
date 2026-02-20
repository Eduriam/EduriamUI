import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";

import { StudyBlockComponentType } from "../../StudyBlockComponentTypes";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "x/study-session/study-blocks/exercise-components/Header",
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Base: Story = {
  args: {
    component: {
      id: "hdr-1",
      type: StudyBlockComponentType.HEADER,
      text: "Study header",
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Study header")).toBeInTheDocument();
  },
};
