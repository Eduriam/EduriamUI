import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "core/inputs/TextField",
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Outlined: Story = {
  args: { placeholder: "Placeholder" },
};

export const OutlinedWithLabel: Story = {
  args: { displayLabel: true, label: "Label", placeholder: "Placeholder" },
};

export const OutlinedMultiline: Story = {
  args: { multiline: true, placeholder: "Placeholder" },
};
