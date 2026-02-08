import type { Meta, StoryObj } from "@storybook/react";

import * as React from "react";

import Typography from "@mui/material/Typography";

import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "core/surfaces/Card",
  component: Card,
  argTypes: {
    paddingY: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
    paddingX: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    paddingY: "medium",
    paddingX: "medium",
    children: <Typography variant="body2">Default</Typography>,
  },
};

export const Clickable: Story = {
  args: {
    variant: "clickable",
    children: <Typography variant="body2">Clickable</Typography>,
  },
};

export const Selected: Story = {
  args: {
    variant: "selected",
    children: <Typography variant="body2">Selected</Typography>,
  },
};
