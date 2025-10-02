# Project Requirement

This document describes how the setup of the project should look and the individual tasks.

## Project overview

We are creating a React component libraries on top of Material UI

- There will be a "core" library which will define the types, interfaces, components and default configurations. This library will be a npm package.
  - This library should provide interfaces (and types) that the other libraries will use and implement.
- Then there will be different variants of the library (e.g. minimal, business etc.). Those variants will import the core package, change the theme settings and (optionally) change the individual components.

### Consumer app

The consumer app of those libraries should be able to:

- Import only one of the libraries
- Or import many libraries and switch them based on a environment variable during buildtime. In that case, only the one library variant must be included in the final build (core + some variant).
- Or import many libraries and switch them during runtime. In that case, all used libraries would have to be imported in the final build.

Because of that, the "core" library should define interfaces, so that the consumer app can easily switch between the libraries.

## Tasks

### Phase 1

- [ ] Setup project with 3 sample themes:
  - @eduriam-ui/core (in src/eduriam-ui-core folder)
    - This npm package will define the components (with default looks) and their behaviors
    - It will also define interfaces that the other packages must follow
    - It will export all the components and configuration objects (for MUI theme configuration - palette, typography and other tokens)
  - @eduriam-ui/minimal" (in src/eduriam-ui-minimal folder)
    - will import components, interfaces and types from "@eduriam-ui/core"
    - It will overwrite the global theme settings such as palette, typography, etc.
    - It will also overwrite the individual components
      - It can either just provide the component directly from @eduriam-ui/core (with applied global styles)
      - Or it can overwrite individual components (keeping the same folder structure as in the core folder):
        - It should import the component from "@eduriam-ui/core" and change its styles and behaviors OR it can create a completely new component which will just follow the same interface as the component from "@eduriam-ui/core"
- [ ] Setup the project with the following tools
  - Yarn (newest version)
  - TypeScript
- [ ] Setup 2 sample components in each package:
  - [ ] ExampleCheckbox component - just change the looks of Material UI checkbox component
  - [ ] ExampleButton component - put a Button on a Paper component from Material UI

### Phase 2

- [ ] Setup Storybook (newest version)
  - The storybook should be in the root directory (not in individual packages)
  - It should display components from each package (core and minimal) - each package should have its own category
