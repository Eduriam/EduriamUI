import React from "react";

import type { ICodeExplainer } from "../../../video-components/components/CodeExplainer/CodeExplainer";
import type { BaseSlide } from "../../BaseSlide";
import type { IRawSlide } from "../../raw-slide/RawSlide";
import { RawSlide } from "../../raw-slide/RawSlide";

export interface ICodeExplanationSlide extends BaseSlide {
  type: "CODE_EXPLANATION";
  codeExplanation: Pick<ICodeExplainer, "steps" | "id">;
}

export interface ICodeExplanationSlideProps {
  slide: ICodeExplanationSlide;
  fps: number;
}

/**
 * Renders a single centered code explanation panel through RAW slide composition.
 */
export const CodeExplanationSlide: React.FC<ICodeExplanationSlideProps> = ({
  slide,
  fps,
}) => {
  const rawSlide: IRawSlide = {
    id: slide.id,
    type: "RAW",
    startTime: slide.startTime,
    components: [
      {
        ...slide.codeExplanation,
        type: "CODE_EXPLAINER",
        column: "first",
        startTime: 0,
      },
    ],
  };

  return <RawSlide slide={rawSlide} fps={fps} />;
};

export default CodeExplanationSlide;
