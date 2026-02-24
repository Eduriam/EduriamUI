export interface StudySessionLocalization {
  studyBlock: {
    continueButton: string;
    checkButton: string;
  };
  studySessionDrawer: {
    titleCorrect: string;
    titleIncorrect: string;
    whyButton: string;
    continueButton: string;
    skipExerciseButton?: string;
  };
  multipleChoiceExercise: {
    assignmentTitle: string;
  };
  studySessionStats: {
    title: string;
    xpGained: string;
    minStudied: string;
    correct: string;
    newConcepts: string;
    continueButton: string;
  };
}
