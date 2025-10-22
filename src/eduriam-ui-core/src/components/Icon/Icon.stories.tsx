import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "core/components/Icon",
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Filled: Story = { args: { name: "home" } };
export const Outlined: Story = { args: { name: "home_outlined" } };
