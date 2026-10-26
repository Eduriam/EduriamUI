import { Player, type PlayerRef } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import React, { useRef } from "react";

import { SlideFactory } from "../../../factory/SlideFactory";
import type { IRawSlideProps } from "../../../raw-slide/RawSlide";
import { type ITwoHeaderSlide, TwoHeaderSlide } from "./TwoHeaderSlide";

function FactoryPreview({
  slide,
  fps,
}: {
  slide: ITwoHeaderSlide;
  fps: number;
}) {
  return <>{SlideFactory.renderSlide(slide, fps)}</>;
}

function TemplatePreview({ slide }: { slide: ITwoHeaderSlide }) {
  const player = useRef<PlayerRef>(null);
  return (
    <div>
      <Player
        ref={player}
        component={FactoryPreview}
        inputProps={{ slide, fps: 30 }}
        durationInFrames={180}
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        style={{ width: "100%" }}
        controls
      />
      <button onClick={() => player.current?.seekTo(0)}>Show beginning</button>
      <button onClick={() => player.current?.seekTo(60)}>
        Show both headers
      </button>
    </div>
  );
}
const meta: Meta<typeof TemplatePreview> = {
  title: "x/video-manager/video-slides/TwoHeaderSlide",
  component: TemplatePreview,
};
export default meta;
type Story = StoryObj<typeof TemplatePreview>;
const slide: ITwoHeaderSlide = {
  id: "two-headers",
  type: "TWO_HEADER",
  startTime: 0,
  leftHeader: { id: "left-label", text: "Apples", startTime: 0 },
  rightHeader: { id: "right-label", text: "Bananas", startTime: 0 },
};

export const Default: Story = {
  args: { slide },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvas.getByText("Apples", { exact: true })).toBeVisible();
      expect(canvas.getByText("Bananas", { exact: true })).toBeVisible();
    });
    const raw = TwoHeaderSlide({
      slide,
      fps: 30,
    }) as React.ReactElement<IRawSlideProps>;
    expect(
      raw.props.slide.components.map((c) => ({
        id: c.id,
        column: c.column,
        startTime: c.startTime,
      })),
    ).toEqual([
      { id: "left-label", column: "first", startTime: 0 },
      { id: "right-label", column: "second", startTime: 0 },
    ]);
    expect(
      canvas.getByText("Apples", { exact: true }).getBoundingClientRect().left,
    ).toBeLessThan(
      canvas.getByText("Bananas", { exact: true }).getBoundingClientRect().left,
    );
  },
};
export const Staggered: Story = {
  args: {
    slide: { ...slide, rightHeader: { ...slide.rightHeader, startTime: 1500 } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Show beginning" }),
    );
    await waitFor(() => {
      expect(canvas.getByText("Apples", { exact: true })).toBeVisible();
      expect(
        canvas.queryByText("Bananas", { exact: true }),
      ).not.toBeInTheDocument();
    });
    await userEvent.click(
      canvas.getByRole("button", { name: "Show both headers" }),
    );
    await waitFor(() =>
      expect(canvas.getByText("Bananas", { exact: true })).toBeVisible(),
    );
  },
};
