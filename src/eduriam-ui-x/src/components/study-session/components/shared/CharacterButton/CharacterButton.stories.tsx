import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import CharacterButton, { CHARACTER_BUTTON_SIZE } from "./CharacterButton";

const meta = {
  title: "x/shared/CharacterButton",
  component: CharacterButton,
  args: {
    character: "á",
    onClick: () => {},
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CharacterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {};

export const Elevated: Story = {
  args: {
    elevated: true,
  },
};

export const Used: Story = {
  args: {
    used: true,
  },
};
