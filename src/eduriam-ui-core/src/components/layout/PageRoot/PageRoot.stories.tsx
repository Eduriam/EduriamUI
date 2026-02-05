import type { Meta, StoryObj } from "@storybook/react";

import * as React from "react";

import Box from "@mui/material/Box";

import { ContentContainer } from "../ContentContainer";
import { PageRoot } from "./PageRoot";

const meta: Meta<typeof PageRoot> = {
  title: "core/layout/PageRoot",
  component: PageRoot,
};

export default meta;
type Story = StoryObj<typeof PageRoot>;

export const Default: Story = {
  render: () => (
    <PageRoot>
      <Box
        sx={{
          height: 64,
          px: 3,
          display: "flex",
          alignItems: "center",
          backgroundColor: "grey.100",
          borderBottom: 1,
          borderColor: "grey.200",
        }}
      >
        Navbar placeholder
      </Box>

      <ContentContainer spacing={2}>
        <Box sx={{ backgroundColor: "grey.100", borderRadius: 2, p: 2 }}>
          Page content item 1
        </Box>
        <Box sx={{ backgroundColor: "grey.100", borderRadius: 2, p: 2 }}>
          Page content item 2
        </Box>
      </ContentContainer>
    </PageRoot>
  ),
};
