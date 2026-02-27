import DOMPurify from "dompurify";

import React, { useMemo } from "react";

import Box from "@mui/material/Box";

export interface CodeEditorBrowserProps {
  /** Raw HTML content to render. */
  html: string;

  /** Optional inline CSS injected into the document. */
  inlineCss?: string;

  /** Optional inline JS injected into the document. */
  inlineJs?: string;
  dataTest?: string;
}

/**
 * Builds a full HTML document string for the sandboxed iframe.
 *
 * The HTML is sanitized with DOMPurify to prevent XSS. Inline CSS is
 * placed in a `<style>` tag and inline JS in a `<script>` tag when
 * provided.
 */
function buildDocument(html: string, css?: string, js?: string): string {
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
}

/**
 * Renders HTML content in a sandboxed iframe that is completely isolated
 * from the host application's CSS and JavaScript.
 *
 */
export const CodeEditorBrowser: React.FC<CodeEditorBrowserProps> = ({
  html,
  inlineCss,
  inlineJs,
  dataTest,
}) => {
  const srcdoc = useMemo(
    () => buildDocument(html, inlineCss, inlineJs),
    [html, inlineCss, inlineJs],
  );

  return (
    <Box
      data-test={dataTest}
      sx={{
        flexGrow: 1,
        overflow: "hidden",
        display: "flex",
      }}
    >
      <Box
        component="iframe"
        srcDoc={srcdoc}
        sandbox="allow-same-origin"
        title="Browser preview"
        sx={{
          flexGrow: 1,
          border: "none",
          width: "100%",
          minHeight: 150,
          backgroundColor: "#ffffff",
        }}
      />
    </Box>
  );
};

export default CodeEditorBrowser;
