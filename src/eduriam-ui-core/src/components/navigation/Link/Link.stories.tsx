import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "core/navigation/Link",
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const TextPrimary: Story = {
  args: { text: "Link", color: "textPrimary" },
};

export const TextSecondary: Story = {
  args: { text: "Link", color: "textSecondary" },
};
