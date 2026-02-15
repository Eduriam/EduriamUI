import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import type { CodeEditorTab } from "../CodeEditor/CodeEditorTypes";
import { CodeExercise } from "./CodeExercise";

const meta = {
  title: "x/study-session/study-blocks/exercise-components/CodeExercise",
  component: CodeExercise,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CodeExercise>;

export default meta;
type Story = StoryObj<typeof meta>;

// ===========================================================================
// 1. HTML + CSS (two fillInBlank tabs + browser)
// ===========================================================================

const htmlTab: CodeEditorTab = {
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
      { type: "text", value: "Hello world" },
      { type: "blank", blankId: "pClose" },
    ],
    [{ type: "text", value: "</body></html>" }],
  ],
  correctAnswers: {
    h1Open: "<h1>",
    title: "My Page",
    h1Close: "</h1>",
    pOpen: "<p>",
    pClose: "</p>",
  },
  options: ["<h1>", "</h1>", "My Page", "My Site", "<p>", "</p>"],
};

const cssTab: CodeEditorTab = {
  id: "style.css",
  label: "style.css",
  type: "fillInBlankWithOptions",
  lines: [
    [
      { type: "text", value: "h1 { color: " },
      { type: "blank", blankId: "h1Color" },
      { type: "text", value: "; }" },
    ],
    [
      { type: "text", value: "p { font-size: " },
      { type: "blank", blankId: "pSize" },
      { type: "text", value: "; }" },
    ],
  ],
  correctAnswers: { h1Color: "navy", pSize: "18px" },
  options: ["navy", "red", "18px", "14px"],
};

const htmlCssBrowserTab: CodeEditorTab = {
  id: "browser",
  label: "browser",
  type: "browser",
  html: "<h1>My Page</h1><p>Hello world</p>",
  inlineCss: "h1 { color: navy; } p { font-size: 18px; }",
};

export const HtmlAndCss: Story = {
  args: {
    tabs: [htmlTab, cssTab, htmlCssBrowserTab],
    passiveTabsUnlocked: true,
    onAnswerStateChange: fn(),
  },
};

export const HtmlAndCssWithTitleAndDescription: Story = {
  args: {
    tabs: [htmlTab, cssTab, htmlCssBrowserTab],
    assignmentTitle: "Build a simple page",
    assignmentDescription:
      "Complete the HTML and CSS so the page shows a navy heading and 18px paragraph. Then check the browser tab.",
    passiveTabsUnlocked: true,
    onAnswerStateChange: fn(),
  },
};

// ===========================================================================
// 2. SQL (fillInBlank + table output)
// ===========================================================================

const sqlTab: CodeEditorTab = {
  id: "query.sql",
  label: "query.sql",
  type: "fillInBlankWithOptions",
  lines: [
    [
      { type: "blank", blankId: "select" },
      { type: "text", value: " name, age" },
    ],
    [
      { type: "blank", blankId: "from" },
      { type: "text", value: " users" },
    ],
    [
      { type: "blank", blankId: "where" },
      { type: "text", value: " age > 18" },
    ],
    [
      { type: "blank", blankId: "order" },
      { type: "text", value: " name ASC;" },
    ],
  ],
  correctAnswers: {
    select: "SELECT",
    from: "FROM",
    where: "WHERE",
    order: "ORDER BY",
  },
  options: ["SELECT", "FROM", "WHERE", "ORDER BY", "GROUP BY", "HAVING"],
};

const sqlTableTab: CodeEditorTab = {
  id: "output",
  label: "output",
  type: "table",
  rows: [
    ["name", "age"],
    ["Alice", "25"],
    ["Bob", "30"],
    ["Charlie", "22"],
  ],
};

export const SqlExercise: Story = {
  args: {
    tabs: [sqlTab, sqlTableTab],
    passiveTabsUnlocked: true,
    onAnswerStateChange: fn(),
  },
};

// ===========================================================================
// 3. JavaScript (fillInCode + terminal output)
// ===========================================================================

const jsTab: CodeEditorTab = {
  id: "script.js",
  label: "script.js",
  type: "fillInCode",
  defaultValue: `function greet(name) {\n  // write your code here\n}\n\nconsole.log(greet("World"));`,
  correctAnswer: `function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("World"));`,
};

const jsTerminalTab: CodeEditorTab = {
  id: "terminal",
  label: "console",
  type: "terminal",
  lines: ["> node script.js", "Hello, World!"],
};

