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

/** Exercise with sequential paragraph audio that plays on load. */
export const ExerciseWithAudio: Story = {
  args: {
    studySession: {
      studyBlocks: [
        {
          type: "exercise",
          atomId: "atom-audio-1",
          components: [
            {
              id: "para-audio-1",
              type: StudyBlockComponentType.PARAGRAPH,
              text: "This is the first explanation paragraph.",
              audio: { url: "https://mocks.eduriam.com/first-paragraph.mp3" },
            },
            {
              id: "para-audio-2",
              type: StudyBlockComponentType.PARAGRAPH,
              text: "This is the second explanation paragraph.",
              audio: { url: "https://mocks.eduriam.com/second-paragraph.mp3" },
            },
            {
              id: "mc-audio-1",
              type: StudyBlockComponentType.MULTIPLE_CHOICE,
              question: "What did you hear?",
              options: [
                { id: "first-second", text: "First and second paragraph." },
                { id: "third", text: "Third paragraph." },
              ],
              correctOptionId: "first-second",
            },
          ],
        },
        {
          type: "exercise",
          atomId: "atom-audio-2",
          components: [
            {
              id: "para-audio-3",
              type: StudyBlockComponentType.PARAGRAPH,
              text: "This exercise also has audio.",
              audio: {
                url: "https://mocks.eduriam.com/exercise-also-audio.mp3",
              },
            },
            {
              id: "mc-audio-2",
              type: StudyBlockComponentType.MULTIPLE_CHOICE,
              question: "Pick the correct answer.",
              options: [
                { id: "a", text: "Answer A (correct)" },
                { id: "b", text: "Answer B" },
              ],
              correctOptionId: "a",
            },
          ],
        },
      ],
    },
    onFinish: () => {},
    onExit: () => {},
  } as IStudySession,
};

