/**
 * Pre-defined keyboard extension character sets.
 *
 * Each set contains the most commonly used special characters for the given
 * language / technology, making it easier for users to type them on mobile
 * or on layouts without easy access to these characters.
 *
 * The key used here matches the `keyboardSet` field on tab definitions
 * (e.g. `FillInBlankWithoutOptionsTab.keyboardSet`).
 */
export const KEYBOARD_SETS: Readonly<Record<string, readonly string[]>> = {
  html: ["<", ">", "/", "=", '"', "(", ")", "{", "}"],
  css: ["{", "}", ":", ";", "#", ".", "(", ")", ","],
  javascript: ["{", "}", "(", ")", "[", "]", "=", ";", ".", '"', ":", ","],
  typescript: ["{", "}", "(", ")", "[", "]", "=", ";", ".", '"', ":", "<", ">"],
  python: [":", "(", ")", "[", "]", "{", "}", "=", "#", '"', ",", "."],
  sql: ["(", ")", ";", "*", "=", "'", "%", ",", "."],
  general: ["<", ">", "/", "(", ")", "{", "}", "[", "]", "=", ";", '"'],
} as const;

/**
 * Look up the character set for the given keyboard set key.
 *
 * Returns `undefined` when the key is not found so the caller can decide
 * whether to fall back or simply not render the keyboard extension.
 */
export function getKeyboardSetCharacters(
  keyboardSet: string,
): readonly string[] | undefined {
  return KEYBOARD_SETS[keyboardSet];
}
