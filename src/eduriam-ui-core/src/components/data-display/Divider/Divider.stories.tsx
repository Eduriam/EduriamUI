import type { Meta, StoryObj } from "@storybook/react";

import Box from "@mui/material/Box";

import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "core/data-display/Divider",
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

export const InContext: Story = {
  render: () => (
    <Box sx={{ width: 300 }}>
      <Box sx={{ py: 2 }}>Content above</Box>
      <Divider />
      <Box sx={{ py: 2 }}>Content below</Box>
    </Box>
  ),
};
