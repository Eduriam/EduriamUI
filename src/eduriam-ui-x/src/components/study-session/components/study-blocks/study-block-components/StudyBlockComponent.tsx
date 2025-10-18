import React from "react";
import { AnswerState } from "../../../types/AnswerState";
import { StudyBlockComponentDTO } from "./types/StudyBlockComponentDTO";
import { StudyBlockComponentType } from "./types/StudyBlockComponentTypes";
import { Header } from "./specific/Header/Header";
import { Paragraph } from "./specific/Paragraph/Paragraph";

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
      return (
        <Header
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case StudyBlockComponentType.PARAGRAPH:
      return (
        <Paragraph
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    default:
      return null;
  }
};
