import type { Meta, StoryObj } from "@storybook/react";

import { FlowchartDiagram } from "./FlowchartDiagram";

const meta: Meta<typeof FlowchartDiagram> = {
  title:
    "x/study-session/study-blocks/exercise-components/diagrams/FlowchartDiagram",
  component: FlowchartDiagram,
};

export default meta;

type Story = StoryObj<typeof FlowchartDiagram>;

export const Default: Story = {
  args: {
    chart: `
flowchart LR
  A[Start] --> B{Has account?}
  B -- Yes --> C[Sign in]
  B -- No --> D[Create account]
  C --> E[Dashboard]
  D --> E
`,
  },
};
