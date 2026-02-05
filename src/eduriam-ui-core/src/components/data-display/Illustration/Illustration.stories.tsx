import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@mui/material";

import { ILLUSTRATION_NAMES, Illustration } from "./Illustration";

const meta: Meta<typeof Illustration> = {
  title: "core/data-display/Illustration",
  component: Illustration,
  argTypes: {
    name: {
      control: { type: "select" },
      options: ILLUSTRATION_NAMES,
    },
    width: {
      control: { type: "number" },
    },
    height: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Illustration>;

export const Default: Story = {
  args: {
    name: "fire",
    width: 64,
    height: 64,
  },
};

export const CustomSize: Story = {
  args: {
    name: "rocket",
    width: 128,
    height: 128,
  },
};

export const AllIllustrations: Story = {
  render: () => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 2,
        maxWidth: 400,
      }}
    >
      {ILLUSTRATION_NAMES.map((name) => (
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
          <Illustration name={name} width={64} height={64} />
        </Box>
      ))}
    </Box>
  ),
};
