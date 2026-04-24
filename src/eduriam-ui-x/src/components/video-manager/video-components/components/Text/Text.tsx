import fitty from "fitty";

import React, { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { BaseVideoComponent } from "../../VideoComponent";

export interface IText extends BaseVideoComponent {
  type: "TEXT";
  text: string;
  align?: "left" | "right" | "center";
}

export interface ITextProps {
  comp: IText;
}

type TextSegmentType = "plain" | "bold" | "italic" | "code";

interface TextSegment {
  type: TextSegmentType;
  content: string;
}

const parseInlineText = (text: string): TextSegment[] => {
  const segments: TextSegment[] = [];

  let i = 0;
  while (i < text.length) {
    // Bold: **text**
    if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        if (i > 0 && text.slice(0, i)) {
          segments.push({ type: "plain", content: text.slice(0, i) });
        }
        const content = text.slice(i + 2, end);
        segments.push({ type: "bold", content });
        text = text.slice(end + 2);
        i = 0;
        continue;
      }
    }

    // Italic: __text__
    if (text.startsWith("__", i)) {
      const end = text.indexOf("__", i + 2);
      if (end !== -1) {
        if (i > 0 && text.slice(0, i)) {
          segments.push({ type: "plain", content: text.slice(0, i) });
        }
        const content = text.slice(i + 2, end);
        segments.push({ type: "italic", content });
        text = text.slice(end + 2);
        i = 0;
        continue;
      }
    }

    // Inline code: `code`
    if (text[i] === "`") {
      const end = text.indexOf("`", i + 1);
      if (end !== -1) {
        if (i > 0 && text.slice(0, i)) {
          segments.push({ type: "plain", content: text.slice(0, i) });
        }
        const content = text.slice(i + 1, end);
        segments.push({ type: "code", content });
        text = text.slice(end + 1);
        i = 0;
        continue;
      }
    }

    i += 1;
  }

  if (text) {
    segments.push({ type: "plain", content: text });
  }

  return segments;
};

export const Text: React.FC<ITextProps> = ({ comp }) => {
  const segments = parseInlineText(comp.text);
  const align = comp.align ?? "center";
  const fittyContainerRef = useRef<HTMLDivElement | null>(null);
  const fittedTextRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const container = fittyContainerRef.current;
    const node = fittedTextRef.current;
    if (!node || !container) return;

    const fittyInstance = fitty(node, {
      minSize: 16,
      maxSize: 56,
      multiLine: true,
    });

    const fit = () => fittyInstance.fit({ sync: true });

    fit();
    const rafId = requestAnimationFrame(fit);

    let resizeObserver: ResizeObserver | undefined;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(fit);
      resizeObserver.observe(container);
    } else if (typeof window !== "undefined") {
      window.addEventListener("resize", fit);
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", fit);
      }
      fittyInstance.unsubscribe();
    };
  }, [comp.text, align]);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent:
          align === "left"
            ? "flex-start"
            : align === "right"
              ? "flex-end"
              : "center",
      }}
    >
      <Typography
        component="div"
        sx={{
          width: "100%",
          textAlign: align,
          lineHeight: 1.2,
        }}
      >
        <Box ref={fittyContainerRef} sx={{ width: "100%" }}>
          <span
            ref={fittedTextRef}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {segments.map((segment, index) => {
              if (segment.type === "plain") {
                return <span key={index}>{segment.content}</span>;
              }

              if (segment.type === "bold") {
                return (
                  <span
                    key={index}
                    style={{
                      color: "#0ea5e9",
                      fontWeight: "inherit",
                      fontStyle: "inherit",
                    }}
                  >
                    {segment.content}
                  </span>
                );
              }

              if (segment.type === "italic") {
                return (
                  <span
                    key={index}
                    style={{
                      color: "#22c55e",
                      fontStyle: "inherit",
                      fontWeight: "inherit",
                    }}
                  >
                    {segment.content}
                  </span>
                );
              }

              // code
              return (
                <span
                  key={index}
                  style={{
                    fontFamily: "monospace",
                    backgroundColor: "rgba(148, 163, 184, 0.2)",
                    paddingInline: 4,
                    borderRadius: 4,
                  }}
                >
                  {segment.content}
                </span>
              );
            })}
          </span>
        </Box>
      </Typography>
    </Box>
  );
};

export default Text;
