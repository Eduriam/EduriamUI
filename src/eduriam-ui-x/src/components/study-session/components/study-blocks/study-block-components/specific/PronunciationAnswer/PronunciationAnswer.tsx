import React, { useEffect, useMemo, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import MicIcon from "@mui/icons-material/Mic";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import { AnswerState } from "../../../../../types/AnswerState";
import { PronunciationAnswerComponent } from "../../types/StudyBlockComponentDTO";
import styles from "./PronunciationAnswer.module.css";

export interface IPronunciationAnswerStudyBlockComponent {
  component: PronunciationAnswerComponent;
  onAnswerStateChange?: (answer: AnswerState) => void;
  // testing-only helper to bypass microphone in stories/tests
  mockTranscript?: string | undefined;
}

function evaluateCaseInsensitive(user: string, correct: string): AnswerState {
  const u = user.trim().toLowerCase();
  const c = correct.trim().toLowerCase();
  if (!u) return "NONE";
  return u === c ? "RIGHT" : "WRONG";
}

export const PronunciationAnswer: React.FC<
  IPronunciationAnswerStudyBlockComponent
> = ({ component, onAnswerStateChange, mockTranscript }) => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) setEnabled(false);
  }, [browserSupportsSpeechRecognition]);

  const effectiveTranscript =
    mockTranscript !== undefined ? mockTranscript : transcript;

  const state = useMemo(
    () => evaluateCaseInsensitive(effectiveTranscript, component.correctAnswer),
    [effectiveTranscript, component.correctAnswer],
  );

  useEffect(() => {
    onAnswerStateChange?.(state);
  }, [state, onAnswerStateChange]);

  // Word-by-word feedback, similar to AudioQuestionAnswer
  const removePunctuation = (s: string) => s.replace(/[.,?!]/g, "");
  const correctWords = removePunctuation(component.correctAnswer).split(" ");
  const heardWords = removePunctuation(effectiveTranscript)
    .split(" ")
    .filter(Boolean);
  const numMatches = heardWords.reduce(
    (acc, w, i) =>
      acc + (w.toLowerCase() === (correctWords[i] ?? "").toLowerCase() ? 1 : 0),
    0,
  );
  const rating0to10 =
    heardWords.length === 0
      ? 0
      : Math.round((numMatches / heardWords.length) * 10);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography variant="subtitle2">Say the phrase</Typography>
      {enabled && (
        <Fab
          sx={{
            boxShadow: "0 3px 8px 0 rgba(0,0,0,0.08)",
            backgroundColor: "rgba(0,0,0,0)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
            width: "80px",
            height: "80px",
          }}
          onClick={() => {
            if (listening) {
              SpeechRecognition.stopListening();
            } else {
              SpeechRecognition.startListening();
            }
          }}
        >
          {listening ? (
            <Box className={styles.dots}>
              <Box
                sx={{ backgroundColor: "primary.main" }}
                className={[styles.dot, styles.dot1].join(" ")}
              />
              <Box
                sx={{ backgroundColor: "primary.main" }}
                className={[styles.dot, styles.dot2].join(" ")}
              />
              <Box
                sx={{ backgroundColor: "primary.main" }}
                className={[styles.dot, styles.dot3].join(" ")}
              />
            </Box>
          ) : (
            <MicIcon color="primary" fontSize="large" />
          )}
        </Fab>
      )}
      {effectiveTranscript && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              whiteSpace: "pre-wrap",
              width: "100%",
            }}
          >
            {heardWords.map((word, i) => {
              const correctWord = correctWords[i] ?? "";
              const isMatch = word.toLowerCase() === correctWord.toLowerCase();
              return (
                <Box key={i}>
                  <Typography
                    sx={{ color: isMatch ? "success.main" : "error.main" }}
                    variant="subtitle2"
                    paragraph={false}
                    display="inline"
                  >
                    {correctWord || word}
                  </Typography>
                  {i + 1 !== heardWords.length && (
                    <Typography
                      variant="subtitle2"
                      paragraph={false}
                      display="inline"
                    >
                      {" "}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {rating0to10}/10
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PronunciationAnswer;
