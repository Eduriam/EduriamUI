// Main Study Session Component
export { default as StudySession } from "./components/study-session/StudySession";
export type {
  StudyStats,
  AtomProgressRating,
  IStudySession,
} from "./components/study-session/StudySession";

// Study Block Components
export { StudyBlock } from "./components/study-session/components/study-blocks/StudyBlock";
export type { IStudyBlock } from "./components/study-session/components/study-blocks/StudyBlock";

export { StudyBlockComponent } from "./components/study-session/components/study-blocks/study-block-components/StudyBlockComponent";
export type { IStudyBlockComponent } from "./components/study-session/components/study-blocks/study-block-components/StudyBlockComponent";

// Study Session Progress Bar
export { default as StudySessionProgressBar } from "./components/study-session/components/study-session-progress-bar/StudySessionProgressBar";

// Types and Models
export type { ID } from "./models/ID";
export type { AnswerState } from "./components/study-session/types/AnswerState";
export type { StudySessionDTO } from "./components/study-session/types/StudySessionDTO";
export type { StudyBlockDTO } from "./components/study-session/components/study-blocks/types/StudyBlockDTO";
export type { StudyBlockComponentDTO } from "./components/study-session/components/study-blocks/study-block-components/types/StudyBlockComponentDTO";
export { StudyBlockComponentType } from "./components/study-session/components/study-blocks/study-block-components/types/StudyBlockComponentTypes";

// Specific Component Types
export type {
  HeaderComponent,
  ParagraphComponent,
  TextAnswerComponent,
  ShortAudioComponent,
  LongAudioComponent,
  ImageComponent,
  TimerComponent,
  CheckListComponent,
  PronunciationAnswerComponent,
  TableFillComponent,
  FillInSentenceComponent,
  BuildWordComponent,
  MatchingAnswerComponent,
} from "./components/study-session/components/study-blocks/study-block-components/types/StudyBlockComponentDTO";

// Matching Answer Types
export type {
  MatchOptionDTO,
  TextMatchOptionDTO,
  AudioMatchOptionDTO,
  ImageMatchOptionDTO,
} from "./components/study-session/components/study-blocks/study-block-components/specific/MatchingAnswer/matching-options/MatchOptionDTO";
export { MatchOptionType } from "./components/study-session/components/study-blocks/study-block-components/specific/MatchingAnswer/matching-options/MatchOptionDTO";
