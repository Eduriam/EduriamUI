import React, { useMemo } from "react";

import { Box, Typography } from "@mui/material";

import type { Caption } from "../../../video-scenes/Scene";

const DEFAULT_COMBINE_TOKENS_MS = 1200;

export interface ICaptions {
  /** Captions in Remotion Caption format (text, startMs, endMs, etc.). */
  captions: Caption[];
  /** Current playback time in milliseconds. */
  currentTimeMs: number;
  /** How often caption pages switch (ms). Higher = more words per page. @default 1200 */
  combineTokensWithinMilliseconds?: number;
  /** Whether the subtitles overlay is visible. */
  visible?: boolean;
}

function getCurrentPage(
  pages: CaptionPage[],
  currentTimeMs: number,
): CaptionPage | null {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const nextPage = pages[i + 1] ?? null;
    const endMs =
      page.durationMs !== undefined && page.durationMs !== null
        ? page.startMs + page.durationMs
        : nextPage
          ? nextPage.startMs
          : page.startMs + DEFAULT_COMBINE_TOKENS_MS;
    if (currentTimeMs >= page.startMs && currentTimeMs < endMs) return page;
  }
  return null;
}

export interface CaptionToken {
  text: string;
  fromMs: number;
  toMs: number;
}

export interface CaptionPage {
  text: string;
  startMs: number;
  durationMs?: number;
  tokens: CaptionToken[];
}

/**
 * Groups captions into pages. Words within
 * combineTokensWithinMilliseconds are shown on the same page.
 */
export function createCaptionPages(options: {
  captions: Caption[];
  combineTokensWithinMilliseconds: number;
}): { pages: CaptionPage[] } {
  const { captions, combineTokensWithinMilliseconds } = options;
  const pages: CaptionPage[] = [];
  let currentPage: CaptionToken[] = [];
  let pageStartMs: number | null = null;

  for (const cap of captions) {
    const token: CaptionToken = {
      text: cap.text,
      fromMs: cap.startMs,
      toMs: cap.endMs,
    };

    const gap = pageStartMs !== null ? cap.startMs - pageStartMs : 0;
    if (currentPage.length > 0 && gap > combineTokensWithinMilliseconds) {
      const startMs = currentPage[0]!.fromMs;
      const last = currentPage[currentPage.length - 1]!;
      pages.push({
        text: currentPage.map((t) => t.text).join(""),
        startMs,
        durationMs: last.toMs - startMs,
        tokens: currentPage,
      });
      currentPage = [];
      pageStartMs = null;
    }

    if (currentPage.length === 0) {
      pageStartMs = cap.startMs;
    }
    currentPage.push(token);
  }

  if (currentPage.length > 0) {
    const startMs = currentPage[0]!.fromMs;
    const last = currentPage[currentPage.length - 1]!;
    pages.push({
      text: currentPage.map((t) => t.text).join(""),
      startMs,
      durationMs: last.toMs - startMs,
      tokens: currentPage,
    });
  }

  return { pages };
}

/**
 * Renders captions with word-by-word read/unread coloring,
 * driven by current playback time. Uses Remotion's caption format and
 * createCaptionPages for page grouping.
 */
export const Captions: React.FC<ICaptions> = ({
  captions,
  currentTimeMs,
  combineTokensWithinMilliseconds = DEFAULT_COMBINE_TOKENS_MS,
  visible = true,
}) => {
  const { pages } = useMemo(
    () =>
      createCaptionPages({
        captions,
        combineTokensWithinMilliseconds,
      }),
    [captions, combineTokensWithinMilliseconds],
  );

  const currentPage = useMemo(
    () => getCurrentPage(pages, currentTimeMs),
    [pages, currentTimeMs],
  );

  if (!visible || !currentPage) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        pointerEvents: "none",
        px: 2,
        pb: 2,
      }}
    >
      <Box
        component="div"
        sx={{
          bgcolor: "background.paper",
          px: 2,
          py: 1,
          borderRadius: 1,
        }}
      >
        <Typography variant="h5" component="div">
          {currentPage.tokens.map((token) => {
            const isRead = token.fromMs <= currentTimeMs;
            return (
              <Box
                component="span"
                key={`${token.fromMs}-${token.toMs}`}
                sx={{
                  color: isRead ? "text.primary" : "text.disabled",
                }}
              >
                {token.text}
              </Box>
            );
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default Captions;
