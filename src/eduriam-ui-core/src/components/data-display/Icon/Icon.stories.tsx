import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import { Box } from "@mui/material";

import { Icon, type IconColor } from "./Icon";
import { ICON_NAMES } from "./iconConfig";

const ICON_COLORS: IconColor[] = [
  "textPrimary",
  "textSecondary",
  "white",
  "black",
  "primary",
  "success",
  "error",
  "warning",
];

const meta: Meta<typeof Icon> = {
  title: "core/data-display/Icon",
  component: Icon,
  argTypes: {
    name: {
      control: { type: "select" },
      options: ICON_NAMES,
      description:
        "Icon name from iconConfig. Resolves to Material icon glyph + variant.",
    },
    color: {
      control: { type: "select" },
      options: ICON_COLORS,
      description: "Semantic color from the theme palette.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "home",
    sx: { fontSize: 24 },
  },
};

export const AllIcons: Story = {
  render: () => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
        gap: 2,
        maxWidth: 600,
      }}
    >
      {ICON_NAMES.map((name) => (
        <Box
          key={name}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            p: 1,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          <Icon name={name} sx={{ fontSize: 24 }} />
          <Box component="span" sx={{ fontSize: 10, textAlign: "center" }}>
            {name}
          </Box>
        </Box>
      ))}
    </Box>
  ),
};
