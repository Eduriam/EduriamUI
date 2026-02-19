---
name: study-session-stats-screen
overview: Implement a StudySessionStats screen and subcomponents that render at the end of a study session, computing XP, time studied, correct answer rate, and distinct concepts from the study session data.
todos:
  - id: define-xp-config
    content: Create StudySessionStatsConfig with XP_PER_EXERCISE exported and ready for reuse in StudySession and stats components.
    status: pending
  - id: compute-extended-stats
    content: Augment StudySession completion logic to compute XP, time studied, correct rate, and distinct concepts (plus optional per-concept breakdown) without breaking the existing onFinish API.
    status: pending
  - id: implement-stats-subcomponents
    content: Implement four stats subcomponents in StudySessionStats folder matching the Figma designs with proper props and TSDoc comments.
    status: pending
  - id: implement-studysessionstats-screen
    content: Implement the top-level StudySessionStats component that composes the subcomponents into the final stats page layout and supports actions like exit/continue.
    status: pending
  - id: integrate-into-studysession
    content: Integrate StudySessionStats into StudySession so it renders at the end of a session as a separate top-level section before the progress bar/exercise UI.
    status: pending
  - id: add-storybook-coverage
    content: Add Storybook stories for StudySessionStats and, if practical, extend StudySession stories to demonstrate the stats screen state.
    status: pending
isProject: false
---

## Goals

- **Render a dedicated `StudySessionStats` screen** at the end of each study session, shown inside `StudySession` but visually separate from the existing progress bar and exercise layout.
- **Implement reusable stats subcomponents** in `src/eduriam-ui-x/src/components/study-session/components/StudySessionStats/` matching the four provided Figma designs.
- **Compute stats consistently** (XP, time studied, correct answer rate, and distinct concepts based on `atomId`s) using existing `StudySession` data and a shared XP config constant.

## Key Files Involved

- **Existing**
  - `[src/eduriam-ui-x/src/components/study-session/StudySession.tsx](src/eduriam-ui-x/src/components/study-session/StudySession.tsx)` – main study session flow, completion logic, and basic stats (correct/incorrect counts, atom ratings).
  - `[src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/ExerciseStudyBlock.tsx](src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/ExerciseStudyBlock.tsx)` – exercise evaluation and `onCheck` behavior.
  - `[src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/components/StudyBlockComponentDTO.ts](src/eduriam-ui-x/src/components/study-session/components/study-blocks/exercise/components/StudyBlockComponentDTO.ts)` – `StudyBlockComponentDTO` and `atomId` usage.
  - `[src/eduriam-ui-x/src/components/study-session/types/StudySessionDTO.ts](src/eduriam-ui-x/src/components/study-session/types/StudySessionDTO.ts)` – shape of the study session (list of `studyBlocks`).
- **New / Updated**
  - `[src/eduriam-ui-x/src/components/study-session/components/StudySessionStats/StudySessionStats.tsx](src/eduriam-ui-x/src/components/study-session/components/StudySessionStats/StudySessionStats.tsx)` – top-level stats screen component.
  - Additional subcomponents in the same folder (one per Figma design) such as `SummaryHeader`, `StatsGrid`, `XpProgressCard`, and `ConceptsList` (final names chosen to match the UI more closely once implemented).
  - `[src/eduriam-ui-x/src/components/study-session/components/StudySessionStats/StudySessionStatsConfig.ts](src/eduriam-ui-x/src/components/study-session/components/StudySessionStats/StudySessionStatsConfig.ts)` – shared XP configuration constant.

## Data & Computation Strategy

- **XP computation**
  - Add a small config module that exports `XP_PER_EXERCISE = 10`.
  - In `StudySession`, compute the total number of **unique exercise blocks** from the original `studySession.studyBlocks` array (do not count rescheduled/repeated attempts) and derive total XP as `XP_PER_EXERCISE * exerciseCount`.
- **Time studied**
  - In `StudySession`, track a `startedAt` timestamp when the component mounts (or when the first block is ready) using `useRef` or `useState`.
  - On session completion (when the last exercise is finished), compute `timeStudiedMs = now - startedAt` and pass it to the stats screen.
- **Correct answer rate**
  - Reuse the existing `evaluateStats` logic which already accumulates `correctAnswerCount` and `incorrectAnswerCount` across atoms.
  - Derive `totalAnswers = correct + incorrect` and `correctRate = totalAnswers > 0 ? correct / totalAnswers : 0` for display.
- **Concepts (distinct atomIds)**
  - From `studySession.studyBlocks`, build a `Set` of `atomId` values to compute `conceptCount`.
  - Optionally derive a per-concept summary, e.g. each atom with its correct/incorrect counts and relative progress, to support concept-level cards or lists in `StudySessionStats`.

## UI & Component Structure

- **Top-level `StudySessionStats` component**
  - Props: aggregated stats (XP, time studied, correct/incorrect counts, correct rate, concept count, per-concept breakdown) plus callbacks like `onExit` and optionally `onRestart` if needed.
  - Layout: full-page stack or container that matches the Figma design for the final stats page (large title, summary chips/cards, XP section, concepts section, action buttons).
  - Use existing design system primitives from `@eduriam/ui-core` (e.g., `ContentContainer`, typography, buttons, cards) to stay consistent with the rest of the project.
- **Stats subcomponents (4 Figma nodes)**
  - Implement four reusable visual components in the `StudySessionStats` folder, each corresponding to one of the provided Figma designs (for example: an XP summary card, a grid of key metrics, a progress/level visualization, and a concepts list or leaderboard).
  - Each subcomponent should accept typed props (with TSDoc) and be composable so they can be arranged together to form the full stats page layout from the `StudySessionStats` component.
  - Ensure responsive behavior similar to other study session components (e.g., using MUI `Stack`, `Grid`, and theme breakpoints).

## Integration into `StudySession`

- **Render placement**
  - Update the `StudySession` render logic so that when `finishedSession` is `true`, it **renders `StudySessionStats` at the top level of the component**, instead of the progress bar and exercise content.
  - Keep the outer `StudySessionAudioProvider` and root `Stack`, but branch the inner JSX to either the existing in-session layout or the final stats screen.
- **Completion flow**
  - When finishing the last exercise, compute:
    - `studyStats` (existing correct/incorrect counts via `evaluateStats`).
    - `atomProgressRatings` (via `computeAtomRatings`, unchanged).
    - New derived fields: `totalXp`, `timeStudiedMs`, `correctRate`, `conceptCount`, and optional per-concept stats.
  - Call `onFinish(studyStats, atomProgressRatings)` as it works today (preserving the external API), and in parallel set internal state necessary to render `StudySessionStats` with enriched stats.

## Testing & Storybook

- **Stories for `StudySessionStats`**
  - Add a co-located Storybook story file for `StudySessionStats` showing a realistic example of the stats screen with mock data.
  - Cover different scenarios: high accuracy, low accuracy, short vs. long study time, small vs. large number of concepts.
- **Extend `StudySession` stories**
  - Optionally add or adjust a `StudySession` Storybook story to simulate a finished study session that shows the stats screen (e.g., by mocking `onFinish` and/or controlling internal state if practical).

## Potential Edge Cases

- **No exercises or no answers submitted**
  - Handle `totalAnswers === 0` gracefully by showing 0% correct rate and still computing XP as 0 (since there are no exercise blocks).
- **Very short or very long sessions**
  - Format `timeStudiedMs` into human-readable minutes/seconds and clamp or format large durations nicely.
- **UI resilience**
  - Ensure the layout degrades gracefully on small screens and respects the existing `ContentContainer` width constraints.
