import { BaseStudyBlock } from "../StudyBlock";
import { StudyBlockComponentDTO } from "./components/StudyBlockComponentDTO";

export interface ExerciseStudyBlockDTO extends BaseStudyBlock {
  type: "exercise";
  components: Array<StudyBlockComponentDTO>;
}
