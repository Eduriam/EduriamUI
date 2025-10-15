import type { Meta, StoryObj } from "@storybook/react";

import { DividerWithText } from "./DividerWithText";

const meta: Meta<typeof DividerWithText> = {
  title: "core/components/DividerWithText",
  component: DividerWithText,
};

export default meta;
type Story = StoryObj<typeof DividerWithText>;

export const Default: Story = { args: { text: "OR" } };
export const WithVariant: Story = {
  args: { text: "Section Divider", variant: "h6" },
};
