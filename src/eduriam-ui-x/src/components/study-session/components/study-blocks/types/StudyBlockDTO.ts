import { ID } from "../../../../../models/ID";
import { StudyBlockComponentDTO } from "../study-block-components/types/StudyBlockComponentDTO";

export interface StudyBlockDTO {
  type: "exercise" | "explanation";
  atomId: ID;
  components: Array<StudyBlockComponentDTO>;
}
