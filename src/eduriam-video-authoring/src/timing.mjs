import { frameTimeMs, motion } from "./motion.mjs";

// Shared by construction validation, timeline assessment and playback preparation.
export function narrationWords(text) {
  return [...text.matchAll(/[\p{L}\p{N}]+(?:['’\-‑–][\p{L}\p{N}]+)*/gu)].map(
    (m, index) => ({
      index,
      text: m[0],
      startOffset: m.index,
      endOffset: m.index + m[0].length,
    }),
  );
}
export function bindBookmarks(marked, original, words, bindings) {
  let clean = "",
    cursor = 0;
  const resolved = [];
  const seen = new Set();
  const declared = new Map(bindings.map((b) => [b.id, b]));
  for (const match of marked.matchAll(/:([a-z][a-z0-9-]*) /g)) {
    const binding = declared.get(match[1]);
    if (!binding) continue;
    clean += marked.slice(cursor, match.index);
    if (seen.has(match[1])) throw Error("Duplicate bookmark " + match[1]);
    seen.add(match[1]);
    const word = words.find((w) => w.startOffset === clean.length);
    if (!word)
      throw Error(
        "Bookmark must precede a spoken word at its source position: " +
          match[1],
      );
    resolved.push({ ...binding, wordIndex: word.index, timeMs: word.startMs });
    cursor = match.index + match[0].length;
  }
  clean += marked.slice(cursor);
  if (clean !== original)
    throw Error("Narration must remain exactly unchanged");
  if (seen.size !== bindings.length)
    throw Error("Every binding requires exactly one bookmark");
  return resolved;
}
function at(root, path) {
  let value = root;
  for (const part of path) value = value?.[part];
  return value;
}
export function resolveSlideTiming(
  definition,
  bindings,
  startMs,
  endMs,
  fps = 30,
) {
  const result = structuredClone(definition);
  const frame = (ms) => frameTimeMs(ms, fps);
  for (const b of bindings.filter(
    (b) => b.path.at(-1) === "startTime" || b.path.at(-1) === "endTime",
  )) {
    if (b.timeMs < startMs || b.timeMs >= endMs)
      throw Error("Bookmark lies outside slide narration");
    const parent =
      b.path[0] === "components" && b.path.length > 3
        ? at(result, b.path.slice(0, 2))
        : null;
    const parentStart = parent
      ? (bindings.find(
          (x) =>
            JSON.stringify(x.path) ===
            JSON.stringify([...b.path.slice(0, 2), "startTime"]),
        )?.timeMs ?? startMs)
      : startMs;
    const target = at(result, b.path.slice(0, -1));
    if (!target) throw Error("Unknown bookmark target path");
    target[b.path.at(-1)] = Math.max(0, frame(b.timeMs - parentStart));
  }
  result.startTime = 0;
  const duration = endMs - startMs;
  const components =
    result.type === "RAW"
      ? (result.components ?? [])
      : result.type === "ONE_IMAGE"
        ? [result.image]
        : result.type === "THREE_IMAGES"
          ? ["leftImage", "middleImage", "rightImage"].map((k) => result[k])
          : [result];
  for (const c of components) {
    const start = c.startTime ?? 0,
      end = c.endTime ?? duration;
    if (
      !Number.isFinite(start) ||
      !Number.isFinite(end) ||
      start < 0 ||
      start >= duration ||
      end <= start ||
      end > duration + 1000 / fps
    )
      throw Error("Component timing falls outside its slide.");
    for (const item of c.steps ?? c.codeExplanation?.steps ?? c.items ?? [])
      if (
        !Number.isFinite(item.startTime) ||
        item.startTime < 0 ||
        item.startTime >= end - start
      )
        throw Error("Internal action falls outside its component lifetime.");
  }
  return result;
}
export function slideActivity(definition, durationMs, slideId) {
  const intervals = [];
  const events = [{ timeMs: 0, slideId, kind: "slide" }];
  const components =
    definition.type === "RAW"
      ? (definition.components ?? [])
      : definition.type === "CODE_EXPLANATION"
        ? [
            {
              ...definition.codeExplanation,
              type: "CODE_EXPLAINER",
              startTime: 0,
            },
          ]
        : definition.type === "ONE_IMAGE"
          ? [{ ...definition.image, type: "IMAGE" }]
          : definition.type === "THREE_IMAGES"
            ? ["leftImage", "middleImage", "rightImage"].map((key) => ({
                ...definition[key],
                type: "IMAGE",
              }))
            : [definition];
  for (const c of components) {
    const start = Math.max(0, c.startTime ?? 0),
      end = Math.min(durationMs, c.endTime ?? durationMs);
    if (end <= start) continue;
    events.push({ timeMs: start, slideId, componentId: c.id, kind: "reveal" });
    if (c.endTime != null && end < durationMs)
      events.push({ timeMs: end, slideId, componentId: c.id, kind: "hide" });
    if (c.type === "VIDEO" && c.mediaDurationMs > 0)
      intervals.push({
        startMs: start,
        endMs: Math.min(end, start + c.mediaDurationMs),
        slideId,
        componentId: c.id,
        kind: "playback",
      });
    const steps = c.steps ?? c.codeExplanation?.steps ?? [];
    let previous;
    for (const step of steps) {
      const { id, startTime, ...state } = step;
      const signature = JSON.stringify(state);
      if (
        (previous === undefined && (startTime ?? 0) > 0) ||
        (previous !== undefined && signature !== previous)
      ) {
        const t = start + (startTime ?? 0);
        if (t < end) {
          events.push({ timeMs: t, slideId, componentId: c.id, kind: "step" });
          intervals.push({
            startMs: t,
            endMs: Math.min(
              end,
              t +
                (c.type === "CODE_EXPLAINER"
                  ? motion.code
                  : c.type === "TERMINAL_EXPLAINER"
                    ? motion.terminal
                    : motion.diagram),
            ),
            slideId,
            componentId: c.id,
            kind: "transition",
          });
        }
      }
      previous = signature;
    }
    for (const item of c.items ?? [])
      if (item.startTime > 0 && start + item.startTime < end)
        events.push({
          timeMs: start + item.startTime,
          slideId,
          componentId: c.id,
          kind: "item",
        });
  }
  return { events, intervals };
}
export function activityTimeline(slides, durationMs, maximumGapMs = 5000) {
  const events = [],
    intervals = [];
  let previousSignature;
  for (const slide of slides) {
    const local = slideActivity(
      slide.definition,
      slide.endMs - slide.startMs,
      slide.id,
    );
    const signature = JSON.stringify(slide.definition, (key, value) =>
      ["id", "startTime"].includes(key) ? undefined : value,
    );
    if (signature === previousSignature && !local.intervals.length)
      local.events = local.events.filter((e) => e.timeMs > 0);
    previousSignature = signature;
    events.push(
      ...local.events.map((e) => ({ ...e, timeMs: e.timeMs + slide.startMs })),
    );
    intervals.push(
      ...local.intervals.map((i) => ({
        ...i,
        startMs: i.startMs + slide.startMs,
        endMs: i.endMs + slide.startMs,
      })),
    );
  }
  const coverage = [
    ...events.map((e) => ({ startMs: e.timeMs, endMs: e.timeMs })),
    ...intervals,
  ].sort((a, b) => a.startMs - b.startMs);
  let cursor = 0;
  const gaps = [];
  for (const item of coverage) {
    if (item.startMs > cursor)
      gaps.push({ startMs: cursor, endMs: item.startMs });
    cursor = Math.max(cursor, item.endMs);
  }
  if (cursor < durationMs) gaps.push({ startMs: cursor, endMs: durationMs });
  return {
    events,
    intervals,
    maximumGapMs: Math.max(0, ...gaps.map((g) => g.endMs - g.startMs)),
    violations: gaps.filter((g) => g.endMs - g.startMs > maximumGapMs),
  };
}

export function bookmarkTargets(definition) {
  const result = [];
  for (const field of ["image", "leftImage", "middleImage", "rightImage"])
    if (definition[field])
      result.push({
        targetId: definition[field].id,
        path: [field, "startTime"],
        required: true,
      });
  for (const field of ["items", "images"])
    for (const [i, item] of (definition[field] ?? []).entries()) {
      if (!item.id) throw Error("Internal items require stable IDs.");
      result.push({
        targetId: item.id,
        path: [field, i, "startTime"],
        required: true,
      });
    }
  for (const [i, step] of (definition.codeExplanation?.steps ?? []).entries()) {
    if (!step.id) throw Error("Code steps require stable IDs.");
    result.push({
      targetId: step.id,
      path: ["codeExplanation", "steps", i, "startTime"],
      required: true,
    });
  }
  for (const [i, c] of (definition.components ?? []).entries()) {
    result.push({
      targetId: c.id,
      path: ["components", i, "startTime"],
      required: true,
    });
    if (c.endTime != null)
      result.push({
        targetId: c.id + "-end",
        path: ["components", i, "endTime"],
        required: true,
      });
    for (const field of ["steps", "items"])
      for (const [j, item] of (c[field] ?? []).entries()) {
        if (!item.id)
          throw Error("Internal items and steps require stable IDs.");
        result.push({
          targetId: c.id + "-" + item.id,
          path: ["components", i, field, j, "startTime"],
          required: true,
        });
      }
  }
  return result;
}
