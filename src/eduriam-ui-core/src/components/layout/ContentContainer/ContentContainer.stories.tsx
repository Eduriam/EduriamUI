import type { Meta, StoryObj } from "@storybook/react";

import Box from "@mui/material/Box";

import { ContentContainer } from "./ContentContainer";

const meta: Meta<typeof ContentContainer> = {
  title: "core/layout/ContentContainer",
  component: ContentContainer,
};

export default meta;
type Story = StoryObj<typeof ContentContainer>;

export const Default: Story = {
  args: {
    sx: { maxWidth: 720 },
  },
  render: (args) => (
    <ContentContainer {...args}>
      <Box
        sx={{
          backgroundColor: "grey.100",
          borderRadius: 2,
          p: 2,
          textAlign: "center",
          width: "100%",
        }}
      >
        Content goes here
      </Box>
    </ContentContainer>
  ),
};
