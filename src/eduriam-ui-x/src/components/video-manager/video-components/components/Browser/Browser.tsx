import DOMPurify from "dompurify";

import React, { useMemo } from "react";

import Box from "@mui/material/Box";

import type { BaseVideoComponent } from "../../VideoComponent";

export interface IBrowser extends BaseVideoComponent {
  type: "BROWSER";
  html: string;
  url?: string;
  inlineCss?: string;
  inlineJs?: string;
}

export interface IBrowserProps {
  comp: IBrowser;
}

const buildDocument = (html: string, css?: string, js?: string): string => {
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "hr",
      "span",
      "div",
      "a",
      "strong",
      "em",
      "b",
      "i",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "img",
      "code",
      "pre",
      "blockquote",
      "sub",
      "sup",
      "small",
    ],
    ALLOWED_ATTR: [
      "class",
      "id",
      "style",
      "href",
      "src",
      "alt",
      "width",
      "height",
      "colspan",
      "rowspan",
    ],
    ALLOW_DATA_ATTR: false,
  });

  const styleBlock = css ? `<style>${css}</style>` : "";
  const scriptBlock = js ? `<script>${js}<\/script>` : "";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${styleBlock}
</head>
<body>
  ${sanitizedHtml}
  ${scriptBlock}
</body>
</html>`;
};

export const Browser: React.FC<IBrowserProps> = ({ comp }) => {
  const srcDoc = useMemo(
    () => buildDocument(comp.html, comp.inlineCss, comp.inlineJs),
    [comp.html, comp.inlineCss, comp.inlineJs],
  );

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.16)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: 42,
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            px: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "#f8fafc",
          }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
            }}
          />
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
            }}
          />
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
            }}
          />
          <Box
            sx={{
              ml: 1,
              px: 1.25,
              py: 0.5,
              minWidth: 0,
              flexGrow: 1,
              borderRadius: 999,
              border: "1px solid #dbe2ea",
              backgroundColor: "#ffffff",
              color: "#475569",
              fontSize: 12,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            {comp.url ?? <span>&nbsp;</span>}
          </Box>
        </Box>

        <Box
          sx={{ position: "relative", flexGrow: 1, backgroundColor: "#ffffff" }}
        >
          <Box
            component="iframe"
            title="Browser preview"
            srcDoc={srcDoc}
            sandbox="allow-same-origin"
            sx={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Browser;
