import type { Meta, StoryObj } from "@storybook/react";

import { ClassDiagram } from "./ClassDiagram";

const meta: Meta<typeof ClassDiagram> = {
  title:
    "x/study-session/study-blocks/exercise-components/diagrams/ClassDiagram",
  component: ClassDiagram,
};

export default meta;

type Story = StoryObj<typeof ClassDiagram>;

export const Default: Story = {
  args: {
    chart: `
classDiagram
  class User {
    +String id
    +String email
  }

  class Course {
    +String id
    +String title
  }
`,
  },
};
