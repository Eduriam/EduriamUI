import type { Meta, StoryObj } from "@storybook/react";

import { LargeRadioButtonGroup } from "./LargeRadioButtonGroup";

const meta: Meta<typeof LargeRadioButtonGroup> = {
  title: "core/inputs/LargeRadioButtonGroup",
  component: LargeRadioButtonGroup,
};

export default meta;
type Story = StoryObj<typeof LargeRadioButtonGroup>;

const options = [
  { id: "option-1", text: "Button 1", subText: "Sub Text 1" },
  { id: "option-2", text: "Button 2", subText: "Sub Text 2" },
  { id: "option-3", text: "Button 3", subText: "Sub Text 3" },
];

export const ExpandAll: Story = {
  args: { options, expandMode: "expandAll", defaultSelectedId: "option-1" },
};

export const ExpandSelected: Story = {
  args: {
    options,
    expandMode: "expandSelected",
    defaultSelectedId: "option-2",
  },
};
