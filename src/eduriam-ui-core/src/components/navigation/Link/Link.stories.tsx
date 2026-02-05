import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "core/navigation/Link",
  component: Link,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "body1",
        "body2",
        "subtitle1",
        "subtitle2",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const TextPrimary: Story = {
  args: { text: "Link", color: "textPrimary", variant: "body1" },
};

export const TextSecondary: Story = {
  args: { text: "Link", color: "textSecondary", variant: "body1" },
};
