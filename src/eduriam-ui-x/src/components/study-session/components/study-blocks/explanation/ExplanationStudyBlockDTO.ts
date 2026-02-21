import { Scene } from "../../../../video-manager";
import { BaseStudyBlock } from "../StudyBlock";

export interface ExplanationStudyBlockDTO extends BaseStudyBlock {
  type: "explanation";
  scenes: Scene[];
}
