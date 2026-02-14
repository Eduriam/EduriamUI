import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor } from "storybook/test";

import { StudyBlockComponentType } from "../../StudyBlockComponentTypes";
import MatchingAnswer from "./MatchingAnswer";
import { MatchOptionType } from "./matching-options/MatchOptionDTO";

const meta = {
  title: "x/study-session/study-blocks/exercise-components/MatchingAnswer",
  component: MatchingAnswer,
  parameters: { layout: "centered" },
} satisfies Meta<typeof MatchingAnswer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    onAnswerStateChange: fn(),
    component: {
      type: StudyBlockComponentType.MATCHING_ANSWER,
      id: "match-1",
      title: "Match the pairs",
      options1: [
        { type: MatchOptionType.TEXT, text: "cat", matchIndex: 0 },
        { type: MatchOptionType.TEXT, text: "dog", matchIndex: 1 },
      ],
      options2: [
        { type: MatchOptionType.TEXT, text: "chat" },
        { type: MatchOptionType.TEXT, text: "chien" },
      ],
    },
  },
  play: async ({ canvas, args, step }) => {
    await step?.("None", async () => {
      await expect(args.onAnswerStateChange).toHaveBeenCalledWith("NONE");
    });
    await step?.("Correct pair 1", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "cat" }));
      await userEvent.click(canvas.getByRole("button", { name: "chat" }));
      await waitFor(() =>
        expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("NONE"),
      );
    });
    await step?.("Correct pair 2", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "dog" }));
      await userEvent.click(canvas.getByRole("button", { name: "chien" }));
      await waitFor(() =>
        expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("RIGHT"),
      );
    });
  },
};

export const TextToAudio: Story = {
  args: {
    onAnswerStateChange: fn(),
    component: {
      type: StudyBlockComponentType.MATCHING_ANSWER,
      id: "match-2",
      title: "Match word to audio",
      options1: [
        { type: MatchOptionType.TEXT, text: "hello", matchIndex: 0 },
        { type: MatchOptionType.TEXT, text: "bye", matchIndex: 1 },
      ],
      options2: [
        {
          type: MatchOptionType.AUDIO,
          audioUrl: "https://mocks.linguino.org/audio-short.mp3",
        },
        {
          type: MatchOptionType.AUDIO,
          audioUrl: "https://mocks.linguino.org/audio-short.mp3",
        },
      ],
    },
  },
};

export const ImageToText: Story = {
  args: {
    onAnswerStateChange: fn(),
    component: {
      type: StudyBlockComponentType.MATCHING_ANSWER,
      id: "match-3",
      title: "Match image to word",
      options1: [
        {
          type: MatchOptionType.IMAGE,
          imageUrl: "https://picsum.photos/seed/eduriamA/200/200",
          matchIndex: 0,
        },
        {
          type: MatchOptionType.IMAGE,
          imageUrl: "https://picsum.photos/seed/eduriamB/200/200",
          matchIndex: 1,
        },
      ],
      options2: [
        { type: MatchOptionType.TEXT, text: "A" },
        { type: MatchOptionType.TEXT, text: "B" },
      ],
    },
  },
};
