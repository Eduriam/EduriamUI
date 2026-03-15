import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import Box from "@mui/material/Box";

import { BasicNavbar } from "./BasicNavbar";

const meta: Meta<typeof BasicNavbar> = {
  title: "core/navigation/BasicNavbar",
  component: BasicNavbar,
};

export default meta;
type Story = StoryObj<typeof BasicNavbar>;

export const WithIconAndHeader: Story = {
  args: {
    header: "Page Header",
    leftButton: { icon: "menu", onClick: fn() },
  },
};

export const WithTextButtons: Story = {
  args: {
    header: "Page Header",
    leftButton: { text: "Back", onClick: fn() },
    rightButton: { text: "Edit", onClick: fn() },
  },
};

export const TransparentBackground: Story = {
  args: {
    header: "Page Header",
    leftButton: { icon: "menu", onClick: fn() },
    background: "transparent",
  },
  render: (args) => (
    <Box
      sx={{
        background:
          "linear-gradient(120deg, rgba(255, 204, 128, 1) 0%, rgba(187, 222, 251, 1) 100%)",
        minHeight: "50vh",
      }}
    >
      <BasicNavbar {...args} />
    </Box>
  ),
};
