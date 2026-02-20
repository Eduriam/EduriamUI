---
name: study-session-page-transitions
overview: Implement swipe/arrow navigation with animated transitions between study session exercises, enhanced progress bar semantics, and completed-exercise drawer behavior.
todos:
  - id: state-wiring
    content: Extend StudySession state to track per-exercise completion, furthestCompletedIndex, and a goToIndex helper using transition directions.
    status: completed
  - id: transitions
    content: Integrate a transition hook (based on useOnboardingStepTransition) into StudySession and connect it with the globals.css slide animations or fallbacks.
    status: completed
  - id: mobile-swipe
    content: Implement mobile swipe detection to move between already-completed exercises with appropriate transition directions.
    status: completed
  - id: desktop-arrows
    content: Create StudySessionNavigationButton and desktop hover zones for previous/next navigation among completed exercises.
    status: completed
  - id: drawer-completed
    content: Ensure StudySessionDrawer auto-shows with the stored result when revisiting a completed exercise, blocking page interactions.
    status: completed
  - id: progress-bar
    content: Redesign StudySessionProgressBar as a multi-step indicator using primary.main for current and primary.light for completed exercises, and update stories.
    status: completed
  - id: docs-and-types
    content: Update TSDoc and Storybook stories for new navigation and progress bar behavior.
    status: completed
isProject: false
---

### Goals

- **Add animated transitions** between study session exercises, reusing the onboarding transition pattern.
- **Enable navigation**: mobile swipe (left/right) and desktop hover/arrow buttons.
- **Enhance the progress bar** to distinguish the current exercise vs. completed ones.
- **Show StudySessionDrawer automatically** on already-completed exercises and block underlying interaction.

### Key Files to Touch

- **StudySession container**: `[src/eduriam-ui-x/src/components/study-session/StudySession.tsx]` – manage step index, completion state, navigation, transitions, and drawer behavior.
- **Exercise block**: `[src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/ExerciseStudyBlock.tsx]` – optionally accept read-only/disabled state once a block is completed.
- **Progress bar wrapper**: `[src/eduriam-ui-x/src/components/study-session/components/StudySessionProgressBar/StudySessionProgressBar.tsx]` – change from a single linear percentage to a multi-step visual reflecting current vs. completed exercises.
- **New navigation buttons**: create `StudySessionNavigationButton` (and possibly a small wrapper) under `[src/eduriam-ui-x/src/components/study-session/components/StudySessionNavigationButton/]`.
- **Transition utilities**: either reuse or adapt the hook from `[examples/useOnboardingStepTransition.ts]` for numeric step indices.
- **Global CSS / transitions**: ensure the slide-left/right animation from `[examples/globals.css]` is hooked into the StudySession transitions (via `data-transition-direction` and/or view transitions).

### High-Level Design

- **State & model extensions in StudySession**
  - Track **currentIndex** (existing `index`), plus a new **furthestCompletedIndex** that represents the highest index the user has fully completed.
  - Track a **per-exercise completion map** (e.g. `completedResults: Map<number, AnswerState>`) keyed by queue index, or a thin wrapper structure that keeps both the block and its status.
  - Update `handleContinue` to:
    - Store the `AnswerState` for the current index.
    - Update `furthestCompletedIndex` to `Math.max(furthestCompletedIndex, index)`.
    - Reschedule wrong answers at the end of the queue (preserving existing behavior).
    - Call a new `goToIndex(nextIndex, direction)` helper that wraps index changes in a transition.
- **Transition wiring**
  - Create a small **transition helper** hook (e.g. `useStudySessionTransition`) that internally reuses `useOnboardingStepTransition<"step-0" | ...>` or a simplified variant for numbers.
  - Inside `StudySession`, use this helper to obtain `transitionStep` and `transitionDirection` and expose them to the layout.
  - On index change, wrap the state update in `document.startViewTransition` when available, and set `document.documentElement.dataset.transitionDirection` to `"forward"` or `"back"` so that the `globals.css` animations apply on mobile.
  - Apply direction-aware classNames or data attributes on the main `Stack` if needed as a fallback when the View Transitions API is not supported.
- **Mobile swipe navigation**
  - On the main `Stack` or an inner full-screen `Box`, attach **pointer/touch handlers**:
    - Track touch start X and end X.
    - If horizontal distance exceeds a threshold (e.g. 50px) and is larger than vertical movement:
      - Swipe **left → forward**: if `index < furthestCompletedIndex` and not on the last completed entry, call `goToIndex(index + 1, "forward")`.
      - Swipe **right → back**: if `index > 0`, call `goToIndex(index - 1, "back")`.
  - Guard swipe navigation so it **only moves among completed exercises**; the first time forward is still via the Continue button, per your answer.
