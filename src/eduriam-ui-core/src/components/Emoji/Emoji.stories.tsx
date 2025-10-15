import type { Meta, StoryObj } from "@storybook/react";
import { Emoji } from "./Emoji";

const meta: Meta<typeof Emoji> = {
  title: "core/components/Emoji",
  component: Emoji,
};

export default meta;
type Story = StoryObj<typeof Emoji>;

export const Default: Story = { args: { emoji: "😀", width: 32, height: 32 } };
