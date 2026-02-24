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
