---
alwaysApply: true
---

# Project Structure and Naming Conventions

This document describes the directory structure of the project and its naming conventions.

## Naming conventions

Directories use **kebab-case**, except component folders which use **PascalCase**

## Components

- One component per folder using PascalCase naming convention
- Inside each component folder:
  - `<Name>.tsx`: component implementation
  - `index.ts`: re-exports for convenient imports
  - `<Name>.stories.tsx`: co-located Storybook story with interaction tests

## Component documentation

To make the design system easy to use for AI agents and humans, document each exported component in `@eduriam/ui-core` at the type level:

- **Props interfaces**
  - Add a TSDoc block (`/** ... */`) above each exported `XxxProps` interface.
  - Describe what the component is used for and what each custom prop means.
  - Call out allowed values and defaults for string unions and enums.
  - Mention when props are forwarded to an underlying MUI component instead of re‑documenting standard behavior.

- **Component declarations**
  - Add a TSDoc block above each exported component (`export const Xxx`, `export function Xxx`, or `export { theme }`).
  - Briefly explain when to use this component instead of raw MUI.
  - Note important layout or behavioral assumptions (e.g. full‑width, page‑level layout, navigation, etc.).
  - Keep comments concise but explicit so AI agents can infer intent and usage.

- **Stories as executable docs**
  - Every exported component must have a co‑located Storybook story file (`<Name>.stories.tsx`).
  - The `Default` story should demonstrate the recommended usage that matches the TSDoc comments.
  - Additional stories should cover meaningful states and variants rather than every prop permutation.

## Theme tokens

Define tokens in the `theme/` directory.

## Storybook

Story file is co-located with components. The story title should correspond with the story path (e.g. `core/inputs/LargeButton`).

When defining Stories, use Storybook "control" feature with all the options when there are limited options available. For example for button size you should define control with options "small", "medium" and "large". Do this instead of defining stories for every permutation of the props.
