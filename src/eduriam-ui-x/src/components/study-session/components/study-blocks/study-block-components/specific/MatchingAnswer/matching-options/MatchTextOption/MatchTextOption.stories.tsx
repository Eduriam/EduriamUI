import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "storybook/test";

import React from "react";

import MatchTextOption from "./MatchTextOption";

const meta = {
  title: "x/study-block-components/matching-options/MatchTextOption",
  component: MatchTextOption,
  parameters: { layout: "centered" },
} satisfies Meta<typeof MatchTextOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    text: "Bonjour",
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: /Bonjour/i }));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Selected: Story = {
  args: {
    text: "Selected",
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    text: "Disabled",
    disabled: true,
  },
};

export const WrongShake: Story = {
  args: {
    text: "Wrong",
    animateWrong: true,
  },
};
