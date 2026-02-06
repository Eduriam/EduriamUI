import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";

import { LargeRadioButton } from "../LargeRadioButton";

/**
 * Expansion behavior for options in `LargeRadioButtonGroup`.
 *
 * - `"expandSelected"` – only the selected option shows its `subText`.
 * - `"expandAll"` – all options show `subText` when provided.
 */
export type LargeRadioButtonGroupExpandMode = "expandSelected" | "expandAll";

/**
 * Single option within a `LargeRadioButtonGroup`.
 */
export interface LargeRadioButtonOption {
  /**
   * Stable identifier for the option, used as the `value`.
   */
  id: string;

  /**
   * Primary label text.
   */
  text: string;

  /**
   * Optional secondary description text.
   */
  subText?: string;
}

/**
 * Props for the `LargeRadioButtonGroup` component.
 *
 * Manages selection state and renders a vertical list of large radio options.
 */
export interface LargeRadioButtonGroupProps {
  /**
   * List of options to render. Must have unique ids.
   */
  options: LargeRadioButtonOption[];

  /**
   * How to expand option descriptions.
   *
   * @default "expandAll"
   */
  expandMode?: LargeRadioButtonGroupExpandMode;

  /**
   * Id of the option that should be selected initially.
   *
   * If not provided, the first option is selected.
   */
  defaultSelectedId?: string;

  /**
   * Whether options should stretch to full width.
   *
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Called whenever the selected option changes.
   */
  onChange?: (selectedId: string) => void;

  /**
   * Optional data attribute used to identify this radio group in E2E tests.
   *
   * Applied to the outer MUI `Box` as `data-test`.
   */
  "data-test"?: string;
}

/**
 * Controlled group of large, accessible radio options.
 *
 * Use this when you need a prominent choice between a small number of
 * options (for example “Easy / Medium / Hard”).
 */
export const LargeRadioButtonGroup = ({
  options,
  expandMode = "expandAll",
  defaultSelectedId,
  fullWidth = false,
  onChange,
  "data-test": dataTest,
}: LargeRadioButtonGroupProps) => {
  const firstOptionId = options[0]?.id;
  const [selectedId, setSelectedId] = useState<string | undefined>(
    defaultSelectedId ?? firstOptionId,
  );

  useEffect(() => {
    if (!options.length) {
      setSelectedId(undefined);
      return;
    }

    const isValid = options.some((option) => option.id === selectedId);
    if (!isValid) {
      setSelectedId(firstOptionId);
    }
  }, [options, selectedId, firstOptionId]);

  const optionMap = useMemo(
    () =>
      options.map((option) => ({
        ...option,
        selected: option.id === selectedId,
        expanded: expandMode === "expandAll" ? true : option.id === selectedId,
      })),
    [expandMode, options, selectedId],
  );

  const handleSelect = (id: string) => {
    if (id === selectedId) {
      return;
    }
    setSelectedId(id);
    onChange?.(id);
  };

  return (
    <Box
      role="radiogroup"
      data-test={dataTest}
      sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
      {optionMap.map((option) => (
        <LargeRadioButton
          key={option.id}
          expanded={option.expanded}
          fullWidth={fullWidth}
          role="radio"
          aria-checked={option.selected}
          selected={option.selected}
          subText={option.subText}
          text={option.text}
          onClick={() => handleSelect(option.id)}
        />
      ))}
    </Box>
  );
};

export default LargeRadioButtonGroup;
