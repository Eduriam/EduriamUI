import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "core/data-display/Header",
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Page: Story = { args: { text: "Header", variant: "page" } };
export const Title: Story = { args: { text: "Header", variant: "title" } };
export const Section: Story = { args: { text: "Header", variant: "section" } };
export const Subsection: Story = {
  args: { text: "Header", variant: "subsection" },
};
