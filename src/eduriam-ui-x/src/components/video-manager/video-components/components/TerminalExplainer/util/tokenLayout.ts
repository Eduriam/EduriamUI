import type {
  PositionedTerminalToken,
  TerminalStepTokenLayout,
  TerminalTokenPart,
  TerminalTokenTransitionLayout,
} from "../types";

const tokenizeTerminalLine = (line: string): TerminalTokenPart[] => {
  if (!line) {
    return [];
  }

  const matches = line.matchAll(/(\s+|[^\s]+)/g);
  const tokens: TerminalTokenPart[] = [];

  for (const match of matches) {
    const content = match[0] ?? "";
    if (!content) continue;

    const start = match.index ?? 0;
    tokens.push({
      content,
      start,
      end: start + content.length,
    });
  }

  return tokens;
};

const getTokenSignature = (token: { content: string }): string => token.content;

export const buildTerminalStepTokenLayout = (
  lines: string[],
): TerminalStepTokenLayout => {
  let globalIndex = 0;

  const byLine = lines.map((line, lineIndex) => {
    return tokenizeTerminalLine(line).map((token, lineTokenIndex) => ({
      ...token,
      lineIndex,
      lineTokenIndex,
      globalIndex: globalIndex++,
    }));
  });

  return {
    byLine,
    flat: byLine.flat(),
  };
};

export const buildTerminalTokenTransitionLayout = (
  oldTokens: PositionedTerminalToken[],
  newTokens: PositionedTerminalToken[],
): TerminalTokenTransitionLayout => {
  const oldBySignature = new Map<string, PositionedTerminalToken[]>();

  for (const token of oldTokens) {
    const signature = getTokenSignature(token);
    const queue = oldBySignature.get(signature);
    if (queue) queue.push(token);
    else oldBySignature.set(signature, [token]);
  }

  const oldByNewGlobalIndex = new Map<number, PositionedTerminalToken>();
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

export const getTerminalTokenColor = ({
  token,
  line,
  tokenIndex,
  theme,
}: {
  token: string;
  line: string;
  tokenIndex: number;
  theme: {
    foreground: string;
    prompt: string;
    success: string;
    warning: string;
    error: string;
    muted: string;
  };
}): string => {
  const trimmed = token.trim();
  const lineTrimmed = line.trimStart();

  if (tokenIndex === 0 && /^(\$|#|>|PS>|[A-Za-z]:\\.*>)$/.test(trimmed)) {
    return theme.prompt;
  }

  if (tokenIndex === 0 && /^(\$|#|>|PS>|[A-Za-z]:\\)/.test(lineTrimmed)) {
    return theme.prompt;
  }

  if (/\b(error|failed|fatal|exception)\b/i.test(trimmed)) {
    return theme.error;
  }

  if (/\b(warn|warning|deprecated)\b/i.test(trimmed)) {
    return theme.warning;
  }

  if (/\b(ok|done|success|passed)\b/i.test(trimmed)) {
    return theme.success;
  }

  if (/^(--?[a-zA-Z]|\[[^\]]+\]|\([^)]+\))/.test(trimmed)) {
    return theme.muted;
  }

  return theme.foreground;
};
