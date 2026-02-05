import type { Meta, StoryObj } from "@storybook/react";

import * as React from "react";

import Box from "@mui/material/Box";

import { ContentContainer } from "./ContentContainer";

const meta: Meta<typeof ContentContainer> = {
  title: "core/layout/ContentContainer",
  component: ContentContainer,
  argTypes: {
    width: {
      control: "radio",
      options: ["small", "medium", "large"],
    },
    justifyContent: {
      control: "radio",
      options: ["flex-start", "center", "space-between"],
    },
    spacing: {
      control: "number",
      min: 0,
      step: 0.5,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContentContainer>;

export const Default: Story = {
  args: {
    width: "medium",
    justifyContent: "flex-start",
    spacing: 2,
    sx: { minHeight: 320 },
  },
  render: (args) => (
    <ContentContainer {...args}>
      {["First", "Second", "Third"].map((label) => (
        <Box
          key={label}
          sx={{
            backgroundColor: "grey.100",
            borderRadius: 2,
            p: 2,
            textAlign: "center",
            width: "100%",
          }}
        >
          {label} item
        </Box>
      ))}
    </ContentContainer>
  ),
};
