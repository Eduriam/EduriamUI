import React, { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { AnswerState } from "../../../../../../types/AnswerState";
import CharacterButton from "../../../../../shared/CharacterButton/CharacterButton";
import { TextAnswerComponent } from "../../StudyBlockComponentDTO";

export interface ITextAnswerStudyBlockComponent {
  component: TextAnswerComponent;
  showAnswerState?: boolean;
  onAnswerStateChange?: (answer: AnswerState) => void;
}

function evaluateAnswer(
  userAnswer: string,
  correctAnswer: string,
  strategy: TextAnswerComponent["evaluationStrategy"],
): AnswerState {
  const normalize = (s: string) => {
    let v = s.trim();
    if (strategy === "case_insensitive") {
      v = v.toLowerCase();
    }
    return v;
  };
  const normalizedUserAnswer = normalize(userAnswer);
  const normalizedCorrectAnswer = normalize(correctAnswer);
  if (normalizedUserAnswer.length === 0) return "NONE";
  return normalizedUserAnswer === normalizedCorrectAnswer ? "RIGHT" : "WRONG";
}

export const TextAnswer: React.FC<ITextAnswerStudyBlockComponent> = ({
  component,
  onAnswerStateChange,
  showAnswerState = false,
}) => {
  const [value, setValue] = useState<string>("");
  const state = useMemo(
    () =>
      evaluateAnswer(
        value,
        component.correctAnswer,
        component.evaluationStrategy,
      ),
    [value, component.correctAnswer, component.evaluationStrategy],
  );

  useEffect(() => {
    onAnswerStateChange?.(state);
  }, [state, onAnswerStateChange]);

  const isLong = component.variant === "long";

  return (
    <Box>
      <TextField
        variant="outlined"
        size={"medium"}
        value={value}
        multiline={isLong}
        rows={isLong ? 3 : 1}
        fullWidth
        sx={{
          borderRadius: 2,
          "& .MuiInputBase-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
            {
              borderColor:
                showAnswerState && state === "RIGHT"
                  ? "success.main"
                  : showAnswerState && state === "WRONG"
                    ? "error.main"
                    : undefined,
              borderWidth: 2,
            },
        }}
        autoComplete="off"
        disabled={showAnswerState ? true : false}
        color={
          showAnswerState && state === "RIGHT"
            ? "success"
            : showAnswerState && state === "WRONG"
              ? "error"
              : undefined
        }
        focused={
          showAnswerState && (state === "RIGHT" || state === "WRONG")
            ? true
            : false
        }
        onChange={(e) => setValue(e.target.value)}
      />
      {component.characterButtons && component.characterButtons.length > 0 ? (
        <Box sx={{ display: "flex", gap: 0.5, mt: 1, flexWrap: "wrap" }}>
          {component.characterButtons.map((ch) => (
            <CharacterButton
              key={ch}
              character={ch}
              onClick={() => setValue(`${value}${ch}`)}
              disabled={showAnswerState}
            />
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default TextAnswer;
