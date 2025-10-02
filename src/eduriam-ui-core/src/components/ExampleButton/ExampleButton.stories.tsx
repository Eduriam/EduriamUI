import type { Meta, StoryObj } from "@storybook/react";
import { ExampleButton } from "./ExampleButton";

const meta: Meta<typeof ExampleButton> = {
  title: "Core/ExampleButton",
  component: ExampleButton,
};

export default meta;
type Story = StoryObj<typeof ExampleButton>;

export const Primary: Story = {
  args: { children: "Core Button" },
};
