import React, { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AnswerState } from "../../../../../types/AnswerState";
import { MatchingAnswerComponent } from "../../types/StudyBlockComponentDTO";
import MatchAudioOption from "./matching-options/MatchAudioOption/MatchAudioOption";
import MatchImageOption from "./matching-options/MatchImageOption/MatchImageOption";
import {
  AudioMatchOptionDTO,
  ImageMatchOptionDTO,
  MatchOptionDTO,
  TextMatchOptionDTO,
} from "./matching-options/MatchOptionDTO";
import MatchTextOption from "./matching-options/MatchTextOption/MatchTextOption";

function isTextOption(o: MatchOptionDTO): o is TextMatchOptionDTO {
  return o.type === "text";
}
function isAudioOption(o: MatchOptionDTO): o is AudioMatchOptionDTO {
  return o.type === "audio";
}
function isImageOption(o: MatchOptionDTO): o is ImageMatchOptionDTO {
  return o.type === "image";
}

export interface IMatchingAnswerStudyBlockComponent {
  component: MatchingAnswerComponent;
  onAnswerStateChange?: (answer: AnswerState) => void;
}

export const MatchingAnswer: React.FC<IMatchingAnswerStudyBlockComponent> = ({
  component,
  onAnswerStateChange,
}) => {
  const [selectedIndex1, setSelectedIndex1] = useState<number | undefined>();
  const [selectedIndex2, setSelectedIndex2] = useState<number | undefined>();
  const [optionStates1, setOptionStates1] = useState<Array<AnswerState>>(
    component.options1.map(() => "NONE"),
  );
  const [optionStates2, setOptionStates2] = useState<Array<AnswerState>>(
    component.options2.map(() => "NONE"),
  );
  const [answerStates, setAnswerStates] = useState<Array<AnswerState>>(
    component.options1.map(() => "NONE"),
  );

  const aggregate = useMemo<AnswerState>(() => {
    if (answerStates.every((s) => s === "RIGHT")) return "RIGHT";
    if (answerStates.some((s) => s === "WRONG")) return "WRONG";
    return "NONE";
  }, [answerStates]);

  useEffect(() => {
    onAnswerStateChange?.(aggregate);
  }, [aggregate, onAnswerStateChange]);

  useEffect(() => {
    if (selectedIndex1 !== undefined || selectedIndex2 !== undefined) {
      setOptionStates1((prev) => prev.map((s) => (s === "WRONG" ? "NONE" : s)));
      setOptionStates2((prev) => prev.map((s) => (s === "WRONG" ? "NONE" : s)));
    }

    if (selectedIndex1 !== undefined && selectedIndex2 !== undefined) {
      const right =
        (component.options1[selectedIndex1] as any).matchIndex ===
        selectedIndex2;
      const state: AnswerState = right ? "RIGHT" : "WRONG";

      setOptionStates1((prev) => {
        const arr = [...prev];
        arr[selectedIndex1] = state;
        return arr;
      });
      setOptionStates2((prev) => {
        const arr = [...prev];
        arr[selectedIndex2] = state;
        return arr;
      });
      setSelectedIndex1(undefined);
      setSelectedIndex2(undefined);
      setAnswerStates((prev) => {
        const arr = [...prev];
        arr[selectedIndex1] =
          arr[selectedIndex1] === "NONE" ? state : arr[selectedIndex1];
        return arr;
      });
    }
  }, [selectedIndex1, selectedIndex2, component.options1]);

  const horizontalLayout = () =>
    component.options1.some((o) => isImageOption(o)) ||
    component.options2.some((o) => isImageOption(o));

  return (
    <>
      {component.title && (
        <Box sx={{ textAlign: "center", mb: 1 }}>
          <Typography variant="subtitle1">{component.title}</Typography>
        </Box>
      )}

      <Box
        display="flex"
        justifyContent="space-around"
        gap={horizontalLayout() ? 8 : 2}
        sx={{ my: 2 }}
        flexDirection={horizontalLayout() ? "column" : "row"}
      >
        <Box
          display="flex"
          flexDirection={horizontalLayout() ? "row" : "column"}
          flexWrap="wrap"
          gap={2}
          justifyContent={horizontalLayout() ? "center" : undefined}
        >
          {component.options1.map((option, i) => {
            const selected = selectedIndex1 === i;
            const disabled = optionStates1[i] === "RIGHT";
            const animateWrong = optionStates1[i] === "WRONG";

            if (isTextOption(option)) {
              return (
                <MatchTextOption
                  key={`options1-${i}`}
                  text={option.text}
                  selected={selected}
                  onClick={() => setSelectedIndex1(i)}
                  disabled={disabled}
                  animateWrong={animateWrong}
                />
              );
            } else if (isAudioOption(option)) {
              return (
                <MatchAudioOption
                  key={`options1-${i}`}
                  audioUrl={option.audioUrl}
                  selected={selected}
                  onClick={() => setSelectedIndex1(i)}
                  disabled={disabled}
                  animateWrong={animateWrong}
                />
              );
            } else if (isImageOption(option)) {
              return (
                <Box
                  flexBasis={horizontalLayout() ? "40%" : undefined}
                  key={`options1-${i}`}
                >
                  <MatchImageOption
                    imageUrl={option.imageUrl}
                    selected={selected}
                    onClick={() => setSelectedIndex1(i)}
                    disabled={disabled}
                    animateWrong={animateWrong}
                  />
                </Box>
              );
            }
          })}
        </Box>
        <Box
          display="flex"
          flexDirection={horizontalLayout() ? "row" : "column"}
          flexWrap="wrap"
          gap={2}
          justifyContent={horizontalLayout() ? "center" : undefined}
        >
          {component.options2.map((option, i) => {
            const selected = selectedIndex2 === i;
            const disabled = optionStates2[i] === "RIGHT";
            const animateWrong = optionStates2[i] === "WRONG";

            if (isTextOption(option)) {
              return (
                <MatchTextOption
                  key={`options2-${i}`}
                  text={option.text}
                  selected={selected}
                  onClick={() => setSelectedIndex2(i)}
                  disabled={disabled}
                  animateWrong={animateWrong}
                />
              );
            } else if (isAudioOption(option)) {
              return (
                <MatchAudioOption
                  key={`options2-${i}`}
                  audioUrl={option.audioUrl}
                  selected={selected}
                  onClick={() => setSelectedIndex2(i)}
                  disabled={disabled}
                  animateWrong={animateWrong}
                />
              );
            } else if (isImageOption(option)) {
              return (
                <Box
                  flexBasis={horizontalLayout() ? "40%" : undefined}
                  key={`options2-${i}`}
                >
                  <MatchImageOption
                    imageUrl={option.imageUrl}
                    selected={selected}
                    onClick={() => setSelectedIndex2(i)}
                    disabled={disabled}
                    animateWrong={animateWrong}
                  />
                </Box>
              );
            }
          })}
        </Box>
      </Box>
    </>
  );
};

export default MatchingAnswer;
