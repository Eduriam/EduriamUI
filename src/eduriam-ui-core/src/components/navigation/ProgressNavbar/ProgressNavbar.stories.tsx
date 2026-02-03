import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { ProgressNavbar } from "./ProgressNavbar";

const meta: Meta<typeof ProgressNavbar> = {
  title: "core/navigation/ProgressNavbar",
  component: ProgressNavbar,
};

export default meta;
type Story = StoryObj<typeof ProgressNavbar>;

export const Default: Story = {
  args: {
    leftButton: { icon: "close", onClick: fn() },
    progressSize: "large",
    progressValue: 40,
  },
};
