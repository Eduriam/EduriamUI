import type { DrawerSelectSection } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import React, { useState } from "react";

import Box from "@mui/material/Box";

import StudySession, {
  IStudySession,
  type SelectedStudyBlockData,
} from "./StudySession";
import { ReportDialog } from "../shared/ReportDialog";
import { StudyBlockMode, StudyBlockType } from "./components/study-blocks/StudyBlock";
import { StudyBlockComponentType } from "./components/study-blocks/exercise/components/StudyBlockComponentTypes";

const meta: Meta<typeof StudySession> = {
  title: "x/study-session/StudySession",
  component: StudySession,
};

export default meta;
type Story = StoryObj<typeof StudySession>;

const REPORT_PROBLEM_TYPE_SECTIONS: DrawerSelectSection[] = [
  {
    id: "problem-type",
    title: "Problem type",
    options: [
      { id: "wrong-solution", label: "Wrong solution" },
      { id: "unclear-instructions", label: "Unclear instructions" },
      { id: "wrong-answer-accepted", label: "Wrong answer accepted" },
      { id: "correct-answer-rejected", label: "Correct answer rejected" },
      { id: "other", label: "Other issue" },
    ],
  },
];

const REPORT_DIALOG_LOCALIZATION = {
  header: "Report a problem",
  problemTypePlaceholder: "Problem type",
  descriptionPlaceholder: "Describe problem (optional)",
  submitLabel: "Submit",
  thankYouSection: {
    title: "Thank you for your feedback!",
    description: "We will review your problem report as soon as possible.",
    continueButton: "Continue",
  },
};

export const Base: Story = {
  args: {
    studySession: {
      id: "story-study-session",
      studyBlocks: [
        {
          id: "base-block-1",
          type: StudyBlockType.Explanation,
          mode: StudyBlockMode.Learn,
          atomId: "atom-1",
          content: {
            scenes: [
            {
              id: "base-scene-1",
              duration: 7000,
              slides: [
                {
                  id: "base-slide-1",
                  type: "RAW",
                  startTime: 0,
                  components: [
                    {
                      id: "hdr-1",
                      type: "TEXT",
                      startTime: 0,
                      column: "first",
                      text: "Study Block Header Component",
                    },
                    {
                      id: "para-1",
                      type: "TEXT",
                      startTime: 800,
                      column: "first",
                      text: "This is an study block paragraph component.",
                    },
                  ],
                },
              ],
            },
          ],
          },
        },
        {
          id: "base-block-2",
          type: StudyBlockType.Exercise,
          mode: StudyBlockMode.Learn,
          atomId: "atom-2",
          content: {
            components: [
            {
              id: "para-2",
              type: StudyBlockComponentType.PARAGRAPH,
              text: "Exercise placeholder content goes here.",
            },
          ],
          },
        },
      ],
    },
    onFinish: () => {},
    onExit: () => {},
  } as unknown as IStudySession,
};

export const Exercise: Story = {
  args: {
    studySession: {
      id: "story-study-session",
      studyBlocks: [
        {
          id: "exercise-block-1",
          type: StudyBlockType.Exercise,
          mode: StudyBlockMode.Learn,
          atomId: "atom-mc-1",
          content: {
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
        },
      ],
    },
    onFinish: () => {},
    onExit: () => {},
  } as unknown as IStudySession,
};

const StudySessionWithReportDialogStory: React.FC = () => {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<SelectedStudyBlockData | null>(null);

  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <StudySession
        studySession={{
          id: "story-study-session",
          studyBlocks: [
            {
              id: 31,
              type: StudyBlockType.Exercise,
              mode: StudyBlockMode.Learn,
              atomId: 3101,
              content: {
                components: [
                  {
                    id: "mc-report-1",
                    type: StudyBlockComponentType.MULTIPLE_CHOICE,
                    question: "What does SQL SELECT do?",
                    options: [
                      { id: "read", text: "Reads data (correct)" },
                      { id: "delete", text: "Deletes data" },
                      { id: "insert", text: "Inserts rows" },
                    ],
                    correctOptionId: "read",
                  },
                ],
              },
            },
          ],
        }}
        onFinish={() => {}}
        onExit={() => {}}
        onReportStudyBlockClick={(studyBlockData) => {
          setReportTarget(studyBlockData);
          setReportDialogOpen(true);
        }}
      />

      <ReportDialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        problemTypeSections={REPORT_PROBLEM_TYPE_SECTIONS}
        localization={REPORT_DIALOG_LOCALIZATION}
        onSubmit={(payload) => {
          console.info("Study block report submitted", {
            studyBlock: reportTarget,
            report: payload,
          });
        }}
      />
    </Box>
  );
};

