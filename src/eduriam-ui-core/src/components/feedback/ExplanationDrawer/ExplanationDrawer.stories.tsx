import type { Meta, StoryObj } from "@storybook/react";

import React, { useState } from "react";

import Button from "@mui/material/Button";

import { ExplanationDrawer, type ExplanationDrawerProps } from "./ExplanationDrawer";

const meta: Meta<typeof ExplanationDrawer> = {
  title: "core/feedback/ExplanationDrawer",
  component: ExplanationDrawer,
  argTypes: {
    title: { control: "text" },
    bodyText: { control: "text" },
    continueButtonLabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ExplanationDrawer>;

const sampleBodyText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet neque in hendrerit dapibus. Nam ac tortor fringilla, facilisis ligula vitae, congue mi. Morbi id pharetra tellus. Donec quis molestie ante. Donec elit tortor, tempor vel eleifend non, mollis vitae augue. Cras varius nibh eget magna sagittis, ac feugiat mauris convallis. Nulla pharetra, velit non laoreet porttitor, turpis enim sollicitudin purus, non fermentum nisi mi sit amet ante. Nullam faucibus tellus eget neque commodo, at rhoncus odio pulvinar.";

const defaultArgs: ExplanationDrawerProps = {
  open: false,
  onClose: () => {},
  title: "Explanation",
  bodyText: sampleBodyText,
  continueButtonLabel: "Got it!",
  onThumbsUp: () => {},
  onThumbsDown: () => {},
};

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open explanation
        </Button>
        <ExplanationDrawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
  args: defaultArgs,
};

export const WithoutFeedback: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open explanation
        </Button>
        <ExplanationDrawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onThumbsUp={undefined}
          onThumbsDown={undefined}
        />
      </>
    );
  },
  args: defaultArgs,
};
