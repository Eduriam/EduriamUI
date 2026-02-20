import React from "react";
import { AbsoluteFill, Audio, Sequence, useVideoConfig } from "remotion";
import type { SceneComponent } from "./components/SceneComponent";
import type { VideoDefinition } from "./types/VideoDefinition";
import type { IBackgroundColor } from "./components/BackgroundColor/BackgroundColor";
import type { IBackgroundImage } from "./components/BackgroundImage/BackgroundImage";
import type { IBackgroundVideo } from "./components/BackgroundVideo/BackgroundVideo";
import type { IHeader } from "./components/Header/Header";
import type { IPageHeader } from "./components/PageHeader/PageHeader";
import type { IPageSubheader } from "./components/PageSubheader/PageSubheader";
import type { IParagraph } from "./components/Paragraph/Paragraph";
import type { IList } from "./components/List/List";
import type { ITable } from "./components/Table/Table";
import type { IImage } from "./components/Image/Image";
import type { IVideo } from "./components/Video/Video";
import { BackgroundColor } from "./components/BackgroundColor/BackgroundColor";
import { BackgroundImage } from "./components/BackgroundImage/BackgroundImage";
import { BackgroundVideo } from "./components/BackgroundVideo/BackgroundVideo";
import { Header } from "./components/Header/Header";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { PageSubheader } from "./components/PageSubheader/PageSubheader";
import { Paragraph } from "./components/Paragraph/Paragraph";
import { List } from "./components/List/List";
import { Table } from "./components/Table/Table";
import { Image } from "./components/Image/Image";
import { Video } from "./components/Video/Video";

function renderComponent(comp: SceneComponent): React.ReactNode {
  switch (comp.type) {
    case "HEADER":
      return <Header comp={comp as IHeader} />;
    case "PAGE_HEADER":
      return <PageHeader comp={comp as IPageHeader} />;
    case "PAGE_SUBHEADER":
      return <PageSubheader comp={comp as IPageSubheader} />;
    case "PARAGRAPH":
      return <Paragraph comp={comp as IParagraph} />;
    case "LIST":
      return <List comp={comp as IList} />;
    case "TABLE":
      return <Table comp={comp as ITable} />;
    case "IMAGE":
      return <Image comp={comp as IImage} />;
    case "VIDEO":
      return <Video comp={comp as IVideo} />;
    default:
      return null;
  }
}

interface CompositionProps {
  components: SceneComponent[];
  audioUrl?: string | null;
  componentStartMs?: number[];
}

const Composition: React.FC<CompositionProps> = ({
  components,
  audioUrl,
  componentStartMs = [],
}) => {
  const { fps } = useVideoConfig();

  const bg = components.find((c) => c.type === "BACKGROUND_COLOR") as
    | IBackgroundColor
    | undefined;
  const bgImg = components.find((c) => c.type === "BACKGROUND_IMAGE") as
    | IBackgroundImage
    | undefined;
  const bgVid = components.find((c) => c.type === "BACKGROUND_VIDEO") as
    | IBackgroundVideo
    | undefined;

  const others = components
    .filter(
      (c) =>
        c.type !== "BACKGROUND_COLOR" &&
        c.type !== "BACKGROUND_IMAGE" &&
        c.type !== "BACKGROUND_VIDEO",
    )
    .sort((a, b) => {
      const ai = (a as { id?: string }).id ?? "";
      const bi = (b as { id?: string }).id ?? "";
      return ai.localeCompare(bi);
    });

  return (
    <AbsoluteFill>
      {audioUrl ? <Audio src={audioUrl} /> : null}

      {bg ? (
        <BackgroundColor comp={bg} />
      ) : bgImg ? (
        <BackgroundImage comp={bgImg} />
      ) : bgVid ? (
        <BackgroundVideo comp={bgVid} />
      ) : (
        <AbsoluteFill style={{ backgroundColor: "black" }} />
      )}

      {others.map((c, idx) => {
        const startMs = componentStartMs[idx] ?? 0;
        const startFrame = Math.max(0, Math.round((startMs / 1000) * fps));
        const key = (c as { id?: string }).id ?? `comp-${idx}`;
        return (
          <Sequence key={key} from={startFrame}>
            {renderComponent(c)}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export interface VideoBuilderResult {
  Component: React.FC;
  durationInFrames: number;
  fps: number;
  compositionWidth: number;
  compositionHeight: number;
}

/**
 * Static builder for Remotion video compositions.
 * Use {@link VideoBuilder.buildVideo} to create a composition from a {@link VideoDefinition}.
 */
export class VideoBuilder {
  /**
   * Builds a Remotion composition from a `VideoDefinition`.
   *
   * Returns the composition React component together with the metadata
   * required by the Remotion Player (duration, fps, dimensions).
   */
  static buildVideo(definition: VideoDefinition): VideoBuilderResult {
    const {
      durationInFrames,
      fps,
      compositionWidth,
      compositionHeight,
      components = [],
      audioUrl,
      componentStartMs,
    } = definition;

    const Component: React.FC = () => (
      <Composition
        components={components}
        audioUrl={audioUrl}
        componentStartMs={componentStartMs}
      />
    );

    return { Component, durationInFrames, fps, compositionWidth, compositionHeight };
  }
}
