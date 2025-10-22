import React from "react";

import { AnswerState } from "../../../types/AnswerState";
import { CheckList } from "./specific/CheckList/CheckList";
import { Header } from "./specific/Header/Header";
import Image from "./specific/Image/Image";
import { LongAudio } from "./specific/LongAudio/LongAudio";
import { Paragraph } from "./specific/Paragraph/Paragraph";
import { ShortAudio } from "./specific/ShortAudio/ShortAudio";
import { TextAnswer } from "./specific/TextAnswer/TextAnswer";
import Timer from "./specific/Timer/Timer";
import { StudyBlockComponentDTO } from "./types/StudyBlockComponentDTO";
import { StudyBlockComponentType } from "./types/StudyBlockComponentTypes";

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
    case StudyBlockComponentType.TIMER:
      return <Timer component={component} />;
    case StudyBlockComponentType.CHECKLIST:
      return (
        <CheckList
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    default:
      return null;
  }
};
