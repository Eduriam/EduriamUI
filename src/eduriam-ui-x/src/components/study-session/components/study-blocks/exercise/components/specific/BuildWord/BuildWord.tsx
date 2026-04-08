import React, { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { AnswerState } from "../../../../../../types/AnswerState";
import CharacterButton, {
  CHARACTER_BUTTON_SIZE,
} from "../../../../../shared/CharacterButton/CharacterButton";
import { BuildWordComponent } from "../../ExerciseStudyBlockComponentDTO";

interface LetterAnswer {
  character: string;
  originalIndex: number;
}

interface LetterOption {
  character: string;
  used: boolean;
}

export interface IBuildWordExerciseStudyBlockComponent {
  component: BuildWordComponent;
  onAnswerStateChange?: (answer: AnswerState, userAnswerReport: string) => void;
  showAnswerState?: boolean;
}

export const BuildWord: React.FC<IBuildWordExerciseStudyBlockComponent> = ({
  component,
  onAnswerStateChange,
  showAnswerState = false,
}) => {
  const [letters, setLetters] = useState<Array<LetterOption>>(
    component.letterOptions.map((character) => ({ character, used: false })),
  );
  const [answerArray, setAnswerArray] = useState<Array<LetterAnswer>>([]);

  const answerString = useMemo(
    () => answerArray.map((l) => l.character).join(""),
    [answerArray],
  );

  function evaluateAggregate(userAnswer: string): AnswerState {
    if (userAnswer === component.word) return "RIGHT";
    if (userAnswer.length === 0) return "NONE";
    return "WRONG";
  }

  function handleRemoveLetter(index: number) {
    const arr = [...letters];
    arr[answerArray[index].originalIndex] = {
      ...arr[answerArray[index].originalIndex],
      used: false,
    };
    setLetters(arr);

    const newAnswerArray = [...answerArray];
    newAnswerArray.splice(index, 1);
    setAnswerArray(newAnswerArray);

    const userAnswerReport = newAnswerArray.map((l) => l.character).join("");
    onAnswerStateChange?.(
      evaluateAggregate(userAnswerReport),
      userAnswerReport,
    );
  }

  function handleAddLetter(index: number) {
    const newAnswerArray = [
      ...answerArray,
      { character: letters[index].character, originalIndex: index },
    ];
    setAnswerArray(newAnswerArray);
    const arr = [...letters];
    arr[index] = { ...arr[index], used: true };
    setLetters(arr);
    const userAnswerReport = newAnswerArray.map((l) => l.character).join("");
    onAnswerStateChange?.(
      evaluateAggregate(userAnswerReport),
      userAnswerReport,
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      {component.title && (
        <Box>
          <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>
            {component.title}
          </Typography>
        </Box>
      )}
      <Paper
        variant="outlined"
        sx={{
          width: `${
            CHARACTER_BUTTON_SIZE * component.word.length +
            4 * (component.word.length - 1) +
            16 +
            2
          }px`,
          height: `${CHARACTER_BUTTON_SIZE + 16 + 2}px`,
          p: 1,
          borderColor:
            showAnswerState && evaluateAggregate(answerString) === "RIGHT"
              ? "success.main"
              : showAnswerState && evaluateAggregate(answerString) === "WRONG"
                ? "error.main"
                : undefined,
          borderWidth: showAnswerState ? 2 : undefined,
          borderRadius: 0.4,
          boxShadow: "none",
        }}
      >
        <Box
          sx={{ minWidth: "100%", minHeight: "100%" }}
          display="flex"
          gap={0.5}
        >
          {answerArray.map((letter, i) => (
            <CharacterButton
              character={letter.character}
              onClick={() => handleRemoveLetter(i)}
              key={`answer-${i}`}
              elevated
              disabled={showAnswerState}
            />
          ))}
        </Box>
      </Paper>
      <Box sx={{ my: 1 }} display="flex" gap={1}>
        {letters.map((letter, i) => (
          <CharacterButton
            character={letter.character}
            onClick={() => handleAddLetter(i)}
            key={`letters-${i}`}
            elevated
            disabled={
              showAnswerState || component.word.length === answerArray.length
            }
            used={letter.used}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BuildWord;
