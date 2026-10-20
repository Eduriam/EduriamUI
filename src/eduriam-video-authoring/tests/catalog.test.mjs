import assert from "node:assert/strict";
import test from "node:test";

import {
  activityTimeline,
  bookmarkTargets,
  catalog,
  componentDocumentation,
  searchComponents,
  validateSlide,
} from "../dist/index.mjs";

test("all catalog entries have distinct inspectable identities and renderer schemas", () => {
  assert.equal(new Set(catalog.map((c) => c.id)).size, catalog.length);
  for (const item of catalog) {
    const doc = componentDocumentation(item.id);
    assert.ok(doc.schema);
    assert.ok(doc.purpose);
    assert.ok(doc.capabilities.length);
  }
  assert.equal(catalog.filter((c) => c.type === "LIST").length, 2);
  assert.ok(
    searchComponents("code focus").some((c) => c.type === "CODE_EXPLAINER"),
  );
});
test("template internal actions expose explicit paths", () => {
  assert.deepEqual(
    bookmarkTargets({
      type: "CODE_EXPLANATION",
      codeExplanation: { steps: [{ id: "first", startTime: 0 }] },
    })[0].path,
    ["codeExplanation", "steps", 0, "startTime"],
  );
});
test("identical static slides cannot satisfy activity through arbitrary slide splitting", () => {
  const definition = {
    type: "RAW",
    components: [{ id: "one", type: "TEXT", startTime: 0, text: "same" }],
  };
  const result = activityTimeline(
    [
      { id: "a", definition, startMs: 0, endMs: 3000 },
      { id: "b", definition, startMs: 3000, endMs: 6000 },
    ],
    6000,
    5000,
  );
  assert.equal(result.maximumGapMs, 6000);
  assert.equal(result.violations.length, 1);
});
test("renderer schema rejects unsupported component properties", () => {
  assert.ok(
    validateSlide({
      type: "RAW",
      id: "a",
      startTime: 0,
      components: [
        {
          id: "b",
          type: "TEXT",
          text: "x",
          column: "first",
          startTime: 0,
          imaginaryAnimation: true,
        },
      ],
    }).length,
  );
});

test("image template bookmarks and activity follow actual image fields", () => {
  const d = {
    type: "THREE_IMAGES",
    leftImage: { id: "left", startTime: 0 },
    middleImage: { id: "middle", startTime: 2000 },
    rightImage: { id: "right", startTime: 4000 },
  };
  assert.deepEqual(
    bookmarkTargets(d).map((t) => t.path[0]),
    ["leftImage", "middleImage", "rightImage"],
  );
  const t = activityTimeline(
    [{ id: "s", definition: d, startMs: 0, endMs: 5000 }],
    5000,
    3000,
  );
  assert.equal(t.maximumGapMs, 2000);
});
