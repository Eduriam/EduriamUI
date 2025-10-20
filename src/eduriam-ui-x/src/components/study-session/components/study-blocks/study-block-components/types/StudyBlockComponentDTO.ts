import { ID } from "../../../../../../models/ID";
import { StudyBlockComponentType } from "./StudyBlockComponentTypes";

interface BaseStudyBlockComponent {
  type: StudyBlockComponentType;
  id: ID;
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
  type: StudyBlockComponentType.TEXT_ANSWER;
  correctAnswer: string;

  evaluationStrategy?: "exact" | "case_insensitive";
  variant?: "short" | "long";
  characterButtons?: string[];
}

export interface ShortAudioComponent extends BaseStudyBlockComponent {
  type: StudyBlockComponentType.SHORT_AUDIO;
  audioUrl: string;
}

export type StudyBlockComponentDTO =
  | HeaderComponent
  | ParagraphComponent
  | TextAnswerComponent
  | ShortAudioComponent;
