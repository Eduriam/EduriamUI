import { MultipleChoiceExerciseDataTest } from "../components/study-blocks/exercise/components/specific/MultipleChoiceExercise/MultipleChoiceExercise";

export interface StudySessionDataTest {
  studySessionPage?: string;

  explanationBlock?: {
    section?: string;
    continueButton?: string;
  };

  exerciseBlock?: {
    checkAnswerButton?: string;
  };

  exercises?: {
    multipleChoiceExercise?: MultipleChoiceExerciseDataTest;
  };

  studySessionDrawer?: {
    correctAnswerDrawer?: string;
    incorrectAnswerDrawer?: string;
    skipExerciseButton?: string;
    showExplanationButton?: string;
    continueButton?: string;
    retryExerciseButton?: string;
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
