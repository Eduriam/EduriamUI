import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { Table } from "./Table";

const meta: Meta<typeof Table> = {
  title: "x/video-manager/components/Table",
  component: Table,
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
type Story = StoryObj<typeof Table>;

export const WithHeader: Story = {
  args: {
    comp: {
      id: "t1",
      type: "TABLE",
      position: "CENTER",
      highlightHeader: true,
      rows: [
        ["Feature", "Status", "Priority"],
        ["Video Player", "Done", "High"],
        ["Scene Builder", "In Progress", "High"],
        ["Export", "Planned", "Medium"],
      ],
    },
  },
};

export const WithoutHeader: Story = {
  args: {
    comp: {
      id: "t2",
      type: "TABLE",
      position: "CENTER",
      highlightHeader: false,
      rows: [
        ["Cell A1", "Cell A2", "Cell A3"],
        ["Cell B1", "Cell B2", "Cell B3"],
      ],
    },
  },
};
