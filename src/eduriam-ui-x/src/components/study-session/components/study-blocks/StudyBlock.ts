import { ID } from "../../../../models/ID";

export type BaseStudyBlock = {
  type: "exercise" | "explanation";
  atomId: ID;
  id: ID;
};
