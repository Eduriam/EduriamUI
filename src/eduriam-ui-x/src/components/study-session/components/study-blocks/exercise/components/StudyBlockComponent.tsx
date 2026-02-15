import React from "react";

import { AnswerState } from "../../../../types/AnswerState";
import type { StudySessionLocalization } from "../../../../types/StudySessionLocalization";
import { StudyBlockComponentDTO } from "./StudyBlockComponentDTO";
import { StudyBlockComponentType } from "./StudyBlockComponentTypes";
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

export interface IStudyBlockComponent {
  component: StudyBlockComponentDTO;
  onAnswerStateChange?: (answer: AnswerState) => void;
  localization: StudySessionLocalization;
  /**
   * Whether passive code-editor tabs (browser / table / terminal) are
   * unlocked. Becomes `true` after the user clicks "Check".
   */
  passiveTabsUnlocked?: boolean;
}

export const StudyBlockComponent: React.FC<IStudyBlockComponent> = ({
  component,
  onAnswerStateChange,
  localization,
  passiveTabsUnlocked,
}) => {
  switch (component.type) {
    case StudyBlockComponentType.HEADER:
      return <Header component={component} />;
    case StudyBlockComponentType.PARAGRAPH:
      return <Paragraph component={component} />;
    case StudyBlockComponentType.TEXT_ANSWER:
      return (
        <TextAnswer
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case StudyBlockComponentType.MULTIPLE_CHOICE:
      return (
        <MultipleChoiceExercise
          component={component}
          onAnswerStateChange={onAnswerStateChange}
          localization={localization.multipleChoiceExercise}
        />
      );
    case StudyBlockComponentType.SHORT_AUDIO:
      return <ShortAudio component={component} />;
    case StudyBlockComponentType.LONG_AUDIO:
      return <LongAudio component={component} />;
    case StudyBlockComponentType.IMAGE:
      return <Image component={component} />;
    case StudyBlockComponentType.TIMER:
      return <Timer component={component} />;
    case StudyBlockComponentType.CHECKLIST:
      return (
        <CheckList
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case StudyBlockComponentType.PRONUNCIATION_ANSWER:
      return (
        <PronunciationAnswer
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case StudyBlockComponentType.TABLE_FILL:
      return (
        <TableFill
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case StudyBlockComponentType.BUILD_WORD:
      return (
        <BuildWord
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case StudyBlockComponentType.MATCHING_ANSWER:
      return (
        <MatchingAnswer
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case StudyBlockComponentType.FILL_IN_SENTENCE:
      return (
        <FillInSentence
          component={component}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    case StudyBlockComponentType.CODE_EXERCISE:
      return (
        <CodeExercise
          tabs={component.tabs}
          assignmentTitle={component.assignmentTitle}
          assignmentDescription={component.assignmentDescription}
          passiveTabsUnlocked={passiveTabsUnlocked}
          onAnswerStateChange={onAnswerStateChange}
        />
      );
    default:
      return null;
  }
};
