export declare const catalogHash: string;
export declare const catalogVersion: string;
export declare const rendererVersion: string;
export declare const schema: Record<string, unknown>;
export type ComponentSummary = {
  id: string;
  type: string;
  purpose: string;
  tags: string[];
  capabilities: string[];
};
export type ComponentDocumentation = ComponentSummary & {
  schema: Record<string, unknown>;
  timing: string;
  example?: unknown;
};
export declare const catalog: ComponentDocumentation[];
export type BookmarkTarget = {
  targetId: string;
  path: Array<string | number>;
  required: boolean;
};
export type BookmarkBinding = { id: string; path: Array<string | number> };
export type ResolvedBookmark = BookmarkBinding & {
  wordIndex: number;
  timeMs: number;
};
export type NarrationWord = {
  index: number;
  text: string;
  startOffset: number;
  endOffset: number;
  startMs: number;
  endMs: number;
};
export type ActivityEvent = {
  timeMs: number;
  slideId: string;
  componentId?: string;
  kind: string;
};
export type ActivityInterval = {
  startMs: number;
  endMs: number;
  slideId?: string;
  componentId?: string;
  kind?: string;
};
export type ActivityTimeline = {
  events: ActivityEvent[];
  intervals: ActivityInterval[];
  maximumGapMs: number;
  violations: ActivityInterval[];
};
export declare function searchComponents(
  query?: string,
  limit?: number,
): ComponentSummary[];
export declare function componentDocumentation(
  typeOrId: string,
): ComponentDocumentation;
export declare function validateSlide(
  definition: unknown,
): Array<{ path: string; message: string }>;
export declare function narrationWords(
  text: string,
): Array<Omit<NarrationWord, "startMs" | "endMs">>;
export declare function bookmarkTargets(
  definition: Record<string, any>,
): BookmarkTarget[];
export declare function bindBookmarks(
  marked: string,
  original: string,
  words: NarrationWord[],
  bindings: BookmarkBinding[],
): ResolvedBookmark[];
export declare function resolveSlideTiming(
  definition: Record<string, any>,
  bindings: ResolvedBookmark[],
  startMs: number,
  endMs: number,
  fps?: number,
): Record<string, any>;
export declare function slideActivity(
  definition: Record<string, any>,
  durationMs: number,
  slideId: string,
): Pick<ActivityTimeline, "events" | "intervals">;
export declare function activityTimeline(
  slides: Array<{
    id: string;
    definition: Record<string, any>;
    startMs: number;
    endMs: number;
  }>,
  durationMs: number,
  maximumGapMs?: number,
): ActivityTimeline;
