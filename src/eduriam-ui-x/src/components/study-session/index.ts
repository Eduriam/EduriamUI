// Main Study Session Component
export { default as StudySession } from "./StudySession";
export type { AtomProgressRating, IStudySession } from "./StudySession";

// Study Block Components
export { ExerciseStudyBlock as StudyBlock } from "./components/study-blocks/exercise/ExerciseStudyBlock";
export type { IExerciseStudyBlock as IStudyBlock } from "./components/study-blocks/exercise/ExerciseStudyBlock";

export { StudyBlockComponent } from "./components/study-blocks/exercise/components/StudyBlockComponent";
export type { IStudyBlockComponent } from "./components/study-blocks/exercise/components/StudyBlockComponent";

// Explanation Study Block
export { ExplanationStudyBlock } from "./components/study-blocks/explanation/ExplanationStudyBlock";
export type { IExplanationStudyBlock } from "./components/study-blocks/explanation/ExplanationStudyBlock";

// Study Session Progress Bar
export { default as StudySessionProgressBar } from "./components/StudySessionProgressBar/StudySessionProgressBar";
export type { IStudySessionProgressBar } from "./components/StudySessionProgressBar/StudySessionProgressBar";

// Study Session Shared Components
export { CodeBlank } from "./components/shared/CodeBlank";
export type { CodeBlankProps } from "./components/shared/CodeBlank";
export { ReportStudyBlockDialog } from "./components/shared/ReportStudyBlockDialog";
export type {
  ReportStudyBlockDialogDataTest,
  ReportStudyBlockDialogLocalization,
  ReportStudyBlockDialogSubmitPayload,
} from "./components/shared/ReportStudyBlockDialog";

// Types and Models
export type { MultipleChoiceExerciseDataTest } from "./components/study-blocks/exercise/components/specific/MultipleChoiceExercise/MultipleChoiceExercise";
export type { StudyBlockComponentDTO } from "./components/study-blocks/exercise/components/StudyBlockComponentDTO";
export { StudyBlockComponentType } from "./components/study-blocks/exercise/components/StudyBlockComponentTypes";
export type { ExerciseStudyBlockDTO } from "./components/study-blocks/exercise/ExerciseStudyBlockDTO";
export type { ExplanationStudyBlockDTO } from "./components/study-blocks/explanation/ExplanationStudyBlockDTO";
export type { BaseStudyBlock } from "./components/study-blocks/StudyBlock";
export type { StudyBlockDTO } from "./components/study-blocks/StudyBlockDTO";
export type { SelectedStudyBlockData } from "./StudySession";
export type { AnswerState } from "./types/AnswerState";
export type { StudySessionDataTest } from "./types/StudySessionDataTest";
export type { StudySessionDTO } from "./types/StudySessionDTO";
export type { StudySessionLocalization } from "./types/StudySessionLocalization";

// Specific Component Types
export type {
  ArchitectureDiagramComponent,
  BaseStudyBlockComponent,
  BuildWordComponent,
  CheckListComponent,
  ClassDiagramComponent,
  CodeExerciseComponent,
  EntityRelationshipDiagramComponent,
  FillInSentenceComponent,
  FlowchartDiagramComponent,
  GitGraphDiagramComponent,
  LongAudioComponent,
  MatchingAnswerComponent,
  MultipleChoiceExerciseComponent,
  MultipleChoiceExerciseOptionDTO,
  ParagraphComponent,
  PronunciationAnswerComponent,
  ShortAudioComponent,
  StateDiagramComponent,
  HeaderComponent as StudyHeaderComponent,
  ImageComponent as StudyImageComponent,
  TableFillComponent,
  TextAnswerComponent,
  TimerComponent,
} from "./components/study-blocks/exercise/components/StudyBlockComponentDTO";

// Code Editor Types
export { PASSIVE_TAB_TYPES } from "./components/study-blocks/exercise/components/specific/CodeEditor/CodeEditorTypes";
export type {
  BaseTab,
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
} from "./components/study-blocks/exercise/components/specific/CodeEditor/CodeEditorTypes";

// Code Editor Components
export { CodeEditor } from "./components/study-blocks/exercise/components/specific/CodeEditor/CodeEditor";
export type { CodeEditorProps } from "./components/study-blocks/exercise/components/specific/CodeEditor/CodeEditor";
export { CodeExercise } from "./components/study-blocks/exercise/components/specific/CodeExercise/CodeExercise";
export type { CodeExerciseProps } from "./components/study-blocks/exercise/components/specific/CodeExercise/CodeExercise";
export { CodeOptions } from "./components/study-blocks/exercise/components/specific/CodeOptions/CodeOptions";
export type { CodeOptionsProps } from "./components/study-blocks/exercise/components/specific/CodeOptions/CodeOptions";

// Matching Answer Types
export { MatchOptionType } from "./components/study-blocks/exercise/components/specific/MatchingAnswer/matching-options/MatchOptionDTO";
export type {
  AudioMatchOptionDTO,
  ImageMatchOptionDTO,
  MatchOption,
  MatchOptionDTO,
  TextMatchOptionDTO,
} from "./components/study-blocks/exercise/components/specific/MatchingAnswer/matching-options/MatchOptionDTO";
