import type { Meta, StoryObj } from "@storybook/react";
import { ExampleCheckbox } from "./ExampleCheckbox";

const meta: Meta<typeof ExampleCheckbox> = {
  title: "Minimal/ExampleCheckbox",
  component: ExampleCheckbox,
};

export default meta;
type Story = StoryObj<typeof ExampleCheckbox>;

export const Checked: Story = {
  args: { defaultChecked: true },
};
