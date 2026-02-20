import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { CodeEditor, type CodeEditorProps } from "./CodeEditor";
import type { CodeEditorTab } from "./CodeEditorTypes";

const meta = {
  title: "x/study-session/study-blocks/exercise-components/CodeEditor",
  component: CodeEditor,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CodeEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Sample tab configs
// ---------------------------------------------------------------------------

const fillInBlankTab: CodeEditorTab = {
  id: "editor",
  label: "index.html",
  type: "fillInBlankWithOptions",
  language: "markup",
  lines: [
    [{ type: "text", value: "<h1>This is the title</h1>" }],
    [{ type: "text", value: "<p>" }],
    [
      { type: "text", value: "  Roses are red," },
      { type: "blank", blankId: "b1" },
    ],
    [{ type: "text", value: "  Violets are blue," }],
    [{ type: "text", value: "  Code is elegant," }],
    [{ type: "text", value: "  When functions are too." }],
    [{ type: "text", value: "</p>" }],
  ],
  correctAnswers: { b1: "<br>" },
  options: ["<br>", "</p>", "<br>"],
};

const browserTab: CodeEditorTab = {
  id: "browser",
  label: "browser",
  type: "browser",
  html: "<h1>This is the title</h1><p>Roses are red,<br>Violets are blue,<br>Code is elegant,<br>When functions are too.</p>",
};

const terminalTab: CodeEditorTab = {
  id: "terminal",
  label: "terminal",
  type: "terminal",
  language: "bash",
  lines: ["USER ~", "$ Hello World!"],
};

const tableTab: CodeEditorTab = {
  id: "table",
  label: "output table",
  type: "table",
  rows: [
    ["animal", "name"],
    ["penguin", "Pepa"],
    ["penguin", "Karel"],
    ["penguin", "Božena"],
  ],
};

const fillInCodeTab: CodeEditorTab = {
  id: "code-editor",
  label: "index.html",
  type: "fillInCode",
  language: "markup",
  defaultValue: `<h1>This is the title</h1>
<p>
  Roses are red, <br>
  Violets are blue, <br>
  Code is elegant,
  When functions are too.
</p>`,
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Wrapper that manages activeTabId state internally for Storybook. */
function StatefulCodeEditor(
  props: Omit<CodeEditorProps, "activeTabId" | "onActiveTabChange">,
) {
  const [activeTabId, setActiveTabId] = useState(props.tabs[0]?.id ?? "");
  return (
    <CodeEditor
      {...props}
      activeTabId={activeTabId}
      onActiveTabChange={setActiveTabId}
    />
  );
}

/** Wrapper that also holds per-tab code value state for fillInCode tabs. */
function StatefulCodeEditorWithCode(
  props: Omit<CodeEditorProps, "activeTabId" | "onActiveTabChange">,
) {
  const [activeTabId, setActiveTabId] = useState(props.tabs[0]?.id ?? "");
  const [codeValues, setCodeValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const tab of props.tabs) {
      if (tab.type === "fillInCode") {
        initial[tab.id] = tab.defaultValue ?? "";
      }
    }
    return initial;
  });

  return (
    <CodeEditor
      {...props}
      activeTabId={activeTabId}
      onActiveTabChange={setActiveTabId}
      codeValues={codeValues}
      onCodeValueChange={(tabId, val) =>
        setCodeValues((prev) => ({ ...prev, [tabId]: val }))
      }
    />
  );
}

export const FillInCodeWindow: Story = {
  render: () => (
    <StatefulCodeEditorWithCode
      tabs={[fillInCodeTab]}
      passiveTabsUnlocked={false}
    />
  ),
  args: {} as any,
};

export const FillInBlankWithBrowser: Story = {
  render: () => (
    <StatefulCodeEditor
      tabs={[fillInBlankTab, browserTab]}
      passiveTabsUnlocked={false}
      filledBlanks={{ b1: "<br>" }}
    />
  ),
  args: {} as any,
};

export const PassiveTabsUnlocked: Story = {
  render: () => (
    <StatefulCodeEditor
      tabs={[fillInBlankTab, browserTab]}
      passiveTabsUnlocked={true}
      filledBlanks={{ b1: "<br>" }}
    />
  ),
  args: {} as any,
};

export const TerminalWindow: Story = {
  render: () => (
    <StatefulCodeEditor
      tabs={[fillInBlankTab, terminalTab]}
      passiveTabsUnlocked={true}
    />
  ),
  args: {} as any,
};

export const TableWindow: Story = {
  render: () => (
    <StatefulCodeEditor
      tabs={[fillInBlankTab, tableTab]}
      passiveTabsUnlocked={true}
    />
  ),
  args: {} as any,
};

export const AllTabs: Story = {
  render: () => (
    <StatefulCodeEditor
      tabs={[fillInBlankTab, browserTab, terminalTab, tableTab]}
      passiveTabsUnlocked={true}
      filledBlanks={{ b1: "<br>" }}
    />
  ),
  args: {} as any,
};
