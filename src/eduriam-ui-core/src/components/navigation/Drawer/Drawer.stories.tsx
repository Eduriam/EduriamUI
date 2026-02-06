import type { Meta, StoryObj } from "@storybook/react";

import React, { useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Drawer, type DrawerProps } from "./Drawer";

type DrawerStoryProps = Pick<DrawerProps, "backgroundColor">;

const meta: Meta<typeof Drawer> = {
  title: "core/navigation/Drawer",
  component: Drawer,
  argTypes: {
    backgroundColor: {
      control: { type: "radio" },
      options: ["default", "success", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DemoContent = () => (
  <Stack spacing={2}>
    <Typography variant="h6">Drawer title</Typography>
    <Typography variant="body2">
      This is some example content inside the drawer. On mobile, it slides up
      from the bottom. On desktop, it is centered and behaves like a dialog.
    </Typography>
    <Typography variant="body2">
      Add any form fields, text or actions you need here.
    </Typography>
  </Stack>
);

const Template: React.FC<DrawerStoryProps> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} {...args}>
        <DemoContent />
      </Drawer>
    </>
  );
};

export const Default: Story = {
  args: {
    backgroundColor: "default",
  },
  render: (args) => <Template {...(args as DrawerStoryProps)} />,
};
