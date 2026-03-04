import type { Meta, StoryObj } from "@storybook/react";

import { EntityRelationshipDiagram } from "./EntityRelationshipDiagram";

const meta: Meta<typeof EntityRelationshipDiagram> = {
  title:
    "x/study-session/study-blocks/exercise-components/diagrams/EntityRelationshipDiagram",
  component: EntityRelationshipDiagram,
};

export default meta;

type Story = StoryObj<typeof EntityRelationshipDiagram>;

export const Default: Story = {
  args: {
    chart: `
erDiagram
  USER ||--o{ ENROLLMENT : has
  COURSE ||--o{ ENROLLMENT : contains
  USER {
    string id
    string email
  }
  COURSE {
    string id
    string title
  }
  ENROLLMENT {
    string id
    date enrolledAt
  }
`,
  },
};
