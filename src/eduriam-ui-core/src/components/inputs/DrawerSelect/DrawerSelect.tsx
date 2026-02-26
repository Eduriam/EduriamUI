import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

import { Icon } from "../../data-display/Icon";
import { Drawer } from "../../navigation/Drawer";

export interface DrawerSelectOption {
  /**
   * Stable identifier for the option.
   */
  id: string;

  /**
   * Visible label for the option row.
   */
  label: string;

  /**
   * Optional data test identifier for this option row.
   */
  dataTest?: string;
}

export interface DrawerSelectSection {
  /**
   * Stable identifier for the section.
   */
  id: string;

  /**
   * Section heading.
   */
  title: string;

  /**
   * Options listed in this section.
   */
  options: DrawerSelectOption[];

  /**
   * Optional data test identifier for this section.
   */
  dataTest?: string;
}

export interface DrawerSelectProps {
  /**
   * Whether the drawer is open.
   */
  open: boolean;

  /**
   * Called when the drawer requests to close.
   */
  onClose: () => void;

  /**
   * Sections to render in the drawer.
   */
  sections: DrawerSelectSection[];

  /**
   * Currently selected option id for controlled usage.
   */
  selectedOptionId?: string;

  /**
   * Initial selected option id for uncontrolled usage.
   */
  defaultSelectedOptionId?: string;

  /**
   * Called when the user selects an option.
   */
  onChange?: (payload: { optionId: string; sectionId: string }) => void;

  /**
   * Optional data test identifier for the component root.
   */
  "data-test"?: string;
}

/**
 * Drawer-friendly option selector with grouped sections.
 *
 * Renders one or more titled sections. Each row is selectable and emits
 * the chosen option + section identifiers.
 */
export const DrawerSelect: React.FC<DrawerSelectProps> = ({
  open,
  onClose,
  sections,
  selectedOptionId,
  defaultSelectedOptionId,
  onChange,
  "data-test": dataTest,
}) => {
  const allOptions = useMemo(
    () =>
      sections.flatMap((section) =>
        section.options.map((option) => ({
          sectionId: section.id,
          optionId: option.id,
        })),
      ),
    [sections],
  );

  const [internalSelectedOptionId, setInternalSelectedOptionId] = useState<
    string | undefined
  >(defaultSelectedOptionId);

  const isControlled = selectedOptionId !== undefined;
  const resolvedSelectedOptionId = isControlled
    ? selectedOptionId
    : internalSelectedOptionId;

  useEffect(() => {
    if (!allOptions.length) {
      if (!isControlled) {
        setInternalSelectedOptionId(undefined);
      }
      return;
    }

    const selectedExists = allOptions.some(
      (entry) => entry.optionId === resolvedSelectedOptionId,
    );

    if (!selectedExists && !isControlled) {
      setInternalSelectedOptionId(undefined);
    }
  }, [allOptions, isControlled, resolvedSelectedOptionId]);

  const handleSelect = (sectionId: string, optionId: string) => {
    if (!isControlled) {
      setInternalSelectedOptionId(optionId);
    }

    onChange?.({ optionId, sectionId });
  };

  return (
    <Drawer open={open} onClose={onClose} data-test={dataTest}>
      <Box
        role="radiogroup"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {sections.map((section) => (
          <Box
            key={section.id}
            data-test={section.dataTest}
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <Typography variant="h6">{section.title}</Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {section.options.map((option) => {
                const selected = option.id === resolvedSelectedOptionId;

                return (
                  <ButtonBase
                    key={option.id}
                    role="radio"
                    aria-checked={selected}
                    data-test={option.dataTest}
                    onClick={() => handleSelect(section.id, option.id)}
                    sx={(theme) => ({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: 1,
                      width: "100%",
                      textAlign: "left",
                      borderRadius: 1,
                      color: theme.palette.text.primary,
                      minHeight: 40,
                    })}
                  >
                    <Icon name="arrowRight" sx={{ fontSize: 24, mt: 0 }} />
                    <Typography variant="body1">{option.label}</Typography>
                  </ButtonBase>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};

export default DrawerSelect;
