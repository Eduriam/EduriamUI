# Video authoring catalog

`@eduriam/video-authoring` is the Node-safe companion to the renderer. Build it after UI-X (`yarn build`) and install its packed archive in consumers. It never imports React or reads another checkout at runtime.

Schemas come from the renderer TypeScript contracts. Teaching guidance lives in `authoring.json` beside components/templates. Search returns stable catalog IDs; pass the ID to `componentDocumentation` to distinguish similarly named components and templates. Documentation includes only the referenced schema definitions. Keep examples and capabilities beside the implementation when adding a component.

`bookmarkTargets` returns explicit definition paths. Never infer ownership by splitting IDs. Generated internal steps/items need stable IDs. `bindBookmarks` binds insertion positions to indexed source words and rejects changed narration. Components use slide-relative milliseconds; internal actions use component-relative milliseconds. `resolveSlideTiming` applies the shared 30fps rounding policy.

`activityTimeline` reports content events, active intervals, maximum static gap and violations. Foreground video contributes only its measured playback duration; no-op steps, decorative backgrounds and frozen tails contribute no continuous motion. Captions are outside this accounting. Temporary components use optional exclusive `endTime`.

Version/hash pins cover renderer schemas, guidance and activity implementation. Consumers should compare hashes before execution and reject incompatible resumed work. Run `yarn test:authoring`, `yarn typecheck`, and `yarn build` before packing.