export const WithReportDialog: Story = {
  render: () => <StudySessionWithReportDialogStory />,
};

export const ExerciseMultipleChoice3InARow: Story = {
  args: {
    studySession: {
      id: "story-study-session",
      studyBlocks: [
        {
          id: "exercise-mc-fruit",
          type: StudyBlockType.Exercise,
          mode: StudyBlockMode.Learn,
          atomId: "atom-mc-fruit",
          content: {
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
        },
        {
          id: "exercise-mc-animal",
          type: StudyBlockType.Exercise,
          mode: StudyBlockMode.Learn,
          atomId: "atom-mc-animal",
          content: {
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
        },
        {
          id: "exercise-mc-planet",
          type: StudyBlockType.Exercise,
          mode: StudyBlockMode.Learn,
          atomId: "atom-mc-planet",
          content: {
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
        },
      ],
    },
    onFinish: () => {},
    onExit: () => {},
  } as unknown as IStudySession,
};

/** Exercise with sequential paragraph audio that plays on load. */
export const ExerciseWithAudio: Story = {
  args: {
    studySession: {
      id: "story-study-session",
      studyBlocks: [
        {
          id: "exercise-audio-1",
          type: StudyBlockType.Exercise,
          mode: StudyBlockMode.Learn,
          atomId: "atom-audio-1",
          content: {
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
        },
        {
          id: "exercise-audio-2",
          type: StudyBlockType.Exercise,
          mode: StudyBlockMode.Learn,
          atomId: "atom-audio-2",
          content: {
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
        },
      ],
    },
    onFinish: () => {},
    onExit: () => {},
  } as unknown as IStudySession,
};

/** Sample lesson: SELECT * FROM — basics of selecting all rows from a table in SQL. */
const ExampleLessonSQLWithReportStory: React.FC<{ args: IStudySession }> = ({
  args,
}) => {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<SelectedStudyBlockData | null>(null);

  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <StudySession
        {...args}
        onReportStudyBlockClick={(studyBlockData) => {
          setReportTarget(studyBlockData);
          setReportDialogOpen(true);
        }}
      />

      <ReportDialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        problemTypeSections={REPORT_PROBLEM_TYPE_SECTIONS}
        localization={REPORT_DIALOG_LOCALIZATION}
        onSubmit={(payload) => {
          console.info("Study block report submitted", {
            studyBlock: reportTarget,
            report: payload,
          });
        }}
      />
    </Box>
  );
};

export const ExampleLessonSQL: Story = {
  render: (args) => (
    <ExampleLessonSQLWithReportStory args={args as unknown as IStudySession} />
  ),
  args: {
    studySession: {
      id: "story-study-session",
      studyBlocks: [
        // 1. What is SELECT?
        {
          id: "sql-select-block-1",
          type: StudyBlockType.Explanation,
          mode: StudyBlockMode.Learn,
          atomId: "sql-select-all",
          content: {
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
                  startTime: 0,
                  components: [
                    {
                      id: "ph1",
                      type: "TEXT",
                      startTime: 0,
                      column: "first",
                      text: "What is SELECT?",
                    },
                    {
                      id: "ps1",
                      type: "TEXT",
                      startTime: 1200,
                      column: "first",
                      text: "The command to read data from a database",
                    },
                  ],
                },
              ],
            },
          ],
          },
        },
        // 2. The asterisk *
        {
          id: "sql-select-block-2",
          type: StudyBlockType.Explanation,
          mode: StudyBlockMode.Learn,
          atomId: "sql-select-all",
          content: {
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
                  startTime: 0,
                  components: [
                    {
                      id: "ph2",
                      type: "TEXT",
                      startTime: 0,
                      column: "first",
                      text: "The asterisk *",
                    },
                    {
                      id: "ps2",
                      type: "TEXT",
                      startTime: 1000,
                      column: "first",
                      text: "Means: all columns",
                    },
                  ],
                },
              ],
            },
          ],
          },
        },
        // 3. Exercise: what does SELECT do?
        {
          id: "sql-select-block-3",
          type: StudyBlockType.Exercise,
          mode: StudyBlockMode.Learn,
          atomId: "sql-select-all",
          content: {
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
        },
        // 4. What is FROM?
        {
          id: "sql-select-block-4",
          type: StudyBlockType.Explanation,
          mode: StudyBlockMode.Learn,
          atomId: "sql-select-all",
          content: {
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
                  startTime: 0,
                  components: [
                    {
                      id: "ph3",
                      type: "TEXT",
                      startTime: 0,
                      column: "first",
                      text: "The FROM clause",
                    },
                    {
                      id: "ps3",
                      type: "TEXT",
                      startTime: 1000,
                      column: "first",
                      text: "Specifies which table to read from",
                    },
                  ],
                },
              ],
            },
          ],
          },
        },
        // 5. Exercise: what does * mean?
        {
          id: "sql-select-block-5",
          type: StudyBlockType.Exercise,
          mode: StudyBlockMode.Learn,
          atomId: "sql-select-all",
          content: {
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
        },
        // 6. Putting it together: SELECT * FROM table_name
        {
          id: "sql-select-block-6",
          type: StudyBlockType.Explanation,
          mode: StudyBlockMode.Learn,
          atomId: "sql-select-all",
          content: {
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
                  startTime: 0,
                  components: [
                    {
                      id: "ph4",
                      type: "TEXT",
                      startTime: 0,
                      column: "first",
                      text: "SELECT * FROM table_name",
                    },
                    {
                      id: "ps4",
                      type: "TEXT",
                      startTime: 1500,
                      column: "first",
                      text: "All columns, all rows, from one table",
                    },
                  ],
                },
              ],
            },
          ],
          },
        },
        // 7. Exercise: what does FROM do?
        {
          id: "sql-select-block-7",
          type: StudyBlockType.Exercise,
          mode: StudyBlockMode.Learn,
          atomId: "sql-select-all",
          content: {
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
        },
        // 8. Recap explanation
        {
          id: "sql-select-block-8",
          type: StudyBlockType.Explanation,
          mode: StudyBlockMode.Learn,
          atomId: "sql-select-all",
          content: {
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
                  startTime: 0,
                  components: [
                    {
                      id: "ph5",
                      type: "TEXT",
                      startTime: 0,
                      column: "first",
                      text: "Recap: SELECT * FROM",
                    },
                    {
                      id: "ps5",
                      type: "TEXT",
                      startTime: 800,
                      column: "first",
                      text: "SELECT = read, * = all columns, FROM = which table",
                    },
                  ],
                },
              ],
            },
          ],
          },
        },
      ],
    },
    onFinish: () => {},
    onExit: () => {},
  } as unknown as IStudySession,
};

/** HTML + CSS fill-in-blank exercise with browser preview (single exercise). */
export const ComplexExercise: Story = {
  args: {
    studySession: {
      id: "story-study-session",
      studyBlocks: [
        {
          id: "complex-exercise-block-1",
          type: StudyBlockType.Exercise,
          mode: StudyBlockMode.Learn,
          atomId: "atom-complex-1",
          content: {
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
        },
      ],
    },
    onFinish: () => {},
    onExit: () => {},
  } as unknown as IStudySession,
};




