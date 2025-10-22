import type { Meta, StoryObj } from "@storybook/react";

import { YouTubeVideoEmbed } from "./YouTubeVideoEmbed";

const meta: Meta<typeof YouTubeVideoEmbed> = {
  title: "core/components/YouTubeVideoEmbed",
  component: YouTubeVideoEmbed,
};

export default meta;
type Story = StoryObj<typeof YouTubeVideoEmbed>;

export const Default: Story = { args: { videoId: "dQw4w9WgXcQ" } };
