import type {
  CodeExplainerAnnotation,
  CodeExplainerStep,
  LineAnnotations,
} from "../types";

export const dedupeAnnotations = (
  annotations: CodeExplainerAnnotation[],
): CodeExplainerAnnotation[] => {
  const seen = new Set<string>();
  const result: CodeExplainerAnnotation[] = [];

  for (const annotation of annotations) {
    const key = `${annotation.lineNumber}|${annotation.column ?? 0}|${annotation.length ?? 0}|${annotation.message}|${annotation.code ?? ""}|${annotation.language ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(annotation);
  }

  return result;
};

export const buildLineAnnotations = (
  step: CodeExplainerStep,
): Map<number, LineAnnotations> => {
  const map = new Map<number, LineAnnotations>();

  const ensure = (lineNumber: number): LineAnnotations => {
    const existing = map.get(lineNumber);
    if (existing) return existing;
    const created: LineAnnotations = { callouts: [], errors: [] };
    map.set(lineNumber, created);
    return created;
  };

  for (const callout of step.callouts ?? []) {
    ensure(callout.lineNumber).callouts.push(callout);
  }
  for (const error of step.errors ?? []) {
    ensure(error.lineNumber).errors.push(error);
  }

  return map;
};

