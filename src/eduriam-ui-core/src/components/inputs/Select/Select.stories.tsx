import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "core/inputs/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Placeholder: Story = {
  args: { placeholder: "Placeholder" },
};

export const WithValue: Story = {
  args: { placeholder: "Placeholder", value: "Selected value" },
};

export const WithLabel: Story = {
  args: { label: "Label", placeholder: "Placeholder" },
};

export const Error: Story = {
  args: {
    error: true,
    label: "Label",
    placeholder: "Placeholder",
  },
};
