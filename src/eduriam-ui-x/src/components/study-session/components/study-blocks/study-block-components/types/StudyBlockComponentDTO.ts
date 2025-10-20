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

export type StudyBlockComponentDTO = HeaderComponent | ParagraphComponent;
