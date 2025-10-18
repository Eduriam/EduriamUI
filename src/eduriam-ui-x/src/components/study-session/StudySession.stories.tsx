import type { Meta, StoryObj } from "@storybook/react";

import StudySession, { IStudySession } from "./StudySession";
import { StudyBlockComponentType } from "./components/study-blocks/study-block-components/types/StudyBlockComponentTypes";

const meta: Meta<typeof StudySession> = {
  title: "ui-x/StudySession",
  component: StudySession,
};

export default meta;
type Story = StoryObj<typeof StudySession>;

export const Base: Story = {
  args: {
    studySession: {
      studyBlocks: [
        {
          type: "explanation",
          atomId: "atom-1",
          components: [
            {
              type: StudyBlockComponentType.HEADER,
              headerText: "Study Block Header Component",
            },
            {
              type: StudyBlockComponentType.PARAGRAPH,
              paragraphText: "This is an study block paragraph component.",
            },
          ],
        },
        {
          type: "exercise",
          atomId: "atom-2",
          components: [
            {
              type: StudyBlockComponentType.PARAGRAPH,
              paragraphText: "Exercise placeholder content goes here.",
            },
          ],
        },
      ],
    },
    onFinish: () => {},
    onExit: () => {},
  } as IStudySession,
};
