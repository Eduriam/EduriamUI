import { ContentContainer } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import type { Scene } from "../../../../video-manager";
import { STUDY_SESSION_LOCALIZATION_DEFAULT } from "../../../StudySessionLocalizationDefault";
import { ExplanationStudyBlock } from "./ExplanationStudyBlock";

const sampleScenes: Scene[] = [
  {
    id: "scene-1",
    duration: 5000,
    audio: {
      url: "https://mocks.eduriam.com/first-paragraph.mp3",
      captions: [
        {
          text: " This",
          startMs: 0,
          endMs: 280,
          timestampMs: 140,
          confidence: null,
        },
        {
          text: " is",
          startMs: 280,
          endMs: 450,
          timestampMs: 365,
          confidence: null,
        },
        {
          text: " the",
          startMs: 450,
          endMs: 650,
          timestampMs: 550,
          confidence: null,
        },
        {
          text: " explanation",
          startMs: 650,
          endMs: 1200,
          timestampMs: 925,
          confidence: null,
        },
        {
          text: " block.",
          startMs: 1200,
          endMs: 1700,
          timestampMs: 1450,
          confidence: null,
        },
      ],
    },
    slides: [
      {
        id: "slide-1",
        type: "RAW",
        components: [
          {
            id: "bg1",
            type: "BACKGROUND_COLOR",
            startTime: 0,
            color: "#0ea5e9",
          },
          {
            id: "ph1",
            type: "PAGE_HEADER",
            startTime: 0,
            text: "Explanation",
          },
          {
            id: "ps1",
            type: "PAGE_SUBHEADER",
            startTime: 800,
            text: "Key concepts in this lesson",
          },
        ],
      },
    ],
  },
  {
    id: "scene-2",
    duration: 8000,
    audio: {
      url: "https://mocks.eduriam.com/second-paragraph.mp3",
      captions: [
        {
          text: " Here",
          startMs: 0,
          endMs: 280,
          timestampMs: 140,
          confidence: null,
        },
        {
          text: " are",
          startMs: 280,
          endMs: 480,
          timestampMs: 380,
          confidence: null,
        },
        {
          text: " more",
          startMs: 480,
          endMs: 760,
          timestampMs: 620,
          confidence: null,
        },
        {
          text: " details",
          startMs: 760,
          endMs: 1180,
          timestampMs: 970,
          confidence: null,
        },
        {
          text: " in",
          startMs: 1180,
          endMs: 1340,
          timestampMs: 1260,
          confidence: null,
        },
        {
          text: " scene",
          startMs: 1340,
          endMs: 1680,
          timestampMs: 1510,
          confidence: null,
        },
        {
          text: " two.",
          startMs: 1680,
          endMs: 2150,
          timestampMs: 1915,
          confidence: null,
        },
      ],
    },
    slides: [
      {
        id: "slide-2",
        type: "RAW",
        components: [
          {
            id: "bg2",
            type: "BACKGROUND_COLOR",
            startTime: 0,
            color: "#e5e5e5",
          },
          {
            id: "h1",
            type: "HEADER",
            startTime: 0,
            text: "Scene 2",
            position: "CENTER",
          },
        ],
      },
    ],
  },
];

const databaseTableOnlyScenes: Scene[] = [
  {
    id: "db-scene-1",
    duration: 7000,
    audio: {
      url: "https://mocks.eduriam.com/first-paragraph.mp3",
      captions: [
        {
          text: " Database",
          startMs: 0,
          endMs: 520,
          timestampMs: 260,
          confidence: null,
        },
        {
          text: " table",
          startMs: 520,
          endMs: 980,
          timestampMs: 750,
          confidence: null,
        },
        {
          text: " only",
          startMs: 980,
          endMs: 1450,
          timestampMs: 1215,
          confidence: null,
        },
        {
          text: " scene.",
          startMs: 1450,
          endMs: 2050,
          timestampMs: 1750,
          confidence: null,
        },
      ],
    },
    slides: [
      {
        id: "db-slide-1",
        type: "RAW",
        components: [
          {
            id: "db-table-1",
            type: "DATABASE_TABLE",
            startTime: 0,
            position: "CENTER",
            tableName: "query_result",
            columns: [
              { key: "id", label: "id" },
              { key: "email", label: "email" },
              { key: "country", label: "country" },
              { key: "active", label: "active" },
              { key: "last_login", label: "last_login" },
            ],
            rows: [
              {
                id: 101,
                email: "hana.rivera@eduriam.dev",
                country: "US",
                active: true,
                last_login: "2026-02-18 08:11:45",
              },
              {
                id: 102,
                email: "lin.park@eduriam.dev",
                country: "KR",
                active: false,
                last_login: null,
              },
              {
                id: 103,
                email: "marco.vega@eduriam.dev",
                country: "ES",
                active: true,
                last_login: "2026-02-20 22:41:09",
              },
            ],
          },
        ],
      },
    ],
  },
];

