import { StudyBlockComponentType } from "./StudyBlockComponentTypes";

interface BaseStudyBlockComponent {
  type: StudyBlockComponentType;
}

export interface HeaderComponent extends BaseStudyBlockComponent {
  type: StudyBlockComponentType.HEADER;
  headerText: string;
}

export interface ParagraphComponent extends BaseStudyBlockComponent {
  type: StudyBlockComponentType.PARAGRAPH;
  paragraphText: string;
}

export type StudyBlockComponentDTO = HeaderComponent | ParagraphComponent;
