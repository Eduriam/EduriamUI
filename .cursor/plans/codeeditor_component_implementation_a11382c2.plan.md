---
name: CodeEditor Component Implementation
overview: "Implement the CodeEditor component and related pieces (CodeOptions, FillInCodeExercise, and five window types: fillInBlank, fillInCode, browser, table, terminal) in eduriam-ui-x under the exercise specific directory, aligned with the Figma design (node 645:8170) and integrated with ExerciseStudyBlock for passive-tab behavior on Check."
todos: []
isProject: false
---

# CodeEditor and fill-in-code exercise implementation

## Design reference (Figma 645:8170)

- **Tabs**: Header with tab labels (e.g. "index.html", "browser", "terminal", "output table"); active tab has blue underline (primary color).
- **Content area**: Single panel under tabs; content depends on active tab.
- **Code panels**: JetBrains Mono 16px, code colors from variables (e.g. tag names `#267f99`, angle brackets `#840216`). Use existing theme `code` / `codeButton` typography; code syntax colors can be applied via inline styles or small theme extension if needed.
- **Terminal**: Dark background `#0c0c0c`, green text `#13a10e`, secondary `#ffbb90`, text `#cccccc` (Figma variables: `studySession/terminal/*`). These can live in component-level `sx` until/unless the design system adds studySession palette.
- **Table**: Simple table with header row; scrollable when many columns/rows.
- **Browser**: Rendered HTML in an isolated area (no app CSS).

All new files live under [src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/components/specific/](src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/components/specific/).

---

## 1. Tab and window model

- **Tab config (props)**: Each tab has `id: string`, `label: string`, `type: 'fillInBlank' | 'fillInCode' | 'browser' | 'table' | 'terminal'`, and type-specific payload.
- **Passive tabs**: `browser`, `terminal`, and `table` are “passive” — they are disabled (not clickable) until the user has clicked **Check** in [ExerciseStudyBlock.tsx](src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/ExerciseStudyBlock.tsx). When Check is clicked, the active tab should switch to the first passive tab.

---

## 2. ExerciseStudyBlock and StudyBlockComponent integration

- **New prop**: Add `passiveTabsUnlocked?: boolean` to the component interface used by the exercise block. Source of truth: `passiveTabsUnlocked = (studyBlockState === 'SUBMITTED')` in `ExerciseStudyBlock` (i.e. true after the user has clicked Check).
- **Passing down**: In [ExerciseStudyBlock.tsx](src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/ExerciseStudyBlock.tsx), pass `passiveTabsUnlocked={studyBlockState === 'SUBMITTED'}` into the component that renders the list of block components (e.g. into each `StudyBlockComponent` or a wrapper that provides it to the code exercise).
- **Behavior in CodeEditor**: When `passiveTabsUnlocked` turns from `false` to `true`, switch the active tab to the first tab whose `id` is in the list of passive tab ids (browser / terminal / table). This can be done with a `useEffect` in the component that owns the active tab state (e.g. `FillInCodeExercise` or the parent that renders `CodeEditor`).

Concrete changes:

- Extend [StudyBlockComponent.tsx](src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/components/StudyBlockComponent.tsx) (and its props interface) to accept `passiveTabsUnlocked?: boolean` and pass it to any component that renders the CodeEditor (e.g. the new FillInCodeExercise).
- In [ExerciseStudyBlock.tsx](src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/ExerciseStudyBlock.tsx), pass `passiveTabsUnlocked={studyBlockState === 'SUBMITTED'}` when rendering `StudyBlockComponent`.

---

## 3. CodeEditor (shell component)

- **Location**: e.g. `specific/CodeEditor/CodeEditor.tsx`.
- **Props**:
  - `tabs: Array<{ id: string; label: string; type: TabType; ... }>` (with type-specific fields).
  - `activeTabId: string`, `onActiveTabChange: (id: string) => void` (controlled).
  - `passiveTabIds?: string[]` (ids of browser/terminal/table tabs).
  - `passiveTabsUnlocked?: boolean`.
- **UI**:
  - Tab bar: horizontal list of tab labels; active tab styled with primary underline; tabs whose id is in `passiveTabIds` and `passiveTabsUnlocked === false` are disabled (no click, muted style).
  - Content area: render one of the window components based on `activeTabId` and the tab’s `type` and payload.
