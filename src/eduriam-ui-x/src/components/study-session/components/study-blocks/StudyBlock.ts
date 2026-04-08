import { ID } from "../../../../models/ID";

export type StudyBlockType =
  (typeof StudyBlockType)[keyof typeof StudyBlockType];

export const StudyBlockType = {
  Exercise: 0,
  Explanation: 1,
} as const;

export type StudyBlockMode =
  (typeof StudyBlockMode)[keyof typeof StudyBlockMode];

export const StudyBlockMode = {
  Learn: 0,
  Review: 1,
} as const;

export type BaseStudyBlock<
  TType extends StudyBlockType = StudyBlockType,
  TContent = unknown,
> = {
  type: TType;
  mode: StudyBlockMode;
  atomId: ID;
  id: ID;
  content: TContent;
};
