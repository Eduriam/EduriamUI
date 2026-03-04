import type { Meta, StoryObj } from "@storybook/react";

import { StateDiagram } from "./StateDiagram";

const meta: Meta<typeof StateDiagram> = {
  title:
    "x/study-session/study-blocks/exercise-components/diagrams/StateDiagram",
  component: StateDiagram,
};

export default meta;

type Story = StoryObj<typeof StateDiagram>;

export const Default: Story = {
  args: {
    chart: `
stateDiagram-v2
  [*] --> Idle
  Idle --> Loading: Start
  Loading --> Success: Done
  Loading --> Error: Fail
  Success --> [*]
  Error --> Idle: Retry
`,
  },
};
