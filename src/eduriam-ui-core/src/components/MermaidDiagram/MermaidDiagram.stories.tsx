import type { Meta, StoryObj } from "@storybook/react";

import { MermaidDiagram } from "./MermaidDiagram";

const meta: Meta<typeof MermaidDiagram> = {
  title: "core/components/MermaidDiagram",
  component: MermaidDiagram,
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MermaidDiagram>;

export const Flowchart: Story = {
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

export const Sequence: Story = {
  args: {
    chart: `
      sequenceDiagram
        participant User
        participant App
        participant API
        User->>App: Open lesson
        App->>API: Fetch study session
        API-->>App: Session payload
        App-->>User: Render content
    `,
  },
};
