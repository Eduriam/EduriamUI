import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "storybook/test";

import React from "react";

import WordButton from "./WordButton";

const meta = {
  title: "x/shared/WordButton",
  component: WordButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof WordButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    onClick: fn(),
    word: "Bonjour",
    disabled: false,
    empty: false,
    state: "NONE",
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: /Bonjour/i }));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Empty: Story = {
  args: {
    empty: true,
    disabled: true,
    state: "NONE",
  },
};

export const Disabled: Story = {
  args: {
    word: "Salut",
    disabled: true,
    state: "NONE",
  },
};

export const Right: Story = {
  args: {
    word: "Correct",
    disabled: true,
    state: "RIGHT",
  },
};

export const Wrong: Story = {
  args: {
    word: "Incorrect",
    disabled: true,
    state: "WRONG",
  },
};
