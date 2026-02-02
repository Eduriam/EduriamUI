import type { Meta, StoryObj } from "@storybook/react";

import { LargeButton } from "./LargeButton";

const meta: Meta<typeof LargeButton> = {
  title: "core/inputs/LargeButton",
  component: LargeButton,
};

export default meta;
type Story = StoryObj<typeof LargeButton>;

export const PrimaryContained: Story = {
  args: { children: "Button", color: "primary", variant: "contained" },
};

export const PrimaryOutlined: Story = {
  args: { children: "Button", color: "primary", variant: "outlined" },
};

export const PrimaryText: Story = {
  args: { children: "Button", color: "primary", variant: "text" },
};

export const PrimaryContainedDisabled: Story = {
  args: {
    children: "Button",
    color: "primary",
    variant: "contained",
    disabled: true,
  },
};

export const PrimaryOutlinedDisabled: Story = {
  args: {
    children: "Button",
    color: "primary",
    variant: "outlined",
    disabled: true,
  },
};

export const PrimaryTextDisabled: Story = {
  args: {
    children: "Button",
    color: "primary",
    variant: "text",
    disabled: true,
  },
};

export const SuccessContained: Story = {
  args: { children: "Button", color: "success", variant: "contained" },
};

export const SuccessOutlined: Story = {
  args: { children: "Button", color: "success", variant: "outlined" },
};

export const SuccessText: Story = {
  args: { children: "Button", color: "success", variant: "text" },
};

export const ErrorContained: Story = {
  args: { children: "Button", color: "error", variant: "contained" },
};

export const ErrorOutlined: Story = {
  args: { children: "Button", color: "error", variant: "outlined" },
};

export const ErrorText: Story = {
  args: { children: "Button", color: "error", variant: "text" },
};
