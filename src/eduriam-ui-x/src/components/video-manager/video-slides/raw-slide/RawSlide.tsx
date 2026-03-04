import { AbsoluteFill, Sequence } from "remotion";

import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import type {
  BackgroundComponent,
  VideoComponent,
  VideoComponentColumn,
} from "../../video-components/VideoComponent";
import type { IBackgroundColor } from "../../video-components/components/BackgroundColor/BackgroundColor";
import { BackgroundColor } from "../../video-components/components/BackgroundColor/BackgroundColor";
import type { IBackgroundImage } from "../../video-components/components/BackgroundImage/BackgroundImage";
import { BackgroundImage } from "../../video-components/components/BackgroundImage/BackgroundImage";
import {
  BackgroundVideo,
  type IBackgroundVideo,
} from "../../video-components/components/BackgroundVideo/BackgroundVideo";
import { VideoComponentFactory } from "../../video-components/factory/VideoComponentFactory";
import type { BaseSlide } from "../BaseSlide";
import { Column } from "./Column";

const COLUMN_ORDER: VideoComponentColumn[] = ["first", "second", "third"];
const COLUMN_INDEX: Record<VideoComponentColumn, number> = {
  first: 0,
  second: 1,
  third: 2,
};

export interface IRawSlide extends BaseSlide {
  type: "RAW";
  components: VideoComponent[];
  backgroundComponents?: BackgroundComponent[];
}

export interface IRawSlideProps {
  slide: IRawSlide;
  fps: number;
}

const groupByColumn = (
  components: VideoComponent[],
): Record<VideoComponentColumn, VideoComponent[]> => {
  const grouped: Record<VideoComponentColumn, VideoComponent[]> = {
    first: [],
    second: [],
    third: [],
  };

  components.forEach((component) => {
    grouped[component.column].push(component);
  });

  return grouped;
};

const resolveVisibleColumns = (
  components: VideoComponent[],
): VideoComponentColumn[] => {
  if (components.length === 0) {
    return [];
  }

  const maxColumnIndex = components.reduce(
    (max, component) => Math.max(max, COLUMN_INDEX[component.column]),
    0,
  );

  return COLUMN_ORDER.slice(0, maxColumnIndex + 1);
};

/**
 * Renders a {@link IRawSlide} by laying out its components.
 *
 * Background components are rendered as full-fill layers;
 * all other components are placed in responsive columns and
 * displayed in each column based on their order in `components`.
 */
export const RawSlide: React.FC<IRawSlideProps> = ({ slide, fps }) => {
  const theme = useTheme();
  const { components, backgroundComponents = [] } = slide;

  const bg = backgroundComponents.find((c) => c.type === "BACKGROUND_COLOR") as
    | IBackgroundColor
    | undefined;
  const bgImg = backgroundComponents.find(
    (c) => c.type === "BACKGROUND_IMAGE",
  ) as IBackgroundImage | undefined;
  const bgVid = backgroundComponents.find((c) => c.type === "BACKGROUND_VIDEO") as
    | IBackgroundVideo
    | undefined;

  const componentsByColumn = groupByColumn(components);
  const visibleColumns = resolveVisibleColumns(components);

  return (
    <AbsoluteFill>
      {bg ? (
        <BackgroundColor comp={bg} />
      ) : bgImg ? (
        <BackgroundImage comp={bgImg} />
      ) : bgVid ? (
        <BackgroundVideo comp={bgVid} />
      ) : (
        <AbsoluteFill
          style={{ backgroundColor: theme.palette.background.default }}
        />
      )}

      <AbsoluteFill style={{ boxSizing: "border-box", padding: "24px" }}>
        <Stack
          width="100%"
          height="100%"
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3, sm: 4 }}
        >
          {visibleColumns.map((column) => (
            <Column key={column}>
              {componentsByColumn[column].map((component, index) => {
                const startMs = component.startTime ?? 0;
                const startFrame = Math.max(
                  0,
                  Math.round((startMs / 1000) * fps),
                );
                const key =
                  (component as { id?: string }).id ??
                  `component-${column}-${index}`;

                return (
                  <Sequence key={key} from={startFrame} layout="none">
                    <Box
                      sx={{
                        width: "100%",
                        flex: 1,
                        minHeight: 0,
                        position: "relative",
                      }}
                    >
                      {VideoComponentFactory.renderComponent(component)}
                    </Box>
                  </Sequence>
                );
              })}
            </Column>
          ))}
        </Stack>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default RawSlide;

