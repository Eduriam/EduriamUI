import { BaseStudyBlock, StudyBlockType } from "../StudyBlock";
import { ExerciseStudyBlockComponentDTO } from "./components/ExerciseStudyBlockComponentDTO";

export interface ExerciseStudyBlockContent {
  components: Array<ExerciseStudyBlockComponentDTO>;
  answerExplanation?: {
    text: string;
  };
}

export interface ExerciseStudyBlockDTO extends BaseStudyBlock<
  typeof StudyBlockType.Exercise,
  ExerciseStudyBlockContent
> {
  type: typeof StudyBlockType.Exercise;
  content: ExerciseStudyBlockContent;
}
