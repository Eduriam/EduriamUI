import { Scene } from "../../../../video-manager";
import { BaseStudyBlock, StudyBlockType } from "../StudyBlock";

export interface ExplanationStudyBlockContent {
  scenes: Scene[];
}

export interface ExplanationStudyBlockDTO
  extends BaseStudyBlock<
    typeof StudyBlockType.Explanation,
    ExplanationStudyBlockContent
  > {
  type: typeof StudyBlockType.Explanation;
  content: ExplanationStudyBlockContent;
}
