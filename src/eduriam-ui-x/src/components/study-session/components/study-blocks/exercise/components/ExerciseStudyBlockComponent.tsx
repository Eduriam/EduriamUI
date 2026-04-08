import React from "react";

import { AnswerState } from "../../../../types/AnswerState";
import type { StudySessionDataTest } from "../../../../types/StudySessionDataTest";
import type { StudySessionLocalization } from "../../../../types/StudySessionLocalization";
import { ExerciseStudyBlockComponentDTO } from "./ExerciseStudyBlockComponentDTO";
import { ExerciseStudyBlockComponentType } from "./ExerciseStudyBlockComponentTypes";
import BuildWord from "./specific/BuildWord/BuildWord";
import CheckList from "./specific/CheckList/CheckList";
import { CodeExercise } from "./specific/CodeExercise/CodeExercise";
import FillInSentence from "./specific/FillInSentence/FillInSentence";
import { Header } from "./specific/Header/Header";
import Image from "./specific/Image/Image";
import { LongAudio } from "./specific/LongAudio/LongAudio";
import MatchingAnswer from "./specific/MatchingAnswer/MatchingAnswer";
import MultipleChoiceExercise from "./specific/MultipleChoiceExercise/MultipleChoiceExercise";
import { Paragraph } from "./specific/Paragraph/Paragraph";
import { PronunciationAnswer } from "./specific/PronunciationAnswer/PronunciationAnswer";
import { ShortAudio } from "./specific/ShortAudio/ShortAudio";
import TableFill from "./specific/TableFill/TableFill";
import { TextAnswer } from "./specific/TextAnswer/TextAnswer";
import Timer from "./specific/Timer/Timer";
import { ArchitectureDiagram } from "./specific/diagrams/specific/ArchitectureDiagram/ArchitectureDiagram";
import { ClassDiagram } from "./specific/diagrams/specific/ClassDiagram/ClassDiagram";
import { EntityRelationshipDiagram } from "./specific/diagrams/specific/EntityRelationshipDiagram/EntityRelationshipDiagram";
import { FlowchartDiagram } from "./specific/diagrams/specific/FlowchartDiagram/FlowchartDiagram";
import { GitGraphDiagram } from "./specific/diagrams/specific/GitGraphDiagram/GitGraphDiagram";
import { StateDiagram } from "./specific/diagrams/specific/StateDiagram/StateDiagram";

export interface IExerciseStudyBlockComponent {
  component: ExerciseStudyBlockComponentDTO;
  onAnswerStateChange?: (answer: AnswerState, userAnswerReport: string) => void;
  localization: StudySessionLocalization;
  /**
   * Whether passive code-editor tabs (browser / table / terminal) are
   * unlocked. Becomes `true` after the user clicks "Check".
   */
  passiveTabsUnlocked?: boolean;
  /**
   * When `true`, check-like buttons (e.g. the KeyboardExtension check)
   * should be disabled. Matches the main Check button's disabled state.
   */
  checkDisabled?: boolean;
  /** Called when the user triggers a check (e.g. via the keyboard check button). */
  onCheckPress?: () => void;
  dataTest?: StudySessionDataTest;
}

export const ExerciseStudyBlockComponent: React.FC<
  IExerciseStudyBlockComponent
> = ({
  component,
  onAnswerStateChange,
  localization,
  passiveTabsUnlocked,
  checkDisabled,
  onCheckPress,
  dataTest,
}) => {
  switch (component.type) {
    case ExerciseStudyBlockComponentType.HEADER:
      return <Header component={component} />;
    case ExerciseStudyBlockComponentType.PARAGRAPH:
      return <Paragraph component={component} />;
    case ExerciseStudyBlockComponentType.TEXT_ANSWER:
      return (
        <TextAnswer
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case ExerciseStudyBlockComponentType.MULTIPLE_CHOICE:
      return (
        <MultipleChoiceExercise
          component={component}
          onAnswerStateChange={onAnswerStateChange}
          localization={localization.multipleChoiceExercise}
          dataTest={dataTest?.exercises?.multipleChoiceExercise}
        />
      );
    case ExerciseStudyBlockComponentType.SHORT_AUDIO:
      return <ShortAudio component={component} />;
    case ExerciseStudyBlockComponentType.LONG_AUDIO:
      return <LongAudio component={component} />;
    case ExerciseStudyBlockComponentType.IMAGE:
      return <Image component={component} />;
    case ExerciseStudyBlockComponentType.TIMER:
      return <Timer component={component} />;
    case ExerciseStudyBlockComponentType.CHECKLIST:
      return (
        <CheckList
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case ExerciseStudyBlockComponentType.PRONUNCIATION_ANSWER:
      return (
        <PronunciationAnswer
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case ExerciseStudyBlockComponentType.TABLE_FILL:
      return (
        <TableFill
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case ExerciseStudyBlockComponentType.BUILD_WORD:
      return (
        <BuildWord
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case ExerciseStudyBlockComponentType.MATCHING_ANSWER:
      return (
        <MatchingAnswer
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case ExerciseStudyBlockComponentType.FILL_IN_SENTENCE:
      return (
        <FillInSentence
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case ExerciseStudyBlockComponentType.CODE_EXERCISE:
      return (
        <CodeExercise
          tabs={component.tabs}
          assignmentTitle={component.assignmentTitle}
          assignmentDescription={component.assignmentDescription}
          passiveTabsUnlocked={passiveTabsUnlocked}
          checkDisabled={checkDisabled}
          onCheckPress={onCheckPress}
          onAnswerStateChange={onAnswerStateChange}
          dataTest={{
            section: dataTest?.exercises?.codeExercise?.section,
            resultSection: dataTest?.exercises?.codeExercise?.resultSection,
            fillInCode: {
              textField:
                dataTest?.exercises?.codeExercise?.fillInCode?.textField,
            },
          }}
        />
      );
    case ExerciseStudyBlockComponentType.FLOWCHART_DIAGRAM:
      return <FlowchartDiagram chart={component.chart} />;
    case ExerciseStudyBlockComponentType.CLASS_DIAGRAM:
      return <ClassDiagram chart={component.chart} />;
    case ExerciseStudyBlockComponentType.STATE_DIAGRAM:
      return <StateDiagram chart={component.chart} />;
    case ExerciseStudyBlockComponentType.ENTITY_RELATIONSHIP_DIAGRAM:
      return <EntityRelationshipDiagram chart={component.chart} />;
    case ExerciseStudyBlockComponentType.GIT_GRAPH_DIAGRAM:
      return <GitGraphDiagram chart={component.chart} />;
    case ExerciseStudyBlockComponentType.ARCHITECTURE_DIAGRAM:
      return <ArchitectureDiagram chart={component.chart} />;
    default:
      return null;
  }
};
