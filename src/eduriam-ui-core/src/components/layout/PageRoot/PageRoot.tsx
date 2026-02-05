import type { ReactNode } from "react";

import Stack from "@mui/material/Stack";

export type PageRootProps = {
  children: ReactNode;
};

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
