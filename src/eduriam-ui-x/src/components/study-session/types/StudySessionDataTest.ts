import { MultipleChoiceExerciseDataTest } from "../components/study-blocks/exercise/components/specific/MultipleChoiceExercise/MultipleChoiceExercise";

export interface StudySessionDataTest {
  studySessionPage?: string;
  explanationBlockSection?: string;
  continueButton?: string;
  multipleChoiceExercise?: MultipleChoiceExerciseDataTest;
  checkAnswerButton?: string;
  correctAnswerDrawer?: string;
  incorrectAnswerDrawer?: string;
  showExplanationButton?: string;
  explanationSection?: string;
  gotItButton?: string;
  retryExerciseButton?: string;
  skipExerciseButton?: string;
  studyStatsSection?: string;
}
