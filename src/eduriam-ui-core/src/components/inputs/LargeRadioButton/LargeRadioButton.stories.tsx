import type { Meta, StoryObj } from "@storybook/react";

import { LargeRadioButton } from "./LargeRadioButton";

const meta: Meta<typeof LargeRadioButton> = {
  title: "core/inputs/LargeRadioButton",
  component: LargeRadioButton,
};

export default meta;
type Story = StoryObj<typeof LargeRadioButton>;

export const SelectedCollapsed: Story = {
  args: { selected: true, expanded: false, text: "Button" },
};

export const UnselectedCollapsed: Story = {
  args: { selected: false, expanded: false, text: "Button" },
};

export const SelectedExpanded: Story = {
  args: {
    selected: true,
    expanded: true,
    text: "Button",
    subText: "Sub Text",
  },
};

export const UnselectedExpanded: Story = {
  args: {
    selected: false,
    expanded: true,
    text: "Button",
    subText: "Sub Text",
  },
};
