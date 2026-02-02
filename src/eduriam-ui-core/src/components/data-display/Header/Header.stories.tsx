import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "core/data-display/Header",
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Page: Story = { args: { text: "Header", level: "page" } };
export const Title: Story = { args: { text: "Header", level: "title" } };
export const Section: Story = { args: { text: "Header", level: "section" } };
export const Subsection: Story = {
  args: { text: "Header", level: "subsection" },
};
