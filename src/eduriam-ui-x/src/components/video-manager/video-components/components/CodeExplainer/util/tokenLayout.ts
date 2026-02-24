import type {
  PositionedToken,
  StepTokenLayout,
  TokenTransitionLayout,
} from "../types";
import { getLineTokens } from "./syntax";

const getTokenSignature = (token: { type: string; content: string }): string =>
  `${token.type}::${token.content}`;

export const buildStepTokenLayout = (
  lines: string[],
  language: string,
): StepTokenLayout => {
  let globalIndex = 0;
  const byLine = lines.map((line, lineIndex) =>
    getLineTokens(line, language).map((token) => ({
      ...token,
      lineIndex,
      globalIndex: globalIndex++,
    })),
  );

  return {
    byLine,
    flat: byLine.flat(),
  };
};

export const buildTokenTransitionLayout = (
  oldTokens: PositionedToken[],
  newTokens: PositionedToken[],
): TokenTransitionLayout => {
  const oldBySignature = new Map<string, PositionedToken[]>();

  for (const token of oldTokens) {
    const signature = getTokenSignature(token);
    const queue = oldBySignature.get(signature);
    if (queue) queue.push(token);
    else oldBySignature.set(signature, [token]);
  }

  const oldByNewGlobalIndex = new Map<number, PositionedToken>();
  const matchedOldIndexes = new Set<number>();

  for (const token of newTokens) {
    const signature = getTokenSignature(token);
    const queue = oldBySignature.get(signature);
    if (!queue || queue.length === 0) continue;

    const oldToken = queue.shift();
    if (!oldToken) continue;

    matchedOldIndexes.add(oldToken.globalIndex);
    oldByNewGlobalIndex.set(token.globalIndex, oldToken);
  }

  const removedOldTokens = oldTokens.filter(
    (token) => !matchedOldIndexes.has(token.globalIndex),
  );

  return {
    oldByNewGlobalIndex,
    removedOldTokens,
  };
};

