import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { AnswerState } from "../../../../../../types/AnswerState";
import { CodeEditor } from "../CodeEditor/CodeEditor";
import type {
  CodeEditorTab,
  FillInBlankTab,
  FillInBlankWithOptionsTab,
  FillInCodeTab,
} from "../CodeEditor/CodeEditorTypes";
import { PASSIVE_TAB_TYPES } from "../CodeEditor/CodeEditorTypes";
import { CodeOptions } from "../CodeOptions/CodeOptions";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface CodeExerciseProps {
  /** All tabs to display in the code editor. */
  tabs: CodeEditorTab[];

  /**
   * Optional assignment title shown above the editor (bold heading).
   * When set, use with assignmentDescription for title + question layout.
   */
  assignmentTitle?: string;

  /**
   * Optional assignment description / question shown above the editor.
   * With assignmentTitle: shown as secondary text; without: shown as main heading.
   */
  assignmentDescription?: string;

  /**
   * Whether passive tabs (browser / table / terminal) are unlocked.
   * Becomes `true` after the user clicks "Check" in the exercise block.
   *
   * @default false
   */
  passiveTabsUnlocked?: boolean;

  /**
   * Callback emitting the current answer state every time the user
   * interacts with the exercise.
   */
  onAnswerStateChange?: (state: AnswerState) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns an ordered list of blank ids from a fillInBlank tab. */
function getBlankIds(tab: FillInBlankTab): string[] {
  const ids: string[] = [];
  for (const line of tab.lines) {
    for (const seg of line) {
      if (seg.type === "blank") ids.push(seg.blankId);
    }
  }
  return ids;
}

// ---------------------------------------------------------------------------
// Per-tab answer state evaluation
// ---------------------------------------------------------------------------

function evaluateFillInBlankTab(
  tab: FillInBlankTab,
  filledBlanks: Record<string, string>,
): AnswerState {
  const blankIds = getBlankIds(tab);
  let allFilled = true;
  let allCorrect = true;

  for (const id of blankIds) {
    const value = filledBlanks[id];
    if (!value) {
      allFilled = false;
      allCorrect = false;
    } else if (value !== tab.correctAnswers[id]) {
      allCorrect = false;
    }
  }

  if (!allFilled) return "NONE";
  return allCorrect ? "RIGHT" : "WRONG";
}

function evaluateFillInCodeTab(
  tab: FillInCodeTab,
  codeValue: string,
): AnswerState {
  const trimmed = codeValue.trim();
  if (trimmed === "") return "NONE";
  if (tab.correctAnswer !== undefined) {
    return trimmed === tab.correctAnswer.trim() ? "RIGHT" : "WRONG";
  }
  // No correctAnswer → any non-empty value counts as RIGHT.
  return "RIGHT";
}

function computeAggregateState(states: AnswerState[]): AnswerState {
  if (states.length === 0) return "NONE";
  if (states.some((s) => s === "NONE")) return "NONE";
  if (states.some((s) => s === "WRONG")) return "WRONG";
  return "RIGHT";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * General-purpose code exercise wrapper.
 *
 * Composes a `CodeEditor` with any combination of interactive and passive
 * tabs. `CodeOptions` are shown only when the active tab is a
 * `fillInBlankWithOptions` tab (using that tab's own option list).
 * `fillInBlankWithoutOptions` tabs let the user type answers directly.
 *
 */
export const CodeExercise: React.FC<CodeExerciseProps> = ({
  tabs,
  assignmentTitle,
  assignmentDescription,
  passiveTabsUnlocked = false,
  onAnswerStateChange,
}) => {
  // ---- Derived: interactive tabs ----
  const fillInBlankTabs = useMemo(
    () =>
      tabs.filter(
        (t): t is FillInBlankTab =>
          t.type === "fillInBlankWithOptions" ||
          t.type === "fillInBlankWithoutOptions",
      ),
    [tabs],
  );
  const fillInCodeTabs = useMemo(
    () => tabs.filter((t): t is FillInCodeTab => t.type === "fillInCode"),
    [tabs],
  );

  // ---- State ----
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id ?? "");

  // Shared across all fillInBlank tabs (blank IDs are globally unique).
  const [filledBlanks, setFilledBlanks] = useState<Record<string, string>>({});

  // Tracks which option index on which tab was placed into which blank.
  // blankId → { tabId, optionIndex }
  const [blankSource, setBlankSource] = useState<
    Record<string, { tabId: string; optionIndex: number }>
  >({});

  // Per-fillInCode-tab code values.
  const [codeValues, setCodeValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const tab of tabs) {
      if (tab.type === "fillInCode") {
        initial[tab.id] = tab.defaultValue ?? "";
      }
    }
    return initial;
  });

  // ---- Active tab info ----
  const activeTab = tabs.find((t) => t.id === activeTabId);

  /** Active tab when it is a fillInBlankWithOptions variant (shows CodeOptions). */
  const activeFillInBlankWithOptionsTab =
    activeTab?.type === "fillInBlankWithOptions"
      ? (activeTab as FillInBlankWithOptionsTab)
      : null;

  // ---- Compute selected option indices for the active fillInBlankWithOptions tab ----
  const selectedIndices = useMemo(() => {
    if (!activeFillInBlankWithOptionsTab) return new Set<number>();
    const indices = new Set<number>();
    for (const entry of Object.values(blankSource)) {
      if (entry.tabId === activeFillInBlankWithOptionsTab.id) {
        indices.add(entry.optionIndex);
      }
    }
    return indices;
  }, [activeFillInBlankWithOptionsTab, blankSource]);

  // ---- Answer state ----
  const emitState = useCallback(
    (blanks: Record<string, string>, codes: Record<string, string>) => {
      const states: AnswerState[] = [];
      for (const tab of fillInBlankTabs) {
        states.push(evaluateFillInBlankTab(tab, blanks));
      }
      for (const tab of fillInCodeTabs) {
        states.push(evaluateFillInCodeTab(tab, codes[tab.id] ?? ""));
      }
      onAnswerStateChange?.(computeAggregateState(states));
    },
    [fillInBlankTabs, fillInCodeTabs, onAnswerStateChange],
  );

  // ---- Auto-switch to first passive tab on unlock ----
  const prevUnlockedRef = useRef(passiveTabsUnlocked);
  useEffect(() => {
    if (passiveTabsUnlocked && !prevUnlockedRef.current) {
      const firstPassive = tabs.find((t) => PASSIVE_TAB_TYPES.has(t.type));
      if (firstPassive) {
        setActiveTabId(firstPassive.id);
      }
    }
    prevUnlockedRef.current = passiveTabsUnlocked;
  }, [passiveTabsUnlocked, tabs]);

  // ---- Handlers ----

  /** User clicked an option button on the active fillInBlankWithOptions tab. */
  function handleSelectOption(optionIndex: number) {
    if (!activeFillInBlankWithOptionsTab) return;
    const blankIds = getBlankIds(activeFillInBlankWithOptionsTab);
    const nextEmpty = blankIds.find((id) => !filledBlanks[id]);
    if (!nextEmpty) return;

    const newBlanks = {
      ...filledBlanks,
      [nextEmpty]: activeFillInBlankWithOptionsTab.options[optionIndex],
    };
    const newSource = {
      ...blankSource,
      [nextEmpty]: { tabId: activeFillInBlankWithOptionsTab.id, optionIndex },
    };

    setFilledBlanks(newBlanks);
    setBlankSource(newSource);
    emitState(newBlanks, codeValues);
  }

  /** User clicked a filled blank to remove its value. */
  function handleBlankClick(blankId: string) {
    const newBlanks = { ...filledBlanks };
    delete newBlanks[blankId];

    const newSource = { ...blankSource };
    delete newSource[blankId];

    setFilledBlanks(newBlanks);
    setBlankSource(newSource);
    emitState(newBlanks, codeValues);
  }

  /** User typed in a blank (fillInBlankWithoutOptions). */
  function handleBlankChange(blankId: string, value: string) {
    const newBlanks = { ...filledBlanks, [blankId]: value };
    setFilledBlanks(newBlanks);
    emitState(newBlanks, codeValues);
  }

  /** User typed in a fillInCode tab. */
  function handleCodeValueChange(tabId: string, value: string) {
    const newCodes = { ...codeValues, [tabId]: value };
    setCodeValues(newCodes);
    emitState(filledBlanks, newCodes);
  }

  // ---- Render ----

  const hasHeading = Boolean(assignmentTitle || assignmentDescription);

  return (
    <Stack spacing={4}>
      {hasHeading ? (
        assignmentTitle ? (
          <>
            <Typography variant="h5" fontWeight={700}>
              {assignmentTitle}
            </Typography>
            {assignmentDescription ? (
              <Typography variant="body1" color="text.secondary">
                {assignmentDescription}
              </Typography>
            ) : null}
          </>
        ) : (
          <Typography variant="h5">{assignmentDescription}</Typography>
        )
      ) : null}
      <CodeEditor
        tabs={tabs}
        activeTabId={activeTabId}
        onActiveTabChange={setActiveTabId}
        passiveTabsUnlocked={passiveTabsUnlocked}
        filledBlanks={filledBlanks}
        onBlankClick={handleBlankClick}
        onBlankChange={handleBlankChange}
        codeValues={codeValues}
        onCodeValueChange={handleCodeValueChange}
      />
      {activeFillInBlankWithOptionsTab && (
        <CodeOptions
          options={activeFillInBlankWithOptionsTab.options}
          selectedIndices={selectedIndices}
          onSelectOption={handleSelectOption}
        />
      )}
    </Stack>
  );
};

export default CodeExercise;
