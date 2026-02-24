// Video Manager
export * from "./components/video-manager";

// Audio
export { AudioPlayer, type AudioPlayerSound } from "./audio";

// Main Study Session Component
export { default as StudySession } from "./components/study-session/StudySession";
export type {
  AtomProgressRating,
  IStudySession,
  StudyStats,
} from "./components/study-session/StudySession";

// Study Block Components
export { ExerciseStudyBlock as StudyBlock } from "./components/study-session/components/study-blocks/exercise/ExerciseStudyBlock";
export type { IExerciseStudyBlock as IStudyBlock } from "./components/study-session/components/study-blocks/exercise/ExerciseStudyBlock";

export { StudyBlockComponent } from "./components/study-session/components/study-blocks/exercise/components/StudyBlockComponent";
export type { IStudyBlockComponent } from "./components/study-session/components/study-blocks/exercise/components/StudyBlockComponent";

// Study Session Progress Bar
export { default as StudySessionProgressBar } from "./components/study-session/components/StudySessionProgressBar/StudySessionProgressBar";
export type { IStudySessionProgressBar } from "./components/study-session/components/StudySessionProgressBar/StudySessionProgressBar";

// Study Session Shared Components
export { CodeBlank } from "./components/study-session/components/shared/CodeBlank";
export type { CodeBlankProps } from "./components/study-session/components/shared/CodeBlank";

// Types and Models
export type { StudyBlockComponentDTO } from "./components/study-session/components/study-blocks/exercise/components/StudyBlockComponentDTO";
export { StudyBlockComponentType } from "./components/study-session/components/study-blocks/exercise/components/StudyBlockComponentTypes";
export type { StudyBlockDTO } from "./components/study-session/components/study-blocks/StudyBlockDTO";
export type { AnswerState } from "./components/study-session/types/AnswerState";
export type { StudySessionDTO } from "./components/study-session/types/StudySessionDTO";
export type { StudySessionDataTest } from "./components/study-session/types/StudySessionDataTest";
export type { ID } from "./models/ID";

// Specific Component Types
export type {
  BuildWordComponent,
  CheckListComponent,
  CodeExerciseComponent,
  FillInSentenceComponent,
  HeaderComponent,
  ImageComponent,
  LongAudioComponent,
  MatchingAnswerComponent,
  ParagraphComponent,
  PronunciationAnswerComponent,
  ShortAudioComponent,
  TableFillComponent,
  TextAnswerComponent,
  TimerComponent,
} from "./components/study-session/components/study-blocks/exercise/components/StudyBlockComponentDTO";

// Code Editor Types
export type {
  BrowserTab,
  CodeEditorTab,
  CodeEditorTabType,
  CodeLine,
  CodeSegment,
  FillInBlankTab,
  FillInBlankWithOptionsTab,
  FillInBlankWithoutOptionsTab,
  FillInCodeTab,
  TableTab,
  TerminalTab,
} from "./components/study-session/components/study-blocks/exercise/components/specific/CodeEditor/CodeEditorTypes";

// Code Editor Components
export { CodeEditor } from "./components/study-session/components/study-blocks/exercise/components/specific/CodeEditor/CodeEditor";
export type { CodeEditorProps } from "./components/study-session/components/study-blocks/exercise/components/specific/CodeEditor/CodeEditor";
export { CodeExercise } from "./components/study-session/components/study-blocks/exercise/components/specific/CodeExercise/CodeExercise";
export type { CodeExerciseProps } from "./components/study-session/components/study-blocks/exercise/components/specific/CodeExercise/CodeExercise";
export { CodeOptions } from "./components/study-session/components/study-blocks/exercise/components/specific/CodeOptions/CodeOptions";
export type { CodeOptionsProps } from "./components/study-session/components/study-blocks/exercise/components/specific/CodeOptions/CodeOptions";

// Matching Answer Types
export { MatchOptionType } from "./components/study-session/components/study-blocks/exercise/components/specific/MatchingAnswer/matching-options/MatchOptionDTO";
export type {
  AudioMatchOptionDTO,
  ImageMatchOptionDTO,
  MatchOptionDTO,
  TextMatchOptionDTO,
} from "./components/study-session/components/study-blocks/exercise/components/specific/MatchingAnswer/matching-options/MatchOptionDTO";
