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

/** HTML + CSS fill-in-blank exercise with browser preview (single exercise). */
export const ComplexExercise: Story = {
  args: {
    studySession: {
      studyBlocks: [
        {
          type: "exercise",
          atomId: "atom-complex-1",
          components: [
            {
              id: "code-ex-1",
              type: StudyBlockComponentType.CODE_EXERCISE,
              tabs: [
                {
                  id: "index.html",
                  label: "index.html",
                  type: "fillInBlankWithOptions",
                  lines: [
                    [{ type: "text", value: "<!DOCTYPE html>" }],
                    [{ type: "text", value: "<html><body>" }],
                    [
                      { type: "text", value: "  " },
                      { type: "blank", blankId: "h1Open" },
                      { type: "blank", blankId: "title" },
                      { type: "blank", blankId: "h1Close" },
                    ],
                    [
                      { type: "text", value: "  " },
                      { type: "blank", blankId: "pOpen" },
                      { type: "text", value: "Roses are red," },
                      { type: "blank", blankId: "br" },
                      { type: "text", value: "Violets are blue." },
                      { type: "blank", blankId: "pClose" },
                    ],
                    [{ type: "text", value: "</body></html>" }],
                  ],
                  correctAnswers: {
                    h1Open: "<h1>",
                    title: "Hello",
                    h1Close: "</h1>",
                    pOpen: "<p>",
                    br: "<br>",
                    pClose: "</p>",
                  },
                  options: [
                    "<h1>",
                    "</h1>",
                    "Hello",
                    "Hi",
                    "<p>",
                    "</p>",
                    "<br>",
                  ],
                },
                {
                  id: "style.css",
                  label: "style.css",
                  type: "fillInBlankWithOptions",
                  lines: [
                    [
                      { type: "text", value: "h1 { color: " },
                      { type: "blank", blankId: "h1color" },
                      { type: "text", value: "; }" },
                    ],
                    [
                      { type: "text", value: "p  { font-size: " },
                      { type: "blank", blankId: "psize" },
                      { type: "text", value: "; }" },
                    ],
                  ],
                  correctAnswers: { h1color: "navy", psize: "18px" },
                  options: ["navy", "red", "18px", "14px"],
                },
                {
                  id: "browser",
                  label: "browser",
                  type: "browser",
                  html: "<h1>Hello</h1><p>Roses are red,<br>Violets are blue.</p>",
                  inlineCss:
                    "h1 { color: navy; } p { font-size: 18px; }",
                },
              ],
            },
          ],
        },
      ],
    },
    onFinish: () => {},
    onExit: () => {},
  } as IStudySession,
};