- **Desktop hover/arrow navigation**
  - Detect desktop with the existing `desktop` flag (from `useMediaQuery(theme.breakpoints.up("md"))`).
  - Create `StudySessionNavigationButton`:
    - Likely based on `IconButton` from `@eduriam/ui-core` with larger size and subtle background.
    - Props: `direction` ("prev" | "next"), `onClick`, maybe `disabled`, and `data-test`.
  - In `StudySession`, render **left/right hover zones** only on desktop:
    - Use `Box` elements that cover ~100px from the left and right edges of the viewport (`position: fixed; top: 0; bottom: 0; left: 0; width: 100px`, mirrored on the right).
    - Within each zone, show the `StudySessionNavigationButton` when hovered (using local `hoverLeft`/`hoverRight` state or CSS `:hover` nesting).
    - Clicking the left button navigates to `goToIndex(index - 1, "back")` (if `index > 0`).
    - Clicking the right button navigates to `goToIndex(index + 1, "forward")` but only when `index < furthestCompletedIndex` so users can’t skip unattempted exercises.
- **StudySessionDrawer behavior for completed exercises**
  - Extend the completion map to store the final **correct/incorrect** result per index.
  - When navigating **forward via Continue**:
    - Set `drawerVariant` from the result as today.
    - When the user clicks Continue in the drawer, call `handleContinue` which moves to the next index with a **forward** transition.
  - When navigating **back to an already-completed exercise** (via swipe/arrow):
    - Look up the stored result for that index.
    - If present, immediately set `checkedResult` and `drawerVariant` to that prior result so the drawer appears again.
    - Do **not** re-trigger `onCheck` / re-evaluation; just display the previous outcome.
  - While the drawer is open, rely on the `Drawer` backdrop to block interaction; no extra changes should be needed to prevent clicks on the underlying page.
- **ExerciseStudyBlock integration**
  - Optionally add a `readOnly` or `disabled` prop to `ExerciseStudyBlock` and pass it down to child components when showing an already-completed exercise, so that inputs visually appear non-interactive.
  - Initially we can keep interactions enabled but functionally blocked by the drawer; if UX requires visible disabled state, we can refine this later.
- **Progress bar redesign**
  - Replace the simple `ProgressNavbar` usage in `StudySessionProgressBar` with a **study-session–specific multi-step indicator** while keeping the same story and public surface minimal.
  - Update `IStudySessionProgressBar` props to something like:
    - `currentIndex: number` – the index the user is currently viewing.
    - `furthestCompletedIndex: number` – last completed index.
    - `total: number` – total number of steps (e.g. `studyBlockQueue.length`).
    - `onExit: () => void` (unchanged).
  - Implement the visual as a row of small segments or dots, each representing an exercise:
    - For indices `< currentIndex` and `<= furthestCompletedIndex`: color `primary.light`.
    - For `index === currentIndex`: color `primary.main`.
    - For indices `> furthestCompletedIndex`: a neutral/background color.
  - Use theme palette tokens via `sx` to ensure colors are pulled from `theme.palette.primary.main` and `theme.palette.primary.light`.
  - Update `StudySession.tsx` to pass the new props instead of a single `progressValue`.
- **Storybook and tests**
  - Update `StudySessionProgressBar.stories.tsx` to reflect the new props and demonstrate:
    - Base state with some completed steps and a current in the middle.
    - Edge cases: first step as current, last step as current, all uncompleted.
  - Optionally add a `StudySession` story that walks through multiple exercises to visually verify the transitions, progress bar coloring, and navigation buttons.
- **Type & TSDoc updates**
  - Add or update TSDoc for:
    - New `StudySessionNavigationButton` component and props.
    - Extended `StudySessionProgressBar` props, explaining how `currentIndex` and `furthestCompletedIndex` map to colors.
    - Any new hooks (e.g. `useStudySessionTransition`), briefly documenting how they tie into the global view-transition CSS.

### Implementation Todos

- **state-wiring**: Extend `StudySession` state with completion tracking, `furthestCompletedIndex`, and a `goToIndex` helper that uses transition direction.
- **transitions**: Integrate a transition hook (based on `useOnboardingStepTransition`) and wire it to index changes and `globals.css` view-transition rules.
- **mobile-swipe**: Implement swipe detection on mobile to navigate among completed exercises only.
- **desktop-arrows**: Implement `StudySessionNavigationButton` and desktop-only hover zones for prev/next navigation among completed exercises.
- **drawer-completed**: Make `StudySessionDrawer` automatically appear (using stored results) when navigating back to completed exercises, blocking underlying interaction.
- **progress-bar**: Redesign `StudySessionProgressBar` as a multi-step indicator using `primary.main` for current and `primary.light` for completed exercises, and update its stories.
- **docs-and-types**: Update TSDoc and Storybook stories to document the new behavior and props clearly.
