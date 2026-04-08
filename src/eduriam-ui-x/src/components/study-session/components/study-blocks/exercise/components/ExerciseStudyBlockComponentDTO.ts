import { IDString } from "../../../../../../models/ID";
import { ExerciseStudyBlockComponentType } from "./ExerciseStudyBlockComponentTypes";
import type { CodeEditorTab } from "./specific/CodeEditor/CodeEditorTypes";
import { MatchOptionDTO } from "./specific/MatchingAnswer/matching-options/MatchOptionDTO";

export interface BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType;
  id: IDString;
  /** Optional audio attached to this component, played sequentially by the study block. */
  audio?: { url: string };
}

export interface HeaderComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.HEADER;
  text: string;
}

export interface ParagraphComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.PARAGRAPH;
  text: string;
}

export interface TextAnswerComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.TEXT_ANSWER;
  correctAnswer: string;

  evaluationStrategy?: "exact" | "case_insensitive";
  variant?: "short" | "long";
  characterButtons?: string[];
}

export interface MultipleChoiceExerciseOptionDTO {
  id: string;
  text: string;
}

export interface MultipleChoiceExerciseComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.MULTIPLE_CHOICE;
  question: string;
  options: Array<MultipleChoiceExerciseOptionDTO>;
  correctOptionId: string;
}

export interface ShortAudioComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.SHORT_AUDIO;
  audioUrl: string;
}

export interface LongAudioComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.LONG_AUDIO;
  audioUrl: string;
}

export interface ImageComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.IMAGE;
  url: string;
  alt?: string;
  size?: "small" | "medium" | "large";
}

export interface TimerComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.TIMER;
  seconds: number;
}

export interface CheckListComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.CHECKLIST;
  items: string[];
}

export interface PronunciationAnswerComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.PRONUNCIATION_ANSWER;
  correctAnswer: string;
}

export interface TableFillComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.TABLE_FILL;
  title?: string;
  tableContent: Array<Array<string>>;
  blankCellCoords: Array<Array<number>>;
  characterButtons?: Array<string>;
}

export interface FillInSentenceComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.FILL_IN_SENTENCE;
  title?: string;
  sentence: string;
  blankWordIndexes: Array<number>;
  wordOptions: Array<string>;
}

export interface BuildWordComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.BUILD_WORD;
  title?: string;
  word: string;
  letterOptions: Array<string>;
}

export interface MatchingAnswerComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.MATCHING_ANSWER;
  title?: string;
  options1: Array<MatchOptionDTO>;
  options2: Array<MatchOptionDTO>;
}

export interface CodeExerciseComponent extends BaseExerciseStudyBlockComponent {
  type: ExerciseStudyBlockComponentType.CODE_EXERCISE;
  /** Tab definitions for the code editor. */
  tabs: CodeEditorTab[];
  /** Optional assignment title (bold heading above the editor). */
  assignmentTitle?: string;
  /** Optional assignment description / question. */
  assignmentDescription?: string;
}

export interface DiagramComponentBase extends BaseExerciseStudyBlockComponent {
  chart: string;
}

export interface FlowchartDiagramComponent extends DiagramComponentBase {
  type: ExerciseStudyBlockComponentType.FLOWCHART_DIAGRAM;
}

export interface ClassDiagramComponent extends DiagramComponentBase {
  type: ExerciseStudyBlockComponentType.CLASS_DIAGRAM;
}

export interface StateDiagramComponent extends DiagramComponentBase {
  type: ExerciseStudyBlockComponentType.STATE_DIAGRAM;
}

export interface EntityRelationshipDiagramComponent extends DiagramComponentBase {
  type: ExerciseStudyBlockComponentType.ENTITY_RELATIONSHIP_DIAGRAM;
}

export interface GitGraphDiagramComponent extends DiagramComponentBase {
  type: ExerciseStudyBlockComponentType.GIT_GRAPH_DIAGRAM;
}

export interface ArchitectureDiagramComponent extends DiagramComponentBase {
  type: ExerciseStudyBlockComponentType.ARCHITECTURE_DIAGRAM;
}

export type ExerciseStudyBlockComponentDTO =
  | HeaderComponent
  | ParagraphComponent
  | TextAnswerComponent
  | MultipleChoiceExerciseComponent
  | ShortAudioComponent
  | LongAudioComponent
  | ImageComponent
  | TimerComponent
  | CheckListComponent
  | PronunciationAnswerComponent
  | TableFillComponent
  | FillInSentenceComponent
  | BuildWordComponent
  | MatchingAnswerComponent
  | CodeExerciseComponent
  | FlowchartDiagramComponent
  | ClassDiagramComponent
  | StateDiagramComponent
  | EntityRelationshipDiagramComponent
  | GitGraphDiagramComponent
  | ArchitectureDiagramComponent;
