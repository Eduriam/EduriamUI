import React from "react";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Box from "@mui/material/Box";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";

import CodeBlank from "../../../../../../shared/CodeBlank/CodeBlank";
import type { CodeLine } from "../CodeEditorTypes";
import { SyntaxHighlightedCode } from "./SyntaxHighlightedCode";

export interface CodeEditorFillInBlankWithOptionsProps {
  /** Code lines with text and blank segments. */
  lines: CodeLine[];

  /** Map from blankId to filled value (empty string or undefined = not filled). */
  filledBlanks: Record<string, string>;

  /** Called when the user clicks a filled blank to remove the value. */
  onBlankClick?: (blankId: string) => void;

  /** Returns a stable droppable id for the given blank id. */
  getBlankDroppableId?: (blankId: string) => string;

  /** Returns a stable draggable id for a filled blank token. */
  getBlankTokenDraggableId?: (blankId: string) => string;

  /** Enables drag-and-drop drop targets for blanks. */
  dragAndDropEnabled?: boolean;

  /** Optional Prism language for syntax highlighting (e.g. "javascript", "html"). */
  language?: string;
}

interface DroppableCodeBlankProps {
  blankId: string;
  code: string;
  filled: boolean;
  onClick?: () => void;
  getBlankDroppableId?: (blankId: string) => string;
  getBlankTokenDraggableId?: (blankId: string) => string;
  dragAndDropEnabled?: boolean;
}

const DroppableCodeBlank: React.FC<DroppableCodeBlankProps> = ({
  blankId,
  code,
  filled,
  onClick,
  getBlankDroppableId,
  getBlankTokenDraggableId,
  dragAndDropEnabled = false,
}) => {
  const droppableId = getBlankDroppableId?.(blankId);
  const { isOver, setNodeRef } = useDroppable({
    id: droppableId ?? `blank:${blankId}`,
    data: {
      type: "code-blank",
      blankId,
    },
    disabled: !dragAndDropEnabled,
  });
  const draggableId = getBlankTokenDraggableId?.(blankId);
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableNodeRef,
    transform,
    isDragging,
  } =
    useDraggable({
      id: draggableId ?? `blank-token:${blankId}`,
      data: {
        type: "code-blank-token",
        blankId,
      },
      disabled: !dragAndDropEnabled || !filled,
    });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: "inline-flex",
        borderRadius: 2,
        outline: isOver ? "2px solid" : "none",
        outlineColor: isOver ? "primary.main" : "transparent",
        outlineOffset: isOver ? "2px" : 0,
      }}
      data-testid={`code-blank-${blankId}`}
    >
      <Box
        ref={setDraggableNodeRef}
        sx={{
          width: "fit-content",
          transform: CSS.Translate.toString(transform),
          opacity: isDragging ? 0 : 1,
          touchAction: "none",
          cursor: filled ? "grab" : "default",
        }}
        {...attributes}
        {...listeners}
      >
        <CodeBlank code={code} filled={filled} onClick={onClick} />
      </Box>
    </Box>
  );
};

/**
 * Renders a read-only code template where blank segments are shown as
 * interactive `CodeBlank` buttons and text segments use monospace code
 * typography. Users fill blanks by selecting from option buttons.
 */
export const CodeEditorFillInBlankWithOptions: React.FC<CodeEditorFillInBlankWithOptionsProps> = ({
  lines,
  filledBlanks,
  onBlankClick,
  getBlankDroppableId,
  getBlankTokenDraggableId,
  dragAndDropEnabled = false,
  language,
}) => {
  return (
    <Box
      sx={{
        px: 4,
        py: 3,
        overflow: "hidden",
        flexGrow: 1,
      }}
    >
      {lines.map((line, lineIdx) => (
        <Box key={lineIdx} sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", minHeight: 21.1 }}>
          {line.map((segment, segIdx) => {
            if (segment.type === "text") {
              if (language) {
                return (
                  <SyntaxHighlightedCode
                    key={segIdx}
                    code={segment.value}
                    language={language}
                    sx={{ whiteSpace: "pre" }}
                  />
                );
              }
              return (
                <Typography
                  key={segIdx}
                  component="span"
                  variant={"code" as TypographyProps["variant"]}
                  sx={{ whiteSpace: "pre" }}
                >
                  {segment.value}
                </Typography>
              );
            }

            const filled = !!filledBlanks[segment.blankId];
            const value = filledBlanks[segment.blankId] ?? "\u00A0\u00A0\u00A0\u00A0";

            return (
              <DroppableCodeBlank
                key={segIdx}
                blankId={segment.blankId}
                code={value}
                filled={filled}
                onClick={filled ? () => onBlankClick?.(segment.blankId) : undefined}
                getBlankDroppableId={getBlankDroppableId}
                getBlankTokenDraggableId={getBlankTokenDraggableId}
                dragAndDropEnabled={dragAndDropEnabled}
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export default CodeEditorFillInBlankWithOptions;
