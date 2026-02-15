import type { Meta, StoryObj } from "@storybook/react";

import { Box, TextField } from "@mui/material";

import { KeyboardExtension } from "./KeyboardExtension";

const HTML_CHARACTERS = ["<", ">", "/", "=", '"', "(", ")", "{", "}"];
const CSS_CHARACTERS = ["{", "}", ":", ";", "#", ".", "(", ")", ","];

const meta: Meta<typeof KeyboardExtension> = {
  title: "core/inputs/KeyboardExtension",
  component: KeyboardExtension,
  argTypes: {
    variant: { control: "inline-radio", options: ["inline", "sticky"] },
    checkDisabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof KeyboardExtension>;

export const Inline: Story = {
  args: {
    characters: HTML_CHARACTERS,
    variant: "inline",
    onCharacterPress: (char: string) => console.log("Character pressed:", char),
  },
};

export const Sticky: Story = {
  args: {
    characters: HTML_CHARACTERS,
    variant: "sticky",
    onCharacterPress: (char: string) => console.log("Character pressed:", char),
    onCheckPress: () => console.log("Check pressed"),
    checkDisabled: false,
  },
};

export const StickyDisabled: Story = {
  args: {
    characters: CSS_CHARACTERS,
    variant: "sticky",
    onCharacterPress: (char: string) => console.log("Character pressed:", char),
    onCheckPress: () => console.log("Check pressed"),
    checkDisabled: true,
  },
};

/**
 * Demonstrates the keyboard extension inserting characters into a focused
 * input field. Click on the input, then press the character buttons.
 */
export const WithInputField: Story = {
  render: () => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
        <TextField label="Try typing here" variant="outlined" size="small" />
        <KeyboardExtension
          characters={HTML_CHARACTERS}
          variant="inline"
          onCharacterPress={(char) => {
            const el = document.activeElement;
            if (
              el instanceof HTMLInputElement ||
              el instanceof HTMLTextAreaElement
            ) {
              const start = el.selectionStart ?? el.value.length;
              const end = el.selectionEnd ?? el.value.length;

              // Use native setter to trigger React's onChange.
              const setter = Object.getOwnPropertyDescriptor(
                Object.getPrototypeOf(el),
                "value",
              )?.set;
              setter?.call(
                el,
                el.value.slice(0, start) + char + el.value.slice(end),
              );
              el.dispatchEvent(new Event("input", { bubbles: true }));

              const newPos = start + char.length;
              el.setSelectionRange(newPos, newPos);
            }
          }}
        />
      </Box>
    );
  },
};
