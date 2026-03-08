import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";

import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "core/inputs/Switch",
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Off: Story = {
  args: { checked: false },
};

export const On: Story = {
  args: { checked: true },
};

export const Playground: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch checked={checked} onChange={setChecked} />;
  },
};

export const States: Story = {
  render: () => (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Switch checked={false} />
      <Switch checked />
      <Switch checked={false} disabled />
      <Switch checked disabled />
    </Box>
  ),
};
