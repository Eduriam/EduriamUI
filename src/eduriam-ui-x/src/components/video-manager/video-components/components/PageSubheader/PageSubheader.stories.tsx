import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { PageSubheader } from "./PageSubheader";

const meta: Meta<typeof PageSubheader> = {
  title: "x/video-manager/video-components/PageSubheader",
  component: PageSubheader,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          aspectRatio: "1920/1080",
          position: "relative",
          overflow: "hidden",
          background: theme.palette.background.paper,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageSubheader>;

export const Default: Story = {
  args: {
    comp: {
      id: "ps1",
      type: "PAGE_SUBHEADER",
      startTime: 0,
      column: "first",
      text: "Understanding the Basics",
    },
  },
};