export const JavaScriptExercise: Story = {
  args: {
    tabs: [jsTab, jsTerminalTab],
    passiveTabsUnlocked: true,
    onAnswerStateChange: fn(),
  },
};

// ===========================================================================
// 4. Mixed: fillInBlank HTML + fillInCode JS + browser
// ===========================================================================

const mixedHtmlTab: CodeEditorTab = {
  id: "index.html",
  label: "index.html",
  type: "fillInBlankWithOptions",
  lines: [
    [{ type: "text", value: "<html><body>" }],
    [
      { type: "text", value: '  <h1 id="title">' },
      { type: "blank", blankId: "heading" },
      { type: "text", value: "</h1>" },
    ],
    [{ type: "text", value: '  <script src="app.js"></script>' }],
    [{ type: "text", value: "</body></html>" }],
  ],
  correctAnswers: { heading: "Hello" },
  options: ["Hello", "World", "Hi"],
};

const mixedJsTab: CodeEditorTab = {
  id: "app.js",
  label: "app.js",
  type: "fillInCode",
  defaultValue: `// Change the title colour\ndocument.getElementById("title").style.color = "";`,
};

const mixedBrowserTab: CodeEditorTab = {
  id: "browser",
  label: "browser",
  type: "browser",
  html: '<h1 id="title">Hello</h1>',
};

export const MixedHtmlAndJs: Story = {
  args: {
    tabs: [mixedHtmlTab, mixedJsTab, mixedBrowserTab],
    passiveTabsUnlocked: true,
    onAnswerStateChange: fn(),
  },
};

// ===========================================================================
// 5. Simple fill-in-blank (no output tab)
// ===========================================================================

const simpleFillTab: CodeEditorTab = {
  id: "main.py",
  label: "main.py",
  type: "fillInBlankWithOptions",
  lines: [
    [
      { type: "blank", blankId: "kw" },
      { type: "text", value: " greet(name):" },
    ],
    [
      { type: "text", value: "    " },
      { type: "blank", blankId: "ret" },
      { type: "text", value: ' f"Hello, {name}!"' },
    ],
  ],
  correctAnswers: { kw: "def", ret: "return" },
  options: ["def", "return", "class", "yield"],
};

export const SimpleFillInBlank: Story = {
  args: {
    tabs: [simpleFillTab],
    passiveTabsUnlocked: true,
    onAnswerStateChange: fn(),
  },
};

// ===========================================================================
// 6. Fill-in-blank without options (typing)
// ===========================================================================

const typingFillTab: CodeEditorTab = {
  id: "main.py",
  label: "main.py",
  type: "fillInBlankWithoutOptions",
  lines: [
    [
      { type: "blank", blankId: "kw" },
      { type: "text", value: " greet(name):" },
    ],
    [
      { type: "text", value: "    " },
      { type: "blank", blankId: "ret" },
      { type: "text", value: ' f"Hello, {name}!"' },
    ],
  ],
  correctAnswers: { kw: "def", ret: "return" },
};

const typingTerminalTab: CodeEditorTab = {
  id: "terminal",
  label: "terminal",
  type: "terminal",
  lines: ['> python main.py', 'Hello, World!'],
};

export const FillInBlankWithoutOptions: Story = {
  args: {
    tabs: [typingFillTab, typingTerminalTab],
    passiveTabsUnlocked: true,
    onAnswerStateChange: fn(),
  },
};

// ===========================================================================
// 7. Two fillInCode tabs + terminal
// ===========================================================================

const configTab: CodeEditorTab = {
  id: "config.json",
  label: "config.json",
  type: "fillInCode",
  defaultValue: `{\n  "port": 3000\n}`,
};

const serverTab: CodeEditorTab = {
  id: "server.js",
  label: "server.js",
  type: "fillInCode",
  defaultValue: `const cfg = require("./config.json");\nconst http = require("http");\n\nhttp.createServer((req, res) => {\n  res.end("OK");\n}).listen(cfg.port);`,
};

const serverTerminalTab: CodeEditorTab = {
  id: "terminal",
  label: "terminal",
  type: "terminal",
  lines: ["> node server.js", "Server listening on port 3000"],
};

export const TwoFillInCodeTabs: Story = {
  args: {
    tabs: [configTab, serverTab, serverTerminalTab],
    passiveTabsUnlocked: true,
    onAnswerStateChange: fn(),
  },
};
