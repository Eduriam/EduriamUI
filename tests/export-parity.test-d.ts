// Type-level export parity test between @eduriam/ui-core and @eduriam/ui-minimal to check whether the exports are the same
// This file should be compiled with `tsc -p tsconfig.api-parity.json`
import type * as Core from "@eduriam/ui-core";
import type * as Minimal from "@eduriam/ui-minimal";

// Type helpers
type Expect<T extends true> = T;
// Structural type equality check
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? (<T>() => T extends B ? 1 : 2) extends <T>() => T extends A ? 1 : 2
      ? true
      : false
    : false;

type Extends<A, B> = A extends B ? true : false;

// 1) Same set of named exports
export type _KeysMatch = Expect<Equal<keyof typeof Core, keyof typeof Minimal>>;

// 2) Public surface is the same shape (both directions)
export type _MinimalAssignableToCore = Expect<
  Extends<typeof Minimal, typeof Core>
>;
export type _CoreAssignableToMinimal = Expect<
  Extends<typeof Core, typeof Minimal>
>;
