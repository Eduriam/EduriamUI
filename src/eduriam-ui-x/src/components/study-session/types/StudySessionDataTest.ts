import { CodeExerciseDataTest } from "../components/study-blocks/exercise/components/specific/CodeExercise/CodeExercise";
import { MultipleChoiceExerciseDataTest } from "../components/study-blocks/exercise/components/specific/MultipleChoiceExercise/MultipleChoiceExercise";

export interface StudySessionDataTest {
  studySessionPage?: string;
  quitButton?: string;

  explanationBlock?: {
    section?: string;
    continueButton?: string;
    reportButton?: string;
  };

  exerciseBlock?: {
    checkAnswerButton?: string;
  };

  studyBlockNavigation?: {
    previousStudyBlockButton?: string;
    nextStudyBlockButton?: string;
  };

  exercises?: {
    multipleChoiceExercise?: MultipleChoiceExerciseDataTest;
    codeExercise?: CodeExerciseDataTest;
  };

  studySessionDrawer?: {
    correctAnswerDrawer?: string;
    incorrectAnswerDrawer?: string;
    skipExerciseButton?: string;
    showExplanationButton?: string;
    continueButton?: string;
    retryExerciseButton?: string;
    reportButton?: string;
  };

  studyStats?: {
    continueButton?: string;
    section?: string;
  };

  explanation?: {
    gotItButton?: string;
    section?: string;
  };
}
