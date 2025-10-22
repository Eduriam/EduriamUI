import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";

import { StudyBlockComponentType } from "../../types/StudyBlockComponentTypes";
import Image from "./Image";

const meta: Meta<typeof Image> = {
  title: "x/study-block-components/Image",
  component: Image,
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Base: Story = {
  args: {
    component: {
      id: "img-1",
      type: StudyBlockComponentType.IMAGE,
      url: "https://picsum.photos/seed/eduriam/320/320",
      alt: "Sample image",
      size: "medium",
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText("Sample image")).toBeInTheDocument();
  },
};
