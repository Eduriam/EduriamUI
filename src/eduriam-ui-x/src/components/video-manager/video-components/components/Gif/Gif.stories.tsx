import { theme } from "@eduriam/ui-core";
import { Player } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";

import { Gif, type IGif } from "./Gif";

const STORYBOOK_FPS = 30;
const STORYBOOK_WIDTH = 1920;
const STORYBOOK_HEIGHT = 1080;
const STORYBOOK_DURATION = 300;

const StoryComposition = ({ comp }: { comp: IGif }) => <Gif comp={comp} />;

const meta: Meta<typeof Gif> = {
  title: "x/video-manager/video-components/Gif",
  component: Gif,
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
type Story = StoryObj<typeof Gif>;

const baseComp = {
  id: "gif1",
  type: "GIF" as const,
  startTime: 0,
  column: "first" as const,
};

const renderWithPlayer: Story["render"] = (args) => (
  <Player
    component={StoryComposition}
    inputProps={{ comp: args.comp }}
    durationInFrames={STORYBOOK_DURATION}
    fps={STORYBOOK_FPS}
    compositionWidth={STORYBOOK_WIDTH}
    compositionHeight={STORYBOOK_HEIGHT}
    controls
    autoPlay
    clickToPlay={false}
    allowFullscreen={false}
    style={{ width: "100%", height: "100%" }}
    acknowledgeRemotionLicense={true}
  />
);

export const Medium: Story = {
  render: renderWithPlayer,
  args: {
    comp: {
      ...baseComp,
      url: "https://media.giphy.com/media/3o72F7YT6s0EMFI0Za/giphy.gif",
      size: "MEDIUM" as const,
    },
  },
};

export const Small: Story = {
  render: renderWithPlayer,
  args: {
    comp: {
      ...baseComp,
      id: "gif2",
      url: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
      size: "SMALL" as const,
    },
  },
};
