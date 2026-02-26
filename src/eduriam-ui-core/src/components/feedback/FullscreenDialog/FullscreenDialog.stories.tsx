import type { Meta, StoryObj } from "@storybook/react";

import React, { useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  FullscreenDialog,
  type FullscreenDialogProps,
} from "./FullscreenDialog";

const meta: Meta<typeof FullscreenDialog> = {
  title: "core/feedback/FullscreenDialog",
  component: FullscreenDialog,
};

export default meta;
type Story = StoryObj<typeof FullscreenDialog>;

type StoryProps = Pick<FullscreenDialogProps, "dataTest">;

const Template: React.FC<StoryProps> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open full screen dialog
      </Button>
      <FullscreenDialog open={open} onClose={() => setOpen(false)} {...args}>
        <Stack
          spacing={2}
          sx={{
            flex: 1,
            px: 3,
            py: 4,
          }}
        >
          <Typography variant="h4">Fullscreen dialog</Typography>
          <Typography variant="body1">
            This content is rendered inside PageRoot.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{ alignSelf: "flex-start" }}
          >
            Close
          </Button>
        </Stack>
      </FullscreenDialog>
    </>
  );
};

export const Default: Story = {
  render: (args) => <Template {...(args as StoryProps)} />,
};
