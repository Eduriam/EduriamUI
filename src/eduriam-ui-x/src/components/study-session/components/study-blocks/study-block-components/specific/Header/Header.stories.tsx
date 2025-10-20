import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { Header } from "./Header";
import { StudyBlockComponentType } from "../../types/StudyBlockComponentTypes";

const meta: Meta<typeof Header> = {
  title: "x/study/Header",
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Base: Story = {
  args: {
    component: { type: StudyBlockComponentType.HEADER, text: "Study header" },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Study header")).toBeInTheDocument();
  },
};
