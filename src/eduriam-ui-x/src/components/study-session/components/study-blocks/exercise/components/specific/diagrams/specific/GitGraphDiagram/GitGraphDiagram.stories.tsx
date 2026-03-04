import type { Meta, StoryObj } from "@storybook/react";

import { GitGraphDiagram } from "./GitGraphDiagram";

const meta: Meta<typeof GitGraphDiagram> = {
  title:
    "x/study-session/study-blocks/exercise-components/diagrams/GitGraphDiagram",
  component: GitGraphDiagram,
};

export default meta;

type Story = StoryObj<typeof GitGraphDiagram>;

export const Default: Story = {
  args: {
    chart: `
gitGraph
  commit id: "Initial"
  branch feature
  checkout feature
  commit id: "Feature work"
  checkout main
  commit id: "Hotfix"
  merge feature
`,
  },
};
