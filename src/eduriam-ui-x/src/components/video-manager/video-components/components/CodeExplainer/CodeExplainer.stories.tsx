import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";
import { Player } from "@remotion/player";

import { CodeExplainer, type ICodeExplainer } from "./CodeExplainer";

const STORYBOOK_FPS = 30;
const STORYBOOK_WIDTH = 1920;
const STORYBOOK_HEIGHT = 1080;

const StoryComposition = ({ comp }: { comp: ICodeExplainer }) => (
  <CodeExplainer comp={comp} />
);

const getDurationInFrames = (comp: ICodeExplainer): number => {
  const defaultStepDurationMs = comp.stepDurationMs ?? 2500;
  const totalFrames = comp.steps.reduce((sum, step) => {
    const ms = step.durationMs ?? defaultStepDurationMs;
    return sum + Math.max(1, Math.round((ms / 1000) * STORYBOOK_FPS));
  }, 0);

  return Math.max(1, totalFrames);
};

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
const longCodeFocusResult = addCommentAboveLine(
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

const meta: Meta<typeof CodeExplainer> = {
  title: "x/video-manager/video-components/CodeExplainer",
  component: CodeExplainer,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          aspectRatio: "1920/1080",
          position: "relative",
          overflow: "hidden",
          background: theme.palette.background.default,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CodeExplainer>;

export const JavaScriptWalkthrough: Story = {
  render: (args) => (
    <Player
      component={StoryComposition}
      inputProps={{ comp: args.comp }}
      durationInFrames={getDurationInFrames(args.comp)}
      fps={STORYBOOK_FPS}
      compositionWidth={STORYBOOK_WIDTH}
      compositionHeight={STORYBOOK_HEIGHT}
      controls
      autoPlay
      clickToPlay={false}
      allowFullscreen={false}
      style={{ width: "100%", height: "100%" }}
      acknowledgeRemotionLicense={true}
    />
  ),
  args: {
    comp: {
      id: "code-explainer-1",
      type: "CODE_EXPLAINER",
      startTime: 0,
      position: "CENTER",
      colorMode: "DARK",
      stepDurationMs: 2400,
      transitionDurationMs: 500,
      showLineNumbers: true,
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
    },
  },
};

export const FewLinesLargeFont: Story = {
  render: JavaScriptWalkthrough.render,
  args: {
    comp: {
      id: "code-explainer-few-lines",
      type: "CODE_EXPLAINER",
      startTime: 0,
      position: "CENTER",
      colorMode: "DARK",
      stepDurationMs: 2800,
      transitionDurationMs: 500,
      showLineNumbers: true,
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
    },
  },
};

export const ManyLinesSmallerFont: Story = {
  render: JavaScriptWalkthrough.render,
  args: {
    comp: {
      id: "code-explainer-many-lines",
      type: "CODE_EXPLAINER",
      startTime: 0,
      position: "CENTER",
      colorMode: "DARK",
      stepDurationMs: 3000,
      transitionDurationMs: 550,
      showLineNumbers: true,
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
    },
  },
};

export const LongLineWrapsToFit: Story = {
  render: JavaScriptWalkthrough.render,
  args: {
    comp: {
      id: "code-explainer-wrap",
      type: "CODE_EXPLAINER",
      startTime: 0,
      position: "CENTER",
      colorMode: "DARK",
      stepDurationMs: 3200,
      transitionDurationMs: 550,
      showLineNumbers: true,
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
    },
  },
};

export const LongCodeAutoScroll: Story = {
  render: JavaScriptWalkthrough.render,
  args: {
    comp: {
      id: "code-explainer-auto-scroll",
      type: "CODE_EXPLAINER",
      startTime: 0,
      position: "CENTER",
      colorMode: "DARK",
      stepDurationMs: 3200,
      transitionDurationMs: 550,
      showLineNumbers: true,
      steps: [
        {
          id: "scroll-focus-1",
          language: "ts",
          code: longCodeFocusGroup,
        },
        {
          id: "scroll-focus-2",
          language: "ts",
          code: longCodeFocusResult,
        },
        {
          id: "scroll-error-3",
          language: "ts",
          code: longCodeWithError,
        },
      ],
    },
  },
};
