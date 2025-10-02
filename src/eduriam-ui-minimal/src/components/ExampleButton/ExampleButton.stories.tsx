import type { Meta, StoryObj } from "@storybook/react";
import { ExampleButton } from "./ExampleButton";

const meta: Meta<typeof ExampleButton> = {
  title: "Minimal/ExampleButton",
  component: ExampleButton,
};

export default meta;
type Story = StoryObj<typeof ExampleButton>;

export const Secondary: Story = {
  args: { children: "Minimal Button" },
};