- **Styling**: Match Figma (tabs, spacing, border/background for content). For tabs use the Tabs component from eduriam/ui-core.

---

## 4. Window implementations

### 4.1 fillInBlank

- **Content**: One or more lines of “code” where some segments are blanks. Each blank is a [CodeBlank](src/eduriam-ui-x/src/components/study-session/components/shared/CodeBlank/CodeBlank.tsx) (filled/empty driven by parent state). User cannot type; blanks are filled only by choosing options from outside (CodeOptions).
- **Data shape**: Tab config should describe the template (e.g. array of segments: `{ type: 'text', value: string } | { type: 'blank', blankId: string }`). Parent (FillInCodeExercise) holds `filledBlanks: Record<blankId, string>` and passes callbacks so that clicking a blank (when filled) returns the value to the options.
- **Rendering**: Map segments; for `blank` segments render `CodeBlank` with `code={filledBlanks[blankId] ?? placeholder}`, `filled={!!filledBlanks[blankId]}`, `onClick` when filled to “return” the option. Use `Typography` with `variant="code"` (or equivalent) for text segments; optional simple syntax coloring (e.g. tag names) via `sx` using Figma colors.

### 4.2 CodeOptions and FillInCodeExercise

- **CodeOptions**: New component that renders a row of [CodeOptionButton](src/eduriam-ui-x/src/components/study-session/components/shared/CodeOptionButton/CodeOptionButton.tsx)s. Props: `options: string[]`, `selectedIndices` or “which options are currently in the editor” (so we can show them as selected/disabled in the button list), `onSelectOption: (optionIndex: number) => void`. Clicking a button fills the “next” blank (or a specific blank if the UX is defined that way). Reuse existing `CodeOptionButton` with `selected` when the option is currently placed in a blank.
- **FillInCodeExercise**: Wrapper that composes:
  - CodeEditor with a single (or primary) tab of type `fillInBlank`, plus optionally passive tabs (browser/terminal/table) for after Check.
  - CodeOptions below or beside the editor (per Figma/layout).
  - State: `filledBlanks: Record<blankId, string>`, list of “available” options (options not currently in a blank). On option click: move option from available to the next empty blank. On blank click (when filled): move value back to available and clear that blank.
  - Emit `AnswerState`: all blanks filled → compare with correct answers (from tab config) to compute RIGHT/WRONG/NONE; call `onAnswerStateChange` like [FillInSentence](src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/components/specific/FillInSentence/FillInSentence.tsx).
  - Receives `passiveTabsUnlocked` and forwards to CodeEditor; when `passiveTabsUnlocked` becomes true, set active tab to first passive tab (effect).

### 4.3 fillInCode

- **Content**: Editable code area (e.g. `<textarea>` or a simple code-input component) with optional default value. No syntax highlighting required for MVP; monospace, `variant="code"`-style font.
- **Reset**: Bottom-right reset icon button; on click, set content back to default value. Use [IconButton](src/eduriam-ui-core/src/components/inputs/IconButton/IconButton.tsx) from ui-core. If no “restore” icon exists in [iconConfig](src/eduriam-ui-core/src/components/data-display/Icon/iconConfig.ts), add e.g. `restore: { glyph: "restore", variant: "outlined" }` and use it here.
- **Controlled vs uncontrolled**: Prefer controlled `value` + `onChange` so parent can reset or read value.

### 4.4 browser

- **Isolation**: Render HTML (with optional inline CSS/JS) in an **iframe** with `sandbox` and `srcdoc` so parent app CSS does not apply.
- **Security**:
  - Use a restrictive `sandbox` (e.g. `sandbox="allow-same-origin"` only if needed for layout; avoid `allow-scripts` if the content is untrusted, or enable scripts only when content is trusted).
  - Prefer sanitizing HTML (e.g. DOMPurify or a similar lib) before putting it in `srcdoc` if the HTML is user- or backend-defined. If the project does not yet have DOMPurify, add it as a dependency for eduriam-ui-x and sanitize with a policy that allows safe tags and inline styles; strip or restrict script and event handlers unless product explicitly allows them.
