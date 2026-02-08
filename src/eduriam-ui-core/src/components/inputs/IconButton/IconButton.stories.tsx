import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@mui/material";

import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "core/inputs/IconButton",
  component: IconButton,
  argTypes: {
    color: {
      control: "inline-radio",
      options: ["primary", "success", "error", "textPrimary", "textDisabled"],
    },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    variant: {
      control: "inline-radio",
      options: ["contained", "outlined", "text"],
    },
    icon: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
  args: {
    color: "primary",
    size: "medium",
    variant: "contained",
    icon: "play_arrow",
  },
};

export const Colors: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
      {(["primary", "success", "error", "textPrimary", "textDisabled"] as const).map((color) => (
        <Box key={color} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <IconButton color={color} variant="contained" icon="play_arrow" />
          <IconButton color={color} variant="outlined" icon="play_arrow" />
          <IconButton color={color} variant="text" icon="play_arrow" />
        </Box>
      ))}
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton size="small" icon="play_arrow" />
      <IconButton size="medium" icon="play_arrow" />
      <IconButton size="large" icon="play_arrow" />
    </Box>
  ),
};
