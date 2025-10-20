import { ID } from "../../../../../../models/ID";
import { StudyBlockComponentType } from "./StudyBlockComponentTypes";

interface BaseStudyBlockComponent {
  type: StudyBlockComponentType;
}

export interface HeaderComponent extends BaseStudyBlockComponent {
  type: StudyBlockComponentType.HEADER;
  text: string;
}

export interface ParagraphComponent extends BaseStudyBlockComponent {
  type: StudyBlockComponentType.PARAGRAPH;
  text: string;
}

export interface TextAnswerComponent extends BaseStudyBlockComponent {
  id: ID;
  type: StudyBlockComponentType.TEXT_ANSWER;
  correctAnswer: string;

  evaluationStrategy?: "exact" | "case_insensitive";
  variant?: "short" | "long";
  characterButtons?: string[];
}

export type StudyBlockComponentDTO =
  | HeaderComponent
  | ParagraphComponent
  | TextAnswerComponent;
