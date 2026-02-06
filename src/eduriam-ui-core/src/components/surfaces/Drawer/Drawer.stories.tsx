import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Drawer } from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "core/surfaces/Drawer",
  component: Drawer,
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

const Template: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DemoContent />
      </Drawer>
    </>
  );
};

export const Default: Story = {
  render: () => <Template />,
};
