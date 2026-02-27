import { Tabs } from "@eduriam/ui-core";

import React, { useMemo } from "react";

import Box from "@mui/material/Box";

import type { CodeEditorTab } from "./CodeEditorTypes";
import { PASSIVE_TAB_TYPES } from "./CodeEditorTypes";
import { CodeEditorBrowser } from "./windows/CodeEditorBrowser";
import type { CodeEditorFillInBlankWithOptionsProps } from "./windows/CodeEditorFillInBlankWithOptions";
import { CodeEditorFillInBlankWithOptions } from "./windows/CodeEditorFillInBlankWithOptions";
import type { CodeEditorFillInBlankWithoutOptionsProps } from "./windows/CodeEditorFillInBlankWithoutOptions";
import { CodeEditorFillInBlankWithoutOptions } from "./windows/CodeEditorFillInBlankWithoutOptions";
import { CodeEditorFillInCode } from "./windows/CodeEditorFillInCode";
import { CodeEditorTable } from "./windows/CodeEditorTable";
import { CodeEditorTerminal } from "./windows/CodeEditorTerminal";

export interface CodeEditorDataTest {
  resultSection?: string;
  fillInCode?: {
    textField?: string;
  };
}

export interface CodeEditorProps {
  /** Tab definitions for the editor. */
  tabs: CodeEditorTab[];

  /** Currently active tab id. */
  activeTabId: string;

  /** Called when the user selects a different tab. */
  onActiveTabChange: (id: string) => void;

  /**
   * When `false`, passive tabs (browser / table / terminal) are disabled.
   * When `true`, they become clickable.
   *
   * @default false
   */
  passiveTabsUnlocked?: boolean;

  // ---- fillInBlankWithOptions window props ----

  /** Map from blankId to the filled value. */
  filledBlanks?: CodeEditorFillInBlankWithOptionsProps["filledBlanks"];

  /** Called when a filled blank is clicked to remove its value. */
  onBlankClick?: CodeEditorFillInBlankWithOptionsProps["onBlankClick"];

  // ---- fillInBlankWithoutOptions window props ----

  /** Called when the user types in a blank (without-options variant). */
  onBlankChange?: CodeEditorFillInBlankWithoutOptionsProps["onBlankChange"];

  // ---- fillInCode window props (per-tab) ----

  /** Map from tab id to the current code value for fillInCode tabs. */
  codeValues?: Record<string, string>;

  /** Called when the user edits code in a fillInCode tab. */
  onCodeValueChange?: (tabId: string, value: string) => void;
  dataTest?: CodeEditorDataTest;
}

/**
 * Code-editor shell with a tab bar and switchable content panes.
 *
 * Each tab corresponds to a different "window" type
 * (fillInBlankWithOptions, fillInBlankWithoutOptions, fillInCode,
 * browser, table, terminal). Passive tabs (browser, table, terminal)
 * are disabled until `passiveTabsUnlocked` is `true`.
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({
  tabs,
  activeTabId,
  onActiveTabChange,
  passiveTabsUnlocked = false,
  filledBlanks = {},
  onBlankClick,
  onBlankChange,
  codeValues = {},
  onCodeValueChange,
  dataTest,
}) => {
  // Build tabs config for the Tabs component.
  const tabItems = useMemo(
    () =>
      tabs.map((tab) => ({
        label: tab.label,
        value: tab.id,
        disabled: PASSIVE_TAB_TYPES.has(tab.type) && !passiveTabsUnlocked,
      })),
    [tabs, passiveTabsUnlocked],
  );

  const activeTab = tabs.find((t) => t.id === activeTabId);

  function renderWindow() {
    if (!activeTab) return null;

    switch (activeTab.type) {
      case "fillInBlankWithOptions":
        return (
          <CodeEditorFillInBlankWithOptions
            lines={activeTab.lines}
            filledBlanks={filledBlanks}
            onBlankClick={onBlankClick}
            language={activeTab.language}
          />
        );

      case "fillInBlankWithoutOptions":
        return (
          <CodeEditorFillInBlankWithoutOptions
            lines={activeTab.lines}
            filledBlanks={filledBlanks}
            onBlankChange={onBlankChange}
            language={activeTab.language}
          />
        );

      case "fillInCode":
        return (
          <CodeEditorFillInCode
            value={codeValues[activeTab.id] ?? activeTab.defaultValue ?? ""}
            onChange={(val) => onCodeValueChange?.(activeTab.id, val)}
            defaultValue={activeTab.defaultValue}
            language={activeTab.language}
            dataTest={dataTest?.fillInCode}
          />
        );

      case "browser":
        return (
          <CodeEditorBrowser
            html={activeTab.html}
            inlineCss={activeTab.inlineCss}
            inlineJs={activeTab.inlineJs}
            dataTest={
              passiveTabsUnlocked ? dataTest?.resultSection : undefined
            }
          />
        );

      case "table":
        return (
          <CodeEditorTable
            rows={activeTab.rows}
            dataTest={
              passiveTabsUnlocked ? dataTest?.resultSection : undefined
            }
          />
        );

      case "terminal":
        return (
          <CodeEditorTerminal
            lines={activeTab.lines}
            language={activeTab.language}
            dataTest={
              passiveTabsUnlocked ? dataTest?.resultSection : undefined
            }
          />
        );

      default:
        return null;
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        minHeight: 200,
      }}
    >
      <Tabs
        tabs={tabItems}
        value={activeTabId}
        onChange={(val) => onActiveTabChange(val as string)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          borderTop: 1,
          borderColor: "divider",
          minHeight: 150,
        }}
      >
        {renderWindow()}
      </Box>
    </Box>
  );
};

export default CodeEditor;
