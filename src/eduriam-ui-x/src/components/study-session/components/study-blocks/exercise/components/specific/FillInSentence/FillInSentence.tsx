import React, { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AnswerState } from "../../../../../../types/AnswerState";
import WordButton from "../../../../../shared/WordButton/WordButton";
import { FillInSentenceComponent } from "../../StudyBlockComponentDTO";

export interface IFillInSentenceStudyBlockComponent {
  component: FillInSentenceComponent;
  onAnswerStateChange?: (answer: AnswerState, userAnswerReport: string) => void;
  showAnswerState?: boolean;
}

export const FillInSentence: React.FC<IFillInSentenceStudyBlockComponent> = ({
  component,
  onAnswerStateChange,
  showAnswerState = false,
}) => {
  const [options, setOptions] = useState<Array<string>>(component.wordOptions);
  const [answerArray, setAnswerArray] = useState<Array<string | undefined>>([]);
  const words = useMemo(
    () => component.sentence.split(" "),
    [component.sentence],
  );

  function emitState(updated: Array<string | undefined>) {
    const states: Array<AnswerState> = [];
    component.blankWordIndexes.forEach((i: number) => {
      const v = updated[i];
      if (!v) states.push("NONE");
      else if (v === words[i]) states.push("RIGHT");
      else states.push("WRONG");
    });
    const aggregate: AnswerState = states.every((s) => s === "RIGHT")
      ? "RIGHT"
      : states.some((s) => s === "WRONG")
        ? "WRONG"
        : "NONE";
    const userAnswerReport = component.blankWordIndexes
      .map((blankIndex) => updated[blankIndex] ?? "")
      .join(" | ");
    onAnswerStateChange?.(aggregate, userAnswerReport);
  }

  function handleAddAnswer(optionIndex: number) {
    const newAnswerArray = [...answerArray];
    for (let i = 0; i < component.blankWordIndexes.length; i++) {
      const blankIndex = component.blankWordIndexes[i];
      if (!newAnswerArray[blankIndex]) {
        newAnswerArray[blankIndex] = options[optionIndex];
        break;
      }
    }
    setAnswerArray(newAnswerArray);
    const arr = [...options];
    arr.splice(optionIndex, 1);
    setOptions(arr);
    emitState(newAnswerArray);
  }

  function handleRemoveAnswer(index: number) {
    if (answerArray[index] !== undefined) {
      setOptions([...options, answerArray[index] ?? ""]);
    }
    const newAnswerArray = [...answerArray];
    newAnswerArray[index] = undefined;
    setAnswerArray(newAnswerArray);
    emitState(newAnswerArray);
  }

  function canAddMoreAnswers() {
    let count = 0;
    answerArray.forEach((a) => {
      if (a) count++;
    });
    return count < component.blankWordIndexes.length;
  }

  function getAnswerState(wordIndex: number): AnswerState {
    let answerStateIndex = 0;
    for (let i = 0; i < component.blankWordIndexes.length; i++) {
      if (component.blankWordIndexes[i] === wordIndex) {
        break;
      } else {
        answerStateIndex++;
      }
    }

    return showAnswerState
      ? answerArray[wordIndex] === words[wordIndex]
        ? "RIGHT"
        : answerArray[wordIndex]
          ? "WRONG"
          : "NONE"
      : "NONE";
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {component.title && (
        <Box>
          <Typography variant="subtitle1">{component.title}</Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          whiteSpace: "pre-wrap",
        }}
      >
        {words.map((word: string, i: number) => {
          if (component.blankWordIndexes?.includes(i)) {
            if (answerArray[i]) {
              return (
                <Box key={i}>
                  <WordButton
                    word={answerArray[i]}
                    onClick={() => handleRemoveAnswer(i)}
                    key={`options-${i}`}
                    disabled={showAnswerState}
                    state={getAnswerState(i)}
                  />
                  <Typography
                    variant="body1"
                    paragraph={false}
                    display="inline"
                  >
                    {" "}
                  </Typography>
                </Box>
              );
            } else {
              return (
                <Box key={i}>
                  <WordButton key={`options-${i}`} empty />
                  <Typography
                    variant="body1"
                    paragraph={false}
                    display="inline"
                  >
                    {" "}
                  </Typography>
                </Box>
              );
            }
          } else {
            return (
              <Box key={i}>
                <Typography variant="body1" paragraph={false} display="inline">
                  {word}
                </Typography>
                <Typography variant="body1" paragraph={false} display="inline">
                  {" "}
                </Typography>
              </Box>
            );
          }
        })}
      </Box>
      <Box sx={{ mb: 8, mt: 4 }} display="flex" gap={1}>
        {options.map((option, i) => (
          <WordButton
            word={option}
            onClick={() => handleAddAnswer(i)}
            key={`options-${i}`}
            disabled={showAnswerState || !canAddMoreAnswers()}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FillInSentence;
