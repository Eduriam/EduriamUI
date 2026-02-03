import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { BasicNavbar } from "./BasicNavbar";

const meta: Meta<typeof BasicNavbar> = {
  title: "core/navigation/BasicNavbar",
  component: BasicNavbar,
};

export default meta;
type Story = StoryObj<typeof BasicNavbar>;

export const WithIconAndHeader: Story = {
  args: {
    header: "Page Header",
    leftButton: { icon: "menu", onClick: fn() },
  },
};

export const WithTextButtons: Story = {
  args: {
    header: "Page Header",
    leftButton: { text: "Back", onClick: fn() },
    rightButton: { text: "Edit", onClick: fn() },
  },
};