/** Sample lesson: SELECT * FROM — basics of selecting all rows from a table in SQL. */
export const ExampleLessonSQL: Story = {
  args: {
    studySession: {
      studyBlocks: [
        // 1. What is SELECT?
        {
          type: "explanation",
          atomId: "sql-select-all",
          scenes: [
            {
              id: "scene-select-intro",
              duration: 12000,
              audio: {
                url: "https://mocks.eduriam.com/scene-select-intro.mp3",
              },
              slides: [
                {
                  id: "slide-select-intro",
                  type: "RAW",
                  components: [
                    {
                      id: "ph1",
                      type: "PAGE_HEADER",
                      startTime: 0,
                      text: "What is SELECT?",
                    },
                    {
                      id: "ps1",
                      type: "PAGE_SUBHEADER",
                      startTime: 1200,
                      text: "The command to read data from a database",
                    },
                  ],
                },
              ],
            },
          ],
        },
        // 2. The asterisk *
        {
          type: "explanation",
          atomId: "sql-select-all",
          scenes: [
            {
              id: "scene-asterisk",
              duration: 12000,
              audio: {
                url: "https://mocks.eduriam.com/scene-asterisk.mp3",
              },
              slides: [
                {
                  id: "slide-asterisk",
                  type: "RAW",
                  components: [
                    {
                      id: "ph2",
                      type: "PAGE_HEADER",
                      startTime: 0,
                      text: "The asterisk *",
                    },
                    {
                      id: "ps2",
                      type: "PAGE_SUBHEADER",
                      startTime: 1000,
                      text: "Means: all columns",
                    },
                  ],
                },
              ],
            },
          ],
        },
        // 3. Exercise: what does SELECT do?
        {
          type: "exercise",
          atomId: "sql-select-all",
          components: [
            {
              id: "mc-select",
              type: StudyBlockComponentType.MULTIPLE_CHOICE,
              question: "What does the SELECT statement do?",
              options: [
                { id: "read", text: "Read or retrieve data from the database" },
                { id: "insert", text: "Insert new rows into a table" },
                { id: "delete", text: "Delete data from the database" },
              ],
              correctOptionId: "read",
            },
          ],
        },
        // 4. What is FROM?
        {
          type: "explanation",
          atomId: "sql-select-all",
          scenes: [
            {
              id: "scene-from",
              duration: 16000,
              audio: {
                url: "https://mocks.eduriam.com/scene-from.mp3",
              },
              slides: [
                {
                  id: "slide-from",
                  type: "RAW",
                  components: [
                    {
                      id: "ph3",
                      type: "PAGE_HEADER",
                      startTime: 0,
                      text: "The FROM clause",
                    },
                    {
                      id: "ps3",
                      type: "PAGE_SUBHEADER",
                      startTime: 1000,
                      text: "Specifies which table to read from",
                    },
                  ],
                },
              ],
            },
          ],
        },
        // 5. Exercise: what does * mean?
        {
          type: "exercise",
          atomId: "sql-select-all",
          components: [
            {
              id: "mc-asterisk",
              type: StudyBlockComponentType.MULTIPLE_CHOICE,
              question: "In SELECT *, what does the asterisk mean?",
              options: [
                { id: "all-cols", text: "All columns from the table" },
                { id: "multiply", text: "Multiplication" },
                { id: "first-col", text: "Only the first column" },
              ],
              correctOptionId: "all-cols",
            },
          ],
        },
        // 6. Putting it together: SELECT * FROM table_name
        {
          type: "explanation",
          atomId: "sql-select-all",
          scenes: [
            {
              id: "scene-putting-together",
              duration: 20000,
              audio: {
                url: "https://mocks.eduriam.com/scene-putting-together.mp3",
              },
              slides: [
                {
                  id: "slide-putting-together",
                  type: "RAW",
                  components: [
                    {
                      id: "ph4",
                      type: "PAGE_HEADER",
                      startTime: 0,
                      text: "SELECT * FROM table_name",
                    },
                    {
                      id: "ps4",
                      type: "PAGE_SUBHEADER",
                      startTime: 1500,
                      text: "All columns, all rows, from one table",
                    },
                  ],
                },
              ],
            },
          ],
        },
        // 7. Exercise: what does FROM do?
        {
          type: "exercise",
          atomId: "sql-select-all",
          components: [
            {
              id: "mc-from",
              type: StudyBlockComponentType.MULTIPLE_CHOICE,
              question: "What does the FROM clause do?",
              options: [
                {
                  id: "specify-table",
                  text: "Specifies which table to get the data from",
                },
                { id: "filter-rows", text: "Filters which rows to return" },
                { id: "order-results", text: "Orders the result set" },
              ],
              correctOptionId: "specify-table",
            },
          ],
        },
        // 8. Recap explanation
        {
          type: "explanation",
          atomId: "sql-select-all",
          scenes: [
            {
              id: "scene-recap",
              duration: 17000,
              audio: {
                url: "https://mocks.eduriam.com/scene-recap.mp3",
              },
              slides: [
                {
                  id: "slide-recap",
                  type: "RAW",
                  components: [
                    {
                      id: "ph5",
                      type: "PAGE_HEADER",
                      startTime: 0,
                      text: "Recap: SELECT * FROM",
                    },
                    {
                      id: "ps5",
                      type: "PAGE_SUBHEADER",
                      startTime: 800,
                      text: "SELECT = read, * = all columns, FROM = which table",
                    },
                  ],
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
              assignmentTitle: "Build a styled page",
              assignmentDescription:
                "Complete the HTML and CSS so the page shows the poem with a navy heading and 18px paragraph. Add the script to make the heading red, then check the browser tab.",
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
                  id: "script.js",
                  label: "script.js",
                  type: "fillInBlankWithoutOptions",
                  lines: [
                    [
                      {
                        type: "text",
                        value: "document.querySelector('h1').style.color = ",
                      },
                      { type: "blank", blankId: "color" },
                      { type: "text", value: ";" },
                    ],
                  ],
                  correctAnswers: { color: '"red"' },
                  keyboardSet: "javascript",
                },
                {
                  id: "browser",
                  label: "browser",
                  type: "browser",
                  html: "<h1>Hello</h1><p>Roses are red,<br>Violets are blue.</p>",
                  inlineCss: "h1 { color: navy; } p { font-size: 18px; }",
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
