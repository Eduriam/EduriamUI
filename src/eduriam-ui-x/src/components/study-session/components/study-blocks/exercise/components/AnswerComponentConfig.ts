import { StudyBlockComponentDTO } from "./StudyBlockComponentDTO";
import { StudyBlockComponentType } from "./StudyBlockComponentTypes";

export const ANSWER_COMPONENT_TYPES: StudyBlockComponentType[] = [
  StudyBlockComponentType.TEXT_ANSWER,
  StudyBlockComponentType.MULTIPLE_CHOICE,
  StudyBlockComponentType.CHECKLIST,
  StudyBlockComponentType.PRONUNCIATION_ANSWER,
  StudyBlockComponentType.TABLE_FILL,
  StudyBlockComponentType.FILL_IN_SENTENCE,
  StudyBlockComponentType.BUILD_WORD,
  StudyBlockComponentType.MATCHING_ANSWER,
  StudyBlockComponentType.CODE_EXERCISE,
];

const ANSWER_COMPONENT_TYPE_SET = new Set<StudyBlockComponentType>(
  ANSWER_COMPONENT_TYPES,
);

export function isAnswerComponent(
  component: StudyBlockComponentDTO,
): boolean {
  return ANSWER_COMPONENT_TYPE_SET.has(component.type);
}

