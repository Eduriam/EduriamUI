import { BaseStudyBlock } from "../StudyBlock";
import { StudyBlockComponentDTO } from "./components/StudyBlockComponentDTO";

export interface ExerciseStudyBlockDTO extends BaseStudyBlock {
  type: "exercise";
  mode?: "learn" | "review";
  components: Array<StudyBlockComponentDTO>;
  answerExplanation?: {
    text: string;
  };
}
