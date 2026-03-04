import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import TableVideoComponent from "./TableVideoComponent";

const meta: Meta<typeof TableVideoComponent> = {
  title: "x/video-manager/video-components/Table",
  component: TableVideoComponent,
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
type Story = StoryObj<typeof TableVideoComponent>;

export const WithHeader: Story = {
  args: {
    comp: {
      id: "t1",
      type: "TABLE",
      startTime: 0,
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
      startTime: 0,
      highlightHeader: false,
      rows: [
        ["Cell A1", "Cell A2", "Cell A3"],
        ["Cell B1", "Cell B2", "Cell B3"],
      ],
    },
  },
};
