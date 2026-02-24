import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { LargeButton } from "@eduriam/ui-core";
import Box from "@mui/material/Box";

import { STUDY_SESSION_LOCALIZATION_DEFAULT } from "../../StudySessionLocalizationDefault";

import StudySessionDrawer from "./StudySessionDrawer";

const meta: Meta<typeof StudySessionDrawer> = {
  title: "x/study-session/StudySessionDrawer",
  component: StudySessionDrawer,
  args: {
    localization: STUDY_SESSION_LOCALIZATION_DEFAULT,
  },
};

export default meta;
type Story = StoryObj<typeof StudySessionDrawer>;

export const WithoutExplanation: Story = {
  args: {
    variant: "correct",
    onReportClick: () => {},
    onContinueClick: () => {},
  },
};

export const WithExplanation: Story = {
  args: {
    variant: "incorrect",
    onExplanationClick: () => {},
    onReportClick: () => {},
    onContinueClick: () => {},
  },
};

export const WithSkipExercise: Story = {
  args: {
    variant: "incorrect",
    allowSkipExercise: true,
    onExplanationClick: () => {},
    onReportClick: () => {},
    onContinueClick: () => {},
    onSkipExerciseClick: () => {},
  },
};

function DrawerWithOpenButton(
  args: React.ComponentProps<typeof StudySessionDrawer>
) {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<"correct" | "incorrect">("correct");
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        <LargeButton
          variant="contained"
          color="success"
          onClick={() => {
            setVariant("correct");
            setOpen(true);
          }}
        >
          Open drawer (correct)
        </LargeButton>
        <LargeButton
          variant="contained"
          color="error"
          onClick={() => {
            setVariant("incorrect");
            setOpen(true);
          }}
        >
          Open drawer (incorrect)
        </LargeButton>
      </Box>
      {open && (
        <StudySessionDrawer
          {...args}
          variant={variant}
          onContinueClick={() => setOpen(false)}
          onReportClick={() => {}}
        />
      )}
    </Box>
  );
}

/**
 * Toggle the drawer with a button to test open/close and sound playback.
 * Click "Open drawer" to show it (sound plays), then "Continue" to close.
 */
export const OpenAndClose: Story = {
  render: (args) => <DrawerWithOpenButton {...args} />,
  args: {
    variant: "correct",
    onExplanationClick: () => {},
    onReportClick: () => {},
    onContinueClick: () => {},
  },
};