- **API**: Tab config: `html: string`, optional `inlineCss?: string`, optional `inlineJs?: string`. Build a full document string and set `srcdoc`. Ensure no external resources load from the host page (use only inline content) to avoid leaking host context.

### 4.5 table

- **Content**: Predefined table: `rows: string[][]` (first row can be header). Render in a scrollable container (`overflow: auto`) so many columns/rows work. Use MUI `Table`, `TableHead`, `TableBody`, `TableRow`, `TableCell` with compact styling to match Figma.

### 4.6 terminal

- **Content**: Predefined output only (no input, no shell). Tab config: `lines: string[]` (or one string split by newlines). Style container like a terminal: dark background, monospace, green (and optionally secondary) text per Figma variables. No interactivity.

---

## 5. Study block type and DTO

- Add `FILL_IN_CODE` (or `CODE_EDITOR_EXERCISE`) to [StudyBlockComponentTypes.ts](src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/components/StudyBlockComponentTypes.ts).
- In [StudyBlockComponentDTO.ts](src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/components/StudyBlockComponentDTO.ts), add a new DTO, e.g. `FillInCodeExerciseComponent`, extending `BaseStudyBlockComponent` with:
  - `type: StudyBlockComponentType.FILL_IN_CODE`
  - Tab list (including fillInBlank template, correct answers for blanks, options; and optional browser/terminal/table configs for passive tabs).
  - Structure that describes blanks (e.g. segment list with blankIds and correct answer per blank).
- In [StudyBlockComponent.tsx](src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/components/StudyBlockComponent.tsx), add a case for the new type that renders `FillInCodeExercise` with the DTO, `onAnswerStateChange`, and `passiveTabsUnlocked`.

---

## 6. File and folder structure (under `specific/`)

- `CodeEditor/` — `CodeEditor.tsx`, types (tab config, window payloads), optional `CodeEditor.stories.tsx`.
- `CodeEditor/windows/` or separate folders per window:
  - `CodeEditorFillInBlank.tsx`, `CodeEditorFillInCode.tsx`, `CodeEditorBrowser.tsx`, `CodeEditorTable.tsx`, `CodeEditorTerminal.tsx` (or single `windows/` folder with these files).
- `CodeOptions/CodeOptions.tsx` (and optional story).
- `FillInCodeExercise/FillInCodeExercise.tsx` — composes CodeEditor + CodeOptions, state, AnswerState, passive-tab handling; optional story.
- Register new component type and DTO as above.

---

## 7. Dependencies

- **DOMPurify** (or equivalent): Add to eduriam-ui-x for sanitizing HTML in the browser window if content is dynamic/untrusted. Choose a version compatible with the project’s React and build setup.
- **Icon**: Add `restore` to eduriam-ui-core `iconConfig` for the fillInCode reset button.

---

## 8. Summary flow (passive tabs and Check)

```mermaid
sequenceDiagram
  participant User
  participant ExerciseStudyBlock
  participant StudyBlockComponent
  participant FillInCodeExercise
  participant CodeEditor

  User->>ExerciseStudyBlock: Clicks Check
  ExerciseStudyBlock->>ExerciseStudyBlock: setStudyBlockState SUBMITTED
  ExerciseStudyBlock->>StudyBlockComponent: passiveTabsUnlocked true
  StudyBlockComponent->>FillInCodeExercise: passiveTabsUnlocked true
  FillInCodeExercise->>FillInCodeExercise: useEffect: set activeTab to first passive tab
  FillInCodeExercise->>CodeEditor: activeTabId, passiveTabsUnlocked
  CodeEditor->>User: Shows browser/terminal/table tab; passive tabs clickable
```

---

## 9. Testing and stories

- Add Storybook stories for: CodeEditor (all tab types), CodeOptions, FillInCodeExercise (with fillInBlank + one passive tab), and optionally for each window in isolation.
- Ensure FillInCodeExercise story passes `passiveTabsUnlocked` and demonstrates tab switch when it flips to true (e.g. via a story control or button that toggles it).

This plan keeps the CodeEditor and all windows in eduriam-ui-x under the requested path, reuses CodeBlank and CodeOptionButton, integrates with ExerciseStudyBlock via `passiveTabsUnlocked` and the new study block type, and addresses security and layout for the browser window.
