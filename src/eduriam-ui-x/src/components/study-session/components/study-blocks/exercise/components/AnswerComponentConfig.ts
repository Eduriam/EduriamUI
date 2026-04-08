import { ExerciseStudyBlockComponentDTO } from "./ExerciseStudyBlockComponentDTO";
import { ExerciseStudyBlockComponentType } from "./ExerciseStudyBlockComponentTypes";

export const ANSWER_COMPONENT_TYPES: ExerciseStudyBlockComponentType[] = [
  ExerciseStudyBlockComponentType.TEXT_ANSWER,
  ExerciseStudyBlockComponentType.MULTIPLE_CHOICE,
  ExerciseStudyBlockComponentType.CHECKLIST,
  ExerciseStudyBlockComponentType.PRONUNCIATION_ANSWER,
  ExerciseStudyBlockComponentType.TABLE_FILL,
  ExerciseStudyBlockComponentType.FILL_IN_SENTENCE,
  ExerciseStudyBlockComponentType.BUILD_WORD,
  ExerciseStudyBlockComponentType.MATCHING_ANSWER,
  ExerciseStudyBlockComponentType.CODE_EXERCISE,
];

const ANSWER_COMPONENT_TYPE_SET = new Set<ExerciseStudyBlockComponentType>(
  ANSWER_COMPONENT_TYPES,
);

export function isAnswerComponent(
  component: ExerciseStudyBlockComponentDTO,
): boolean {
  return ANSWER_COMPONENT_TYPE_SET.has(component.type);
}
