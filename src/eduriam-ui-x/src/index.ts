// Video Manager
export * from "./components/video-manager";

// Audio
export { AudioPlayer, type AudioPlayerSound } from "./audio";

// Main Study Session Component
export { default as StudySession } from "./components/study-session/StudySession";
export type {
  AtomProgressRating,
  IStudySession,
} from "./components/study-session/StudySession";

// Study Block Components
export { ExerciseStudyBlock as StudyBlock } from "./components/study-session/components/study-blocks/exercise/ExerciseStudyBlock";
export type { IExerciseStudyBlock as IStudyBlock } from "./components/study-session/components/study-blocks/exercise/ExerciseStudyBlock";

export { StudyBlockComponent } from "./components/study-session/components/study-blocks/exercise/components/StudyBlockComponent";
export type { IStudyBlockComponent } from "./components/study-session/components/study-blocks/exercise/components/StudyBlockComponent";

// Explanation Study Block
export { ExplanationStudyBlock } from "./components/study-session/components/study-blocks/explanation/ExplanationStudyBlock";
export type { IExplanationStudyBlock } from "./components/study-session/components/study-blocks/explanation/ExplanationStudyBlock";

// Explanation Study Block Components (Video Components)
export { BackgroundColor } from "./components/video-manager/video-components/components/BackgroundColor/BackgroundColor";
export { BackgroundImage } from "./components/video-manager/video-components/components/BackgroundImage/BackgroundImage";
export { BackgroundVideo } from "./components/video-manager/video-components/components/BackgroundVideo/BackgroundVideo";
export { CodeExplainer } from "./components/video-manager/video-components/components/CodeExplainer/CodeExplainer";
export { DatabaseTableVideoComponent } from "./components/video-manager/video-components/components/DatabaseTable/DatabaseTableVideoComponent";
export { Image } from "./components/video-manager/video-components/components/Image/Image";
export { List } from "./components/video-manager/video-components/components/List/List";
export { MermaidClassDiagramVideoComponent } from "./components/video-manager/video-components/components/MermaidClassDiagramVideoComponent/MermaidClassDiagramVideoComponent";
export { TableVideoComponent } from "./components/video-manager/video-components/components/Table/TableVideoComponent";
export { Text } from "./components/video-manager/video-components/components/Text/Text";
export { Video } from "./components/video-manager/video-components/components/Video/Video";

// Study Session Progress Bar
export { default as StudySessionProgressBar } from "./components/study-session/components/StudySessionProgressBar/StudySessionProgressBar";
export type { IStudySessionProgressBar } from "./components/study-session/components/StudySessionProgressBar/StudySessionProgressBar";

// Study Session Shared Components
export { CodeBlank } from "./components/study-session/components/shared/CodeBlank";
export type { CodeBlankProps } from "./components/study-session/components/shared/CodeBlank";
export { MermaidDiagram } from "./components/study-session/components/shared/MermaidDiagram";
export type { MermaidDiagramProps } from "./components/study-session/components/shared/MermaidDiagram";
export { ReportStudyBlockDialog } from "./components/study-session/components/shared/ReportStudyBlockDialog";
export type {
  ReportStudyBlockDialogDataTest,
  ReportStudyBlockDialogLocalization,
  ReportStudyBlockDialogSubmitPayload,
} from "./components/study-session/components/shared/ReportStudyBlockDialog";

// Types and Models
export type { MultipleChoiceExerciseDataTest } from "./components/study-session/components/study-blocks/exercise/components/specific/MultipleChoiceExercise/MultipleChoiceExercise";
export type { StudyBlockComponentDTO } from "./components/study-session/components/study-blocks/exercise/components/StudyBlockComponentDTO";
export { StudyBlockComponentType } from "./components/study-session/components/study-blocks/exercise/components/StudyBlockComponentTypes";
export type { ExerciseStudyBlockDTO } from "./components/study-session/components/study-blocks/exercise/ExerciseStudyBlockDTO";
export type { ExplanationStudyBlockDTO } from "./components/study-session/components/study-blocks/explanation/ExplanationStudyBlockDTO";
export type { BaseStudyBlock } from "./components/study-session/components/study-blocks/StudyBlock";
export type { StudyBlockDTO } from "./components/study-session/components/study-blocks/StudyBlockDTO";
export type { SelectedStudyBlockData } from "./components/study-session/StudySession";
export type { AnswerState } from "./components/study-session/types/AnswerState";
export type { StudySessionDataTest } from "./components/study-session/types/StudySessionDataTest";
export type { StudySessionDTO } from "./components/study-session/types/StudySessionDTO";
export type { StudySessionLocalization } from "./components/study-session/types/StudySessionLocalization";
export type {
  Caption,
  Scene,
} from "./components/video-manager/video-scenes/Scene";
export type { BaseSlide } from "./components/video-manager/video-slides/BaseSlide";
export type {
  IRawSlide,
  IRawSlideProps,
} from "./components/video-manager/video-slides/raw-slide/RawSlide";
export type {
  Slide,
  SlideType,
} from "./components/video-manager/video-slides/Slide";
export type { SlideTemplates } from "./components/video-manager/video-slides/slide-templates/SlideTemplate";
export type {
  IOneHeaderSlide,
  IOneHeaderSlideProps,
} from "./components/video-manager/video-slides/slide-templates/specific/OneHeaderSlide";
export type { ID } from "./models/ID";

// Specific Component Types
export type {
  BaseStudyBlockComponent,
  BuildWordComponent,
  CheckListComponent,
  CodeExerciseComponent,
  FillInSentenceComponent,
  HeaderComponent,
  ImageComponent,
  LongAudioComponent,
  MatchingAnswerComponent,
  MultipleChoiceExerciseComponent,
  MultipleChoiceExerciseOptionDTO,
  ParagraphComponent,
  PronunciationAnswerComponent,
  ShortAudioComponent,
  TableFillComponent,
  TextAnswerComponent,
  TimerComponent,
} from "./components/study-session/components/study-blocks/exercise/components/StudyBlockComponentDTO";

// Code Editor Types
export { PASSIVE_TAB_TYPES } from "./components/study-session/components/study-blocks/exercise/components/specific/CodeEditor/CodeEditorTypes";
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
  MatchOption,
  MatchOptionDTO,
  TextMatchOptionDTO,
} from "./components/study-session/components/study-blocks/exercise/components/specific/MatchingAnswer/matching-options/MatchOptionDTO";
