import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, waitFor } from "storybook/test";

import React, { useEffect, useState } from "react";

import { ExerciseStudyBlockComponentType } from "../../ExerciseStudyBlockComponentTypes";
import { PronunciationAnswer } from "./PronunciationAnswer";

const Harness: React.FC<React.ComponentProps<typeof PronunciationAnswer>> = (
  props,
) => {
  const [mockTranscript, setMockTranscript] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string | null>).detail;
      if (detail === null) {
        setMockTranscript(undefined);
      } else {
        setMockTranscript(detail);
      }
    };
    window.addEventListener("x-mock-transcript", handler as EventListener);
    return () => {
      window.removeEventListener("x-mock-transcript", handler as EventListener);
    };
  }, []);

  return <PronunciationAnswer {...props} mockTranscript={mockTranscript} />;
};

const meta: Meta<typeof PronunciationAnswer> = {
  title: "x/study-session/study-blocks/exercise-components/PronunciationAnswer",
  component: PronunciationAnswer,
  render: (args) => <Harness {...args} />,
};

export default meta;
type Story = StoryObj<typeof PronunciationAnswer>;

export const Base: Story = {
  args: {
    component: {
      id: "pron-1",
      type: ExerciseStudyBlockComponentType.PRONUNCIATION_ANSWER,
      correctAnswer: "hello",
    },
    onAnswerStateChange: fn(),
  },
  play: async ({ args, step }) => {
    await step?.("None", async () => {
      await expect(args.onAnswerStateChange).toHaveBeenCalledWith("NONE");
    });
    await step?.("Correct", async () => {
      window.dispatchEvent(
        new CustomEvent("x-mock-transcript", { detail: "HeLLo" }),
      );
      await waitFor(() =>
        expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("RIGHT"),
      );
    });
    await step?.("Incorrect", async () => {
      window.dispatchEvent(
        new CustomEvent("x-mock-transcript", { detail: "world" }),
      );
      await waitFor(() =>
        expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("WRONG"),
      );
    });
    // Clear mock so story remains usable (use live transcript)
    window.dispatchEvent(
      new CustomEvent("x-mock-transcript", { detail: null }),
    );
  },
};
