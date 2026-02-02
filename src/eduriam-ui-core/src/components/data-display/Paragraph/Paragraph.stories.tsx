import type { Meta, StoryObj } from "@storybook/react";

import { Paragraph } from "./Paragraph";

const meta: Meta<typeof Paragraph> = {
  title: "core/data-display/Paragraph",
  component: Paragraph,
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = { args: { text: "Paragraph" } };
