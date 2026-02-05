import type { ReactNode } from "react";

import Stack from "@mui/material/Stack";

/**
 * Props for the `PageRoot` layout component.
 *
 * Serves as the top-level vertical flex container for a full page.
 */
export type PageRootProps = {
  /**
   * Page content to render inside the vertical stack.
   */
  children: ReactNode;
};

/**
 * Full-height root layout that stacks page content vertically.
 *
 * Wrap your entire page JSX in `PageRoot` to ensure a minimum height of
 * `100dvh` and a consistent flex column layout.
 */
export function PageRoot({ children }: PageRootProps) {
  return (
    <Stack
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Stack>
  );
}
