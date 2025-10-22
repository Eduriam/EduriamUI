import React from "react";
import { AnswerState } from "../../../types/AnswerState";
import { StudyBlockComponentDTO } from "./types/StudyBlockComponentDTO";
import { StudyBlockComponentType } from "./types/StudyBlockComponentTypes";
import { Header } from "./specific/Header/Header";
import { Paragraph } from "./specific/Paragraph/Paragraph";
import { TextAnswer } from "./specific/TextAnswer/TextAnswer";
import { ShortAudio } from "./specific/ShortAudio/ShortAudio";
import { LongAudio } from "./specific/LongAudio/LongAudio";
import Image from "./specific/Image/Image";

export interface IStudyBlockComponent {
  component: StudyBlockComponentDTO;
  onAnswerStateChange?: (answer: AnswerState) => void;
}

export const StudyBlockComponent: React.FC<IStudyBlockComponent> = ({
  component,
  onAnswerStateChange,
}) => {
  switch (component.type) {
    case StudyBlockComponentType.HEADER:
      return <Header component={component} />;
    case StudyBlockComponentType.PARAGRAPH:
      return <Paragraph component={component} />;
    case StudyBlockComponentType.TEXT_ANSWER:
      return (
        <TextAnswer
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case StudyBlockComponentType.SHORT_AUDIO:
      return <ShortAudio component={component} />;
    case StudyBlockComponentType.LONG_AUDIO:
      return <LongAudio component={component} />;
    case StudyBlockComponentType.IMAGE:
      return <Image component={component} />;
    default:
      return null;
  }
};
