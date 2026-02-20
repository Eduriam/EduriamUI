import type { Meta, StoryObj } from "@storybook/react";

import MatchImageOption from "./MatchImageOption";

const meta = {
  title: "x/study-session/study-blocks/exercise-components/MatchImageOption",
  component: MatchImageOption,
  parameters: { layout: "centered" },
} satisfies Meta<typeof MatchImageOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    imageUrl: "https://picsum.photos/seed/eduriam2/200/200",
  },
};

export const Selected: Story = {
  args: {
    imageUrl: "https://picsum.photos/seed/eduriam2/200/200",
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    imageUrl: "https://picsum.photos/seed/eduriam2/200/200",
    disabled: true,
  },
};

export const WrongShake: Story = {
  args: {
    imageUrl: "https://picsum.photos/seed/eduriam2/200/200",
    animateWrong: true,
  },
};
