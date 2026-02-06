import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";

import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "core/data-display/Chip",
  component: Chip,
  argTypes: {
    color: {
      control: "select",
      options: ["neutral", "chipGreen", "chipYellow", "chipBlue", "chipPink"],
    },
    variant: {
      control: "select",
      options: ["outlined", "filled"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    icon: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { label: "Chip" },
};

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Chip label="Chip" color="neutral" variant="outlined" />
        <Chip label="Chip" color="neutral" variant="filled" />
        <Chip label="Chip" color="neutral" icon="arrowRight" />
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Chip label="Chip" color="chipGreen" variant="outlined" />
        <Chip label="Chip" color="chipGreen" variant="filled" />
        <Chip label="Chip" color="chipGreen" icon="arrowRight" />
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Chip label="Chip" color="chipYellow" variant="outlined" />
        <Chip label="Chip" color="chipYellow" variant="filled" />
        <Chip label="Chip" color="chipYellow" icon="arrowRight" />
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Chip label="Chip" color="chipBlue" variant="outlined" />
        <Chip label="Chip" color="chipBlue" variant="filled" />
        <Chip label="Chip" color="chipBlue" icon="arrowRight" />
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Chip label="Chip" color="chipPink" variant="outlined" />
        <Chip label="Chip" color="chipPink" variant="filled" />
        <Chip label="Chip" color="chipPink" icon="arrowRight" />
      </Box>
    </Box>
  ),
};


export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
      <Chip label="Small" size="small" color="chipBlue" variant="filled" />
      <Chip label="Medium" size="medium" color="chipBlue" variant="filled" />
    </Box>
  ),
};

export const WithIcon: Story = {
  args: { label: "Chip", icon: "check", color: "chipGreen", variant: "filled" },
};

export const WithIconArrowRight: Story = {
  args: { label: "Chip", icon: "arrowRight" },
};
