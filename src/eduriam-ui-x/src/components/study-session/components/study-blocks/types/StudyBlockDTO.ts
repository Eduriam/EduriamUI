import { StudyBlockComponentDTO } from "../study-block-components/types/StudyBlockComponentDTO";
import { ID } from "../../../../../models/ID";

export interface StudyBlockDTO {
  type: "exercise" | "explanation";
  atomId: ID;
  components: Array<StudyBlockComponentDTO>;
}
