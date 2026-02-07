import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "storybook/test";

import CodeOptionButton from "./CodeOptionButton";

const meta = {
  title: "x/shared/CodeOptionButton",
  component: CodeOptionButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof CodeOptionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    onClick: fn(),
    selected: false,
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: /Button/i }));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Selected: Story = {
  args: {
    children: "Button",
    selected: true,
  },
};
