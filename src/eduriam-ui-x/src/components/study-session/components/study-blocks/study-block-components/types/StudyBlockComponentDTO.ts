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

export interface LongAudioComponent extends BaseStudyBlockComponent {
  type: StudyBlockComponentType.LONG_AUDIO;
  audioUrl: string;
}

export interface ImageComponent extends BaseStudyBlockComponent {
  type: StudyBlockComponentType.IMAGE;
  url: string;
  alt?: string;
  size?: "small" | "medium" | "large";
}

export interface TimerComponent extends BaseStudyBlockComponent {
  type: StudyBlockComponentType.TIMER;
  seconds: number;
}

export interface CheckListComponent extends BaseStudyBlockComponent {
  type: StudyBlockComponentType.CHECKLIST;
  items: string[];
}

export interface PronunciationAnswerComponent extends BaseStudyBlockComponent {
  type: StudyBlockComponentType.PRONUNCIATION_ANSWER;
  id: ID;
  correctAnswer: string;
}

export type StudyBlockComponentDTO =
  | HeaderComponent
  | ParagraphComponent
  | TextAnswerComponent
  | ShortAudioComponent
  | LongAudioComponent
  | ImageComponent
  | TimerComponent
  | CheckListComponent
  | PronunciationAnswerComponent;
