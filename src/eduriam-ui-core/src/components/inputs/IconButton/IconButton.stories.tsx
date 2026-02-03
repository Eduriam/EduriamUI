import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "core/inputs/IconButton",
  component: IconButton,
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    variant: {
      control: "inline-radio",
      options: ["contained", "outlined", "text"],
    },
    icon: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
  args: { size: "medium", variant: "contained", icon: "play_arrow" },
};
