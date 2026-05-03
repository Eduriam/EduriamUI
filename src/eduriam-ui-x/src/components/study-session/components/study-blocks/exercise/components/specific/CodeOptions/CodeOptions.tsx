import React from "react";

import { useDroppable } from "@dnd-kit/core";
import Box from "@mui/material/Box";

import CodeOptionButton from "../../../../../shared/CodeOptionButton/CodeOptionButton";

export interface CodeOptionsProps {
  /**
   * Full list of option values. The index is stable and used to track
   * which options are currently placed in blanks.
   */
  options: string[];

  /**
   * Set of indices (into `options`) whose values are currently placed
   * in a blank inside the code editor.
   */
  selectedIndices: Set<number>;

  /**
   * Called when the user clicks an available (non-selected) option.
   */
  onSelectOption: (optionIndex: number) => void;

  /** Returns a stable draggable id for the given option index. */
  getOptionDraggableId: (optionIndex: number) => string;

  /** Stable droppable id for the options pool container. */
  optionsPoolDroppableId: string;
}

/**
 * Row of `CodeOptionButton` elements shown below the code editor.
 *
 * Options whose index is in `selectedIndices` are rendered in the
 * "selected" (placeholder) state. Clicking an available option fires
 * `onSelectOption` so the parent can place it in the next empty blank.
 */
export const CodeOptions: React.FC<CodeOptionsProps> = ({
  options,
  selectedIndices,
  onSelectOption,
  getOptionDraggableId,
  optionsPoolDroppableId,
}) => {
  const { setNodeRef } = useDroppable({
    id: optionsPoolDroppableId,
    data: {
      type: "code-options-pool",
    },
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
      }}
      data-testid="code-options-pool"
    >
      {options.map((option, idx) => {
        const isSelected = selectedIndices.has(idx);
        const draggableId = getOptionDraggableId(idx);

        return (
          <CodeOptionButton
            key={idx}
            selected={isSelected}
            onClick={() => onSelectOption(idx)}
            draggableId={draggableId}
            draggableData={{ type: "code-option", optionIndex: idx }}
            data-test={`code-option-${idx}`}
            data-testid={`code-option-${idx}`}
          >
            {option}
          </CodeOptionButton>
        );
      })}
    </Box>
  );
};

export default CodeOptions;
