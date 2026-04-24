import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { useTheme } from "@mui/material/styles";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Icon } from "../../data-display/Icon";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface KeyboardExtensionProps {
  /**
   * Characters to display as quick-access buttons.
   */
  characters: string[];

  /**
   * Visual / layout variant.
   *
   * - `"standard"` – sticky on mobile, inline on desktop (responsive).
   * - `"inline"` – rendered in normal document flow (desktop use, placed
   *   below the exercise).
   * - `"sticky"` – fixed to the bottom of the viewport with an additional
   *   check button (mobile use, sits above the virtual keyboard).
   *
   * @default "standard"
   */
  variant?: "standard" | "inline" | "sticky";

  /**
   * Called when the user presses a character button.
   *
   * The character buttons use `onMouseDown` with `preventDefault()` so that
   * focus is **not** stolen from the currently active input field.
   */
  onCharacterPress: (character: string) => void;

  /**
   * Called when the check button is pressed (sticky variant only).
   */
  onCheckPress?: () => void;

  /**
   * Whether the check button is disabled (sticky variant only).
   *
   * @default false
   */
  checkDisabled?: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BAR_HEIGHT = 48;
const CHECK_BUTTON_SIZE = 48;
const CHECK_BUTTON_RADIUS = 12;
const CHECK_ICON_SIZE = 32;
const KEYBOARD_OVERLAY_THRESHOLD_PX = 120;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Quick-access character bar shown below (or above the virtual keyboard on
 * mobile) an exercise that requires typing. Each character button inserts
 * the character into the currently focused input field.
 *
 * Three variants:
 *
 * - **standard** – sticky on mobile, inline on desktop (responsive).
 * - **inline** – a flat bar rendered in normal flow (desktop).
 * - **sticky** – fixed to the viewport bottom with a "check" action
 *   button on the right (mobile).
 */
export const KeyboardExtension: React.FC<KeyboardExtensionProps> = ({
  characters,
  variant = "standard",
  onCharacterPress,
  onCheckPress,
  checkDisabled = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSticky =
    variant === "sticky" || (variant === "standard" && isMobile);
  const [keyboardBottomOffset, setKeyboardBottomOffset] = useState(0);

  useEffect(() => {
    if (!isSticky || typeof window === "undefined") {
      setKeyboardBottomOffset(0);
      return;
    }

    const viewport = window.visualViewport;
    if (!viewport) {
      setKeyboardBottomOffset(0);
      return;
    }

    const measureKeyboardInset = () => {
      const overlap = Math.round(
        window.innerHeight - viewport.height - viewport.offsetTop,
      );
      setKeyboardBottomOffset(
        overlap > KEYBOARD_OVERLAY_THRESHOLD_PX ? overlap : 0,
      );
    };

    measureKeyboardInset();
    viewport.addEventListener("resize", measureKeyboardInset);
    viewport.addEventListener("scroll", measureKeyboardInset);
    window.addEventListener("resize", measureKeyboardInset);

    return () => {
      viewport.removeEventListener("resize", measureKeyboardInset);
      viewport.removeEventListener("scroll", measureKeyboardInset);
      window.removeEventListener("resize", measureKeyboardInset);
    };
  }, [isSticky]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: BAR_HEIGHT,
        backgroundColor: "background.paper",
        borderRadius: 1,
        overflow: "hidden",
        ...(isSticky && {
          position: "fixed",
          bottom: `${keyboardBottomOffset}px`,
          left: 0,
          right: 0,
          zIndex: "appBar",
          borderRadius: 0,
          overflow: "visible",
          // Account for bottom safe area on notched devices.
          paddingBottom:
            keyboardBottomOffset > 0 ? 0 : "env(safe-area-inset-bottom, 0px)",
        }),
      }}
    >
      {/* ---- Character buttons ---- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexGrow: 1,
          overflow: "auto",
          px: 2.75,
          // Hide scrollbar while keeping scroll functionality.
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {characters.map((char, idx) => (
          <ButtonBase
            key={idx}
            disableRipple
            // Use onMouseDown + preventDefault so the currently focused
            // input / textarea keeps focus (and the virtual keyboard stays
            // open on mobile).
            onMouseDown={(e) => {
              e.preventDefault();
              onCharacterPress(char);
            }}
            sx={{
              flexShrink: 0,
              minWidth: 44,
              minHeight: 44,
              py: 1.5,
              px: 1.5,
              borderRadius: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "action.hover",
              },
              "&:active": {
                backgroundColor: "action.selected",
              },
            }}
          >
            <Typography
              variant={"codeButton" as TypographyProps["variant"]}
              sx={{ color: "text.primary", userSelect: "none" }}
            >
              {char}
            </Typography>
          </ButtonBase>
        ))}
      </Box>

      {/* ---- Check button (sticky variant only) ---- */}
      {isSticky && (
        <ButtonBase
          disableRipple
          disabled={checkDisabled}
          onMouseDown={(e) => {
            e.preventDefault();
            onCheckPress?.();
          }}
          sx={{
            flexShrink: 0,
            alignSelf: "flex-end",
            width: CHECK_BUTTON_SIZE,
            height: CHECK_BUTTON_SIZE,
            borderRadius: `${CHECK_BUTTON_RADIUS}px`,
            backgroundColor: checkDisabled
              ? "action.disabledBackground"
              : "primary.main",
            mr: 0.5,
            // Elevated: overflow 12px above the keyboard bar.
            mb: "12px",
          }}
        >
          <Icon
            name="check"
            sx={{
              fontSize: CHECK_ICON_SIZE,
              color: checkDisabled ? "text.disabled" : "primary.contrastText",
            }}
          />
        </ButtonBase>
      )}
    </Box>
  );
};

export default KeyboardExtension;
