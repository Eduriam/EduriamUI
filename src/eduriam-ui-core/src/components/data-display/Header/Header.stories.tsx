import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "core/data-display/Header",
  component: Header,
  argTypes: {
    align: {
      control: "radio",
      options: ["left", "center", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Page: Story = {
  args: { text: "Header", variant: "page", align: "left" },
};
export const Title: Story = {
  args: { text: "Header", variant: "title", align: "left" },
};
export const Section: Story = {
  args: { text: "Header", variant: "section", align: "left" },
};
export const Subsection: Story = {
  args: { text: "Header", variant: "subsection", align: "left" },
};
export const LeftAligned: Story = {
  args: { text: "Left Aligned Header", variant: "page", align: "left" },
};
export const CenterAligned: Story = {
  args: { text: "Center Aligned Header", variant: "page", align: "center" },
};
export const RightAligned: Story = {
  args: { text: "Right Aligned Header", variant: "page", align: "right" },
};
