import type { Meta, StoryObj } from "@storybook/react";
import { FullWidthButton } from "./FullWidthButton";

const meta: Meta<typeof FullWidthButton> = {
  title: "core/components/FullWidthButton",
  component: FullWidthButton,
};

export default meta;
type Story = StoryObj<typeof FullWidthButton>;

export const Default: Story = { args: { children: "Continue" } };
export const Right: Story = {
  args: { children: "Correct!", buttonVariant: "right" },
};
export const Wrong: Story = {
  args: { children: "Incorrect", buttonVariant: "wrong" },
};
