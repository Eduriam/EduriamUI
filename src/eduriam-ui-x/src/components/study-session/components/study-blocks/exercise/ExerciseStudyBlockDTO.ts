import { BaseStudyBlock, StudyBlockType } from "../StudyBlock";
import { StudyBlockComponentDTO } from "./components/StudyBlockComponentDTO";

export interface ExerciseStudyBlockContent {
  components: Array<StudyBlockComponentDTO>;
  answerExplanation?: {
    text: string;
  };
}

export interface ExerciseStudyBlockDTO
  extends BaseStudyBlock<typeof StudyBlockType.Exercise, ExerciseStudyBlockContent> {
  type: typeof StudyBlockType.Exercise;
  content: ExerciseStudyBlockContent;
}