const makeCodeExplainerScenes = ({
  sceneId,
  slideId,
  componentId,
  stepDurationMs,
  transitionDurationMs,
  steps,
}: {
  sceneId: string;
  slideId: string;
  componentId: string;
  stepDurationMs: number;
  transitionDurationMs: number;
  steps: Array<{ id: string; language: string; code: string }>;
}): Scene[] => [
  {
    id: sceneId,
    duration: stepDurationMs * steps.length,
    slides: [
      {
        id: slideId,
        type: "RAW",
        components: [
          {
            id: `${componentId}-bg`,
            type: "BACKGROUND_COLOR",
            startTime: 0,
            color: "#020617",
          },
          {
            id: componentId,
            type: "CODE_EXPLAINER",
            startTime: 0,
            position: "CENTER",
            colorMode: "DARK",
            stepDurationMs,
            transitionDurationMs,
            showLineNumbers: true,
            steps,
          },
        ],
      },
    ],
  },
];

const addCommentAboveLine = (
  code: string,
  lineToFind: string,
  comment: string,
): string => code.replace(lineToFind, `${comment}\n${lineToFind}`);

const longCodeBase = `type User = {
  id: string;
  name: string;
  country: "US" | "DE" | "PL" | "JP";
  points: number;
  active: boolean;
};

type CountryReportItem = {
  country: string;
  activeCount: number;
  avgPoints: number;
  status: "growing" | "steady";
};

const users: User[] = [
  { id: "u1", name: "Ada", country: "US", points: 93, active: true },
  { id: "u2", name: "Liam", country: "DE", points: 71, active: true },
  { id: "u3", name: "Maya", country: "PL", points: 85, active: false },
  { id: "u4", name: "Noa", country: "US", points: 67, active: true },
  { id: "u5", name: "Eri", country: "JP", points: 78, active: true },
  { id: "u6", name: "Ivan", country: "PL", points: 91, active: true },
  { id: "u7", name: "Nora", country: "DE", points: 66, active: false },
  { id: "u8", name: "Yuki", country: "JP", points: 88, active: true },
  { id: "u9", name: "Omar", country: "US", points: 74, active: true },
  { id: "u10", name: "Pia", country: "PL", points: 62, active: false },
  { id: "u11", name: "Rin", country: "JP", points: 95, active: true },
  { id: "u12", name: "Theo", country: "DE", points: 83, active: true },
];

const buildCountryReport = (items: User[]): CountryReportItem[] => {
  const grouped = items.reduce<Record<string, User[]>>((acc, user) => {
    const bucket = acc[user.country] ?? [];
    bucket.push(user);
    acc[user.country] = bucket;
    return acc;
  }, {});

  return Object.entries(grouped).map(([country, countryUsers]) => {
    const activeUsers = countryUsers.filter((user) => user.active);
    const totalPoints = countryUsers.reduce((sum, user) => sum + user.points, 0);
    const avgPoints = Math.round(totalPoints / Math.max(1, countryUsers.length));

    return {
      country,
      activeCount: activeUsers.length,
      avgPoints,
      status: avgPoints >= 80 ? "growing" : "steady",
    };
  });
};

const report = buildCountryReport(users);
const activeCountryCodes = report.map((item) => item.status.toUpperCase());
console.log(activeCountryCodes.join(", "));`;

const longCodeFocusGroup = addCommentAboveLine(
  longCodeBase,
  "  const grouped = items.reduce<Record<string, User[]>>((acc, user) => {",
  "// @focus",
);
const longCodeFocusResult1 = addCommentAboveLine(
  longCodeBase,
  "type CountryReportItem = {",
  "// @focus",
);
const longCodeFocusResult2 = addCommentAboveLine(
  longCodeBase,
  "const report = buildCountryReport(users);",
  "// @focus",
);
const longCodeWithError = addCommentAboveLine(
  longCodeBase.replace(
    "const activeCountryCodes = report.map((item) => item.status.toUpperCase());",
    "const activeCountryCodes = report.map((item) => item.statusText.toUpperCase());",
  ),
  "const activeCountryCodes = report.map((item) => item.statusText.toUpperCase());",
  "// @errors: 2339",
);

const codeExplainerJavaScriptWalkthroughScenes = makeCodeExplainerScenes({
  sceneId: "code-scene-js",
  slideId: "code-slide-js",
  componentId: "code-explainer-js",
  stepDurationMs: 2400,
  transitionDurationMs: 500,
  steps: [
    {
      id: "step-1",
      language: "ts",
      code: `const user = {
  name: "Ada",
  age: 26,
};

console.log(user);
//           ^?`,
    },
    {
      id: "step-2",
      language: "ts",
      code: `const user = {
  name: "Ada",
  age: 26,
};

// @errors: 2339
console.log(user.location);`,
    },
    {
      id: "step-3",
      language: "ts",
      code: `const user = {
  name: "Ada",
  age: 26,
  location: "London",
};

console.log(user.location);
//           ^?`,
    },
  ],
});

