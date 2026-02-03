import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";

import { LargeRadioButton } from "../LargeRadioButton";

export type LargeRadioButtonGroupExpandMode = "expandSelected" | "expandAll";

export interface LargeRadioButtonOption {
  id: string;
  text: string;
  subText?: string;
}

export interface LargeRadioButtonGroupProps {
  options: LargeRadioButtonOption[];
  expandMode?: LargeRadioButtonGroupExpandMode;
  defaultSelectedId?: string;
  fullWidth?: boolean;
  onChange?: (selectedId: string) => void;
}

export const LargeRadioButtonGroup = ({
  options,
  expandMode = "expandAll",
  defaultSelectedId,
  fullWidth = false,
  onChange,
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
          sx={{ cursor: "pointer" }}
          text={option.text}
          onClick={() => handleSelect(option.id)}
        />
      ))}
    </Box>
  );
};

export default LargeRadioButtonGroup;
