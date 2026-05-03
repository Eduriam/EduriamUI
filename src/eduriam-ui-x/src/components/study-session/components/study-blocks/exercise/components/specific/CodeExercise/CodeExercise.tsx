import { KeyboardExtension, LargeButton } from "@eduriam/ui-core";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragCancelEvent,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import Stack from "@mui/material/Stack";
import type { TypographyProps } from "@mui/material/Typography";
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
import CodeBlank from "../../../../../shared/CodeBlank/CodeBlank";
import { getKeyboardSetCharacters } from "../KeyboardExtension/keyboardSets";

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
   * When `true`, the keyboard extension's check button is disabled.
   * Should match the exercise block's main Check button state.
   */
  checkDisabled?: boolean;

  /**
   * Called when the user presses the keyboard extension's check button.
   * Triggers the same action as the main Check button.
   */
  onCheckPress?: () => void;

  /**
   * Callback emitting the current answer state every time the user
   * interacts with the exercise.
   */
  onAnswerStateChange?: (state: AnswerState, userAnswerReport: string) => void;
  dataTest?: CodeExerciseDataTest;
}

export interface CodeExerciseDataTest {
  section?: string;
  resultSection?: string;
  fillInCode?: {
    textField?: string;
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns the `keyboardSet` value for tabs that support it, or `undefined`. */
function getTabKeyboardSet(tab: CodeEditorTab | undefined): string | undefined {
  if (!tab) return undefined;
  if (tab.type === "fillInBlankWithoutOptions" || tab.type === "fillInCode") {
    return tab.keyboardSet;
  }
  return undefined;
}

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

function getOptionDraggableId(tabId: string, optionIndex: number): string {
  return `code-option:${tabId}:${optionIndex}`;
}

function getBlankDroppableId(tabId: string, blankId: string): string {
  return `code-blank:${tabId}:${blankId}`;
}

function getBlankTokenDraggableId(tabId: string, blankId: string): string {
  return `code-blank-token:${tabId}:${blankId}`;
}

function getOptionsPoolDroppableId(tabId: string): string {
  return `code-options-pool:${tabId}`;
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

function buildUserAnswerReport(
  blanks: Record<string, string>,
  codes: Record<string, string>,
): string {
  return JSON.stringify({
    blanks,
    codes,
  });
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
  checkDisabled,
  onCheckPress,
  onAnswerStateChange,
  dataTest,
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
  const [isTypingContextActive, setIsTypingContextActive] = useState(false);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  // ---- Active tab info ----
  const activeTab = tabs.find((t) => t.id === activeTabId);

  /** Active tab when it is a fillInBlankWithOptions variant (shows CodeOptions). */
  const activeFillInBlankWithOptionsTab =
    activeTab?.type === "fillInBlankWithOptions"
      ? (activeTab as FillInBlankWithOptionsTab)
      : null;

  // ---- Keyboard extension ----

  /**
   * Ref to the last focused input or textarea inside the code editor.
   * Used by the keyboard extension to insert characters at the cursor.
   */
  const lastFocusedInputRef = useRef<
    HTMLInputElement | HTMLTextAreaElement | null
  >(null);

  /** Characters to display in the keyboard extension (if any). */
  const keyboardCharacters = useMemo(() => {
    const setKey = getTabKeyboardSet(activeTab);
    if (!setKey) return null;
    return getKeyboardSetCharacters(setKey) ?? null;
  }, [activeTab]);

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
      onAnswerStateChange?.(
        computeAggregateState(states),
        buildUserAnswerReport(blanks, codes),
      );
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
  function placeOptionInBlank(optionIndex: number, targetBlankId?: string) {
    if (!activeFillInBlankWithOptionsTab) return false;

    const tab = activeFillInBlankWithOptionsTab;
    const blankIds = getBlankIds(tab);
    const resolvedTargetBlankId =
      targetBlankId ?? blankIds.find((id) => !filledBlanks[id]);

    if (!resolvedTargetBlankId || !blankIds.includes(resolvedTargetBlankId)) {
      return false;
    }

    const optionValue = tab.options[optionIndex];
    if (optionValue === undefined) {
      return false;
    }

    const nextBlanks = { ...filledBlanks };
    const nextSource = { ...blankSource };

    nextBlanks[resolvedTargetBlankId] = optionValue;
    nextSource[resolvedTargetBlankId] = { tabId: tab.id, optionIndex };

    setFilledBlanks(nextBlanks);
    setBlankSource(nextSource);
    emitState(nextBlanks, codeValues);
    return true;
  }

  function handleSelectOption(optionIndex: number) {
    placeOptionInBlank(optionIndex);
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveDragId(String(event.active.id));
  }

  function applyBlankState(
    nextBlanks: Record<string, string>,
    nextSource: Record<string, { tabId: string; optionIndex: number }>,
  ) {
    setFilledBlanks(nextBlanks);
    setBlankSource(nextSource);
    emitState(nextBlanks, codeValues);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveDragId(null);
    if (!activeFillInBlankWithOptionsTab) return;
    const { active, over } = event;
    if (!over) return;

    const tabId = activeFillInBlankWithOptionsTab.id;
    const activeId = String(active.id);
    const overId = String(over.id);
    const optionPrefix = `code-option:${tabId}:`;
    const blankPrefix = `code-blank:${tabId}:`;
    const blankTokenPrefix = `code-blank-token:${tabId}:`;
    const optionsPoolId = getOptionsPoolDroppableId(tabId);

    if (activeId.startsWith(optionPrefix) && overId.startsWith(blankPrefix)) {
      const optionIndexRaw = activeId.slice(optionPrefix.length);
      const optionIndex = Number(optionIndexRaw);
      if (!Number.isInteger(optionIndex)) return;
      const blankId = overId.slice(blankPrefix.length);
      if (!blankId) return;
      placeOptionInBlank(optionIndex, blankId);
      return;
    }

    if (!activeId.startsWith(blankTokenPrefix)) {
      return;
    }

    const sourceBlankId = activeId.slice(blankTokenPrefix.length);
    if (!sourceBlankId) return;

    if (overId === optionsPoolId) {
      const nextBlanks = { ...filledBlanks };
      const nextSource = { ...blankSource };
      delete nextBlanks[sourceBlankId];
      delete nextSource[sourceBlankId];
      applyBlankState(nextBlanks, nextSource);
      return;
    }

    if (!overId.startsWith(blankPrefix)) {
      return;
    }

    const targetBlankId = overId.slice(blankPrefix.length);
    if (!targetBlankId || targetBlankId === sourceBlankId) return;

    const sourceValue = filledBlanks[sourceBlankId];
    const sourceSource = blankSource[sourceBlankId];
    if (!sourceValue || !sourceSource) return;

    const targetValue = filledBlanks[targetBlankId];
    const targetSource = blankSource[targetBlankId];

    const nextBlanks = { ...filledBlanks };
    const nextSource = { ...blankSource };

    if (!targetValue || !targetSource) {
      nextBlanks[targetBlankId] = sourceValue;
      nextSource[targetBlankId] = sourceSource;
      delete nextBlanks[sourceBlankId];
      delete nextSource[sourceBlankId];
      applyBlankState(nextBlanks, nextSource);
      return;
    }

    nextBlanks[targetBlankId] = sourceValue;
    nextSource[targetBlankId] = sourceSource;
    nextBlanks[sourceBlankId] = targetValue;
    nextSource[sourceBlankId] = targetSource;
    applyBlankState(nextBlanks, nextSource);
  }

  function handleDragCancel(_event: DragCancelEvent) {
    setActiveDragId(null);
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

  /**
   * Capture focus events on any input/textarea inside the editor so we
   * know where to insert characters from the keyboard extension.
   */
  function handleFocusCapture(e: React.FocusEvent) {
    const target = e.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    ) {
      lastFocusedInputRef.current = target;
      setIsTypingContextActive(true);
    }
  }

  /**
   * Hide keyboard extension when focus leaves this component.
   * Keeps it visible while focus moves between inputs/textareas inside it.
   */
  function handleBlurCapture(e: React.FocusEvent) {
    const nextFocused = e.relatedTarget;
    if (
      nextFocused instanceof Node &&
      e.currentTarget.contains(nextFocused)
    ) {
      return;
    }
    setIsTypingContextActive(false);
  }

  /**
   * Insert a character from the keyboard extension at the cursor position
   * of the last focused input / textarea.
   */
  function handleCharacterPress(char: string) {
    const el = lastFocusedInputRef.current;
    if (!el) return;

    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const newValue = el.value.slice(0, start) + char + el.value.slice(end);
    const newCursorPos = start + char.length;

    // Route the updated value through the appropriate handler.
    if (el instanceof HTMLInputElement) {
      const blankId = el.getAttribute("data-blank-id");
      if (blankId) {
        handleBlankChange(blankId, newValue);
      }
    } else if (
      el instanceof HTMLTextAreaElement &&
      activeTab?.type === "fillInCode"
    ) {
      handleCodeValueChange(activeTab.id, newValue);
    }

    // Restore the cursor position after React re-renders.
    requestAnimationFrame(() => {
      el.setSelectionRange(newCursorPos, newCursorPos);
    });
  }

  // ---- Render ----

  const hasHeading = Boolean(assignmentTitle || assignmentDescription);
  const activeDragPreview = useMemo(() => {
    if (!activeDragId || !activeFillInBlankWithOptionsTab) return null;
    const tabId = activeFillInBlankWithOptionsTab.id;
    const optionPrefix = `code-option:${tabId}:`;
    const blankTokenPrefix = `code-blank-token:${tabId}:`;

    if (activeDragId.startsWith(optionPrefix)) {
      const optionIndex = Number(activeDragId.slice(optionPrefix.length));
      if (!Number.isInteger(optionIndex)) return null;
      const label = activeFillInBlankWithOptionsTab.options[optionIndex];
      return label ? { label, source: "option" as const } : null;
    }

    if (activeDragId.startsWith(blankTokenPrefix)) {
      const blankId = activeDragId.slice(blankTokenPrefix.length);
      const label = filledBlanks[blankId];
      return label ? { label, source: "blank" as const } : null;
    }

    return null;
  }, [activeDragId, activeFillInBlankWithOptionsTab, filledBlanks]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  return (
    <Stack
      spacing={4}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      data-test={dataTest?.section}
    >
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
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <CodeEditor
          tabs={tabs}
          activeTabId={activeTabId}
          onActiveTabChange={setActiveTabId}
          passiveTabsUnlocked={passiveTabsUnlocked}
          filledBlanks={filledBlanks}
          onBlankClick={handleBlankClick}
          getBlankDroppableId={(blankId) =>
            getBlankDroppableId(activeTabId, blankId)
          }
          getBlankTokenDraggableId={(blankId) =>
            getBlankTokenDraggableId(activeTabId, blankId)
          }
          dragAndDropEnabled={activeTab?.type === "fillInBlankWithOptions"}
          onBlankChange={handleBlankChange}
          codeValues={codeValues}
          onCodeValueChange={handleCodeValueChange}
          dataTest={{
            resultSection: dataTest?.resultSection,
            fillInCode: {
              textField: dataTest?.fillInCode?.textField,
            },
          }}
        />
        {activeFillInBlankWithOptionsTab && (
          <CodeOptions
            options={activeFillInBlankWithOptionsTab.options}
            selectedIndices={selectedIndices}
            onSelectOption={handleSelectOption}
            getOptionDraggableId={(optionIndex) =>
              getOptionDraggableId(activeFillInBlankWithOptionsTab.id, optionIndex)
            }
            optionsPoolDroppableId={getOptionsPoolDroppableId(activeFillInBlankWithOptionsTab.id)}
          />
        )}
        <DragOverlay zIndex={4000} dropAnimation={null}>
          {activeDragPreview?.source === "option" ? (
            <LargeButton
              variant="outlined"
              color="textPrimary"
              fullWidth={false}
            >
              <Typography variant={"codeButton" as TypographyProps["variant"]}>
                {activeDragPreview.label}
              </Typography>
            </LargeButton>
          ) : null}
          {activeDragPreview?.source === "blank" ? (
            <CodeBlank code={activeDragPreview.label} />
          ) : null}
        </DragOverlay>
      </DndContext>
      {keyboardCharacters && isTypingContextActive && (
        <KeyboardExtension
          characters={[...keyboardCharacters]}
          variant="standard"
          onCharacterPress={handleCharacterPress}
          onCheckPress={onCheckPress}
          checkDisabled={checkDisabled}
        />
      )}
    </Stack>
  );
};

export default CodeExercise;