const codeExplainerFewLinesLargeFontScenes = makeCodeExplainerScenes({
  sceneId: "code-scene-few-lines",
  slideId: "code-slide-few-lines",
  componentId: "code-explainer-few-lines",
  stepDurationMs: 2800,
  transitionDurationMs: 500,
  steps: [
    {
      id: "few-1",
      language: "ts",
      code: `const isReady = true;

if (isReady) {
  console.log("Start");
}`,
    },
    {
      id: "few-2",
      language: "ts",
      code: `const isReady = true;

if (isReady) {
  console.log("Start");
}
//           ^?`,
    },
  ],
});

const codeExplainerManyLinesSmallerFontScenes = makeCodeExplainerScenes({
  sceneId: "code-scene-many-lines",
  slideId: "code-slide-many-lines",
  componentId: "code-explainer-many-lines",
  stepDurationMs: 3000,
  transitionDurationMs: 550,
  steps: [
    {
      id: "many-1",
      language: "ts",
      code: `type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "student";
};

const users: User[] = [
  { id: "u1", name: "Ada", email: "ada@site.dev", role: "admin" },
  { id: "u2", name: "Lin", email: "lin@site.dev", role: "student" },
  { id: "u3", name: "Maya", email: "maya@site.dev", role: "editor" },
];

const admins = users.filter((u) => u.role === "admin");
console.log(admins);`,
    },
    {
      id: "many-2",
      language: "ts",
      code: `type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "student";
};

const users: User[] = [
  { id: "u1", name: "Ada", email: "ada@site.dev", role: "admin" },
  { id: "u2", name: "Lin", email: "lin@site.dev", role: "student" },
  { id: "u3", name: "Maya", email: "maya@site.dev", role: "editor" },
];

// @errors: 2339
const admins = users.filter((u) => u.permissions.includes("manage_users"));
console.log(admins);`,
    },
  ],
});

const codeExplainerLongLineWrapsToFitScenes = makeCodeExplainerScenes({
  sceneId: "code-scene-wrap",
  slideId: "code-slide-wrap",
  componentId: "code-explainer-wrap",
  stepDurationMs: 3200,
  transitionDurationMs: 550,
  steps: [
    {
      id: "wrap-1",
      language: "ts",
      code: `const requestUrl = "https://api.example.dev/v1/very/long/path/that/keeps/going/and/going/and/contains/query?include=profile,settings,permissions,subscriptions,activityLog,notifications&locale=en-US&fallback=true";
console.log(requestUrl);`,
    },
    {
      id: "wrap-2",
      language: "ts",
      code: `const requestUrl = "https://api.example.dev/v1/very/long/path/that/keeps/going/and/going/and/contains/query?include=profile,settings,permissions,subscriptions,activityLog,notifications&locale=en-US&fallback=true";
//           ^?
console.log(requestUrl);`,
    },
  ],
});

const codeExplainerLongCodeAutoScrollScenes = makeCodeExplainerScenes({
  sceneId: "code-scene-scroll",
  slideId: "code-slide-scroll",
  componentId: "code-explainer-scroll",
  stepDurationMs: 3200,
  transitionDurationMs: 550,
  steps: [
    {
      id: "scroll-focus-1",
      language: "ts",
      code: longCodeFocusGroup,
    },
    {
      id: "scroll-focus-2",
      language: "ts",
      code: longCodeFocusResult1,
    },
    {
      id: "scroll-focus-3",
      language: "ts",
      code: longCodeFocusResult2,
    },
    {
      id: "scroll-error-4",
      language: "ts",
      code: longCodeWithError,
    },
  ],
});

const meta: Meta<typeof ExplanationStudyBlock> = {
  title: "x/study-session/study-blocks/ExplanationStudyBlock",
  component: ExplanationStudyBlock,
  args: {
    onComplete: fn(),
    localization: STUDY_SESSION_LOCALIZATION_DEFAULT,
  },
  decorators: [
    (Story) => (
      <ContentContainer width="large">
        <Story />
      </ContentContainer>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ExplanationStudyBlock>;

export const Default: Story = {
  args: {
    scenes: sampleScenes,
  },
};

export const DatabaseTableOnly: Story = {
  args: {
    scenes: databaseTableOnlyScenes,
  },
};

export const WithCodeExplainer: Story = {
  args: {
    scenes: codeExplainerJavaScriptWalkthroughScenes,
  },
};

export const WithCodeExplainerFewLinesLargeFont: Story = {
  args: {
    scenes: codeExplainerFewLinesLargeFontScenes,
  },
};

export const WithCodeExplainerManyLinesSmallerFont: Story = {
  args: {
    scenes: codeExplainerManyLinesSmallerFontScenes,
  },
};

export const WithCodeExplainerLongLineWrapsToFit: Story = {
  args: {
    scenes: codeExplainerLongLineWrapsToFitScenes,
  },
};

export const WithCodeExplainerLongCodeAutoScroll: Story = {
  args: {
    scenes: codeExplainerLongCodeAutoScrollScenes,
  },
};
