import type { Meta, StoryObj } from "@storybook/react";

import StudySession, { IStudySession } from "./StudySession";
import { StudyBlockComponentType } from "./components/study-blocks/exercise/components/StudyBlockComponentTypes";

const meta: Meta<typeof StudySession> = {
  title: "x/study-session/StudySession",
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
              id: "hdr-1",
              type: StudyBlockComponentType.HEADER,
              text: "Study Block Header Component",
            },
            {
              id: "para-1",
              type: StudyBlockComponentType.PARAGRAPH,
              text: "This is an study block paragraph component.",
            },
          ],
        },
        {
          type: "exercise",
          atomId: "atom-2",
          components: [
            {
              id: "para-2",
              type: StudyBlockComponentType.PARAGRAPH,
              text: "Exercise placeholder content goes here.",
            },
          ],
        },
      ],
    },
    onFinish: () => {},
    onExit: () => {},
  } as IStudySession,
};

export const Exercise: Story = {
  args: {
    studySession: {
      studyBlocks: [
        {
          type: "exercise",
          atomId: "atom-mc-1",
          components: [
            {
              id: "mc-1",
              type: StudyBlockComponentType.MULTIPLE_CHOICE,
              question: "Question",
              options: [
                { id: "0", text: "Option 1" },
                { id: "1", text: "Option 2 (correct)" },
                { id: "2", text: "Option 3" },
                { id: "3", text: "Option 4" },
              ],
              correctOptionId: "1",
            },
          ],
        },
      ],
    },
    onFinish: () => {},
    onExit: () => {},
  } as IStudySession,
};

export const ExerciseMultipleChoice3InARow: Story = {
  args: {
    studySession: {
      studyBlocks: [
        {
          type: "exercise",
          atomId: "atom-mc-fruit",
          components: [
            {
              id: "mc-fruit-1",
              type: StudyBlockComponentType.MULTIPLE_CHOICE,
              question: "Which fruit is the best?",
              options: [
                { id: "apple", text: "Apple" },
                { id: "banana", text: "Banana" },
                { id: "mango", text: "Mango (correct)" },
                { id: "strawberry", text: "Strawberry" },
              ],
              correctOptionId: "mango",
            },
          ],
        },
        {
          type: "exercise",
          atomId: "atom-mc-animal",
          components: [
            {
              id: "mc-animal-1",
              type: StudyBlockComponentType.MULTIPLE_CHOICE,
              question: "Which animal can fly?",
              options: [
                { id: "cat", text: "Cat" },
                { id: "eagle", text: "Eagle (correct)" },
                { id: "elephant", text: "Elephant" },
                { id: "dolphin", text: "Dolphin" },
              ],
              correctOptionId: "eagle",
            },
          ],
        },
        {
          type: "exercise",
          atomId: "atom-mc-planet",
          components: [
            {
              id: "mc-planet-1",
              type: StudyBlockComponentType.MULTIPLE_CHOICE,
              question: "Which planet is known as the Red Planet?",
              options: [
                { id: "venus", text: "Venus" },
                { id: "mars", text: "Mars (correct)" },
                { id: "jupiter", text: "Jupiter" },
                { id: "neptune", text: "Neptune" },
              ],
              correctOptionId: "mars",
            },
          ],
        },
      ],
    },
    onFinish: () => {},
    onExit: () => {},
  } as IStudySession,
};
