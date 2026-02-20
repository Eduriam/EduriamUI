import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { BackgroundColor } from "./BackgroundColor";

const meta: Meta<typeof BackgroundColor> = {
  title: "x/video-manager/components/BackgroundColor",
  component: BackgroundColor,
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
type Story = StoryObj<typeof BackgroundColor>;

export const Default: Story = {
  args: { comp: { type: "BACKGROUND_COLOR", color: "default" } },
};

export const Paper: Story = {
  args: { comp: { type: "BACKGROUND_COLOR", color: "paper" } },
};

export const CustomHex: Story = {
  args: { comp: { type: "BACKGROUND_COLOR", color: "#8b5cf6" } },
};
