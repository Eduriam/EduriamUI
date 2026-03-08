import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

export interface SwitchProps {
  /**
   * Current checked state for controlled usage.
   */
  checked?: boolean;

  /**
   * Initial checked state for uncontrolled usage.
   *
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Whether interaction is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Called when checked state changes.
   */
  onChange?: (checked: boolean) => void;

  /**
   * Optional data attribute used to identify the switch in E2E tests.
   */
  "data-test"?: string;
}

/**
 * Compact on/off toggle switch.
 */
export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  "data-test": dataTest,
}) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const resolvedChecked = isControlled ? checked : internalChecked;

  useEffect(() => {
    if (!isControlled) {
      setInternalChecked(defaultChecked);
    }
  }, [defaultChecked, isControlled]);

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    const nextChecked = !resolvedChecked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onChange?.(nextChecked);
  };

  return (
    <ButtonBase
      aria-checked={resolvedChecked}
      data-test={dataTest}
      disabled={disabled}
      disableRipple
      onClick={handleToggle}
      role="switch"
      sx={(theme) => ({
        alignItems: "center",
        backgroundColor: resolvedChecked
          ? theme.palette.primary.light
          : theme.palette.common.white,
        border: resolvedChecked ? "none" : `1px solid ${theme.palette.divider}`,
        borderRadius: "16px",
        boxSizing: "border-box",
        display: "flex",

        justifyContent: resolvedChecked ? "flex-end" : "flex-start",
        opacity: disabled ? 0.5 : 1,
        px: "3px",
        py: "3px",
        transition:
          "background-color 120ms ease, border-color 120ms ease, opacity 120ms ease",
        width: "60px",
      })}
    >
      <Box
        sx={(theme) => ({
          backgroundColor: resolvedChecked
            ? theme.palette.background.paper
            : theme.palette.text.disabled,
          borderRadius: "50%",
          height: "26px",
          transition: "background-color 120ms ease",
          width: "26px",
        })}
      />
    </ButtonBase>
  );
};

export default Switch;
