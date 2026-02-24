export interface MatchOption {
  type: MatchOptionType;
  matchIndex?: number;
}

export enum MatchOptionType {
  TEXT = "text",
  AUDIO = "audio",
  IMAGE = "image",
}

export interface TextMatchOptionDTO extends MatchOption {
  type: MatchOptionType.TEXT;
  text: string;
}

export interface AudioMatchOptionDTO extends MatchOption {
  type: MatchOptionType.AUDIO;
  audioUrl: string;
}

export interface ImageMatchOptionDTO extends MatchOption {
  type: MatchOptionType.IMAGE;
  imageUrl: string;
}

export type MatchOptionDTO =
  | TextMatchOptionDTO
  | AudioMatchOptionDTO
  | ImageMatchOptionDTO;
