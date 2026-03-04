import type { Meta, StoryObj } from "@storybook/react";

import { ArchitectureDiagram } from "./ArchitectureDiagram";

const meta: Meta<typeof ArchitectureDiagram> = {
  title:
    "x/study-session/study-blocks/exercise-components/diagrams/ArchitectureDiagram",
  component: ArchitectureDiagram,
};

export default meta;

type Story = StoryObj<typeof ArchitectureDiagram>;

export const Default: Story = {
  args: {
    chart: `
flowchart TB
  Browser -->|HTTPS| Frontend[Frontend App]
  Frontend -->|REST| API[Backend API]
  API --> DB[(Database)]
  API --> Cache[(Cache)]
`,
  },
};
