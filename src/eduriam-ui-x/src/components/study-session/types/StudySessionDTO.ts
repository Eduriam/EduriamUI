import { StudyBlockDTO } from "../components/study-blocks/StudyBlockDTO";
import { IDString } from "../../../models/ID";

export interface StudySessionDTO {
  id: IDString;
  studyBlocks: Array<StudyBlockDTO>;
}
