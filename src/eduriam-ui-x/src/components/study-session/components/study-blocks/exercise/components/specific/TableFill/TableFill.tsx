import React, { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { AnswerState } from "../../../../../../types/AnswerState";
import CharacterButton from "../../../../../shared/CharacterButton/CharacterButton";
import { TableFillComponent } from "../../StudyBlockComponentDTO";

export interface ITableFillStudyBlockComponent {
  component: TableFillComponent;
  onAnswerStateChange?: (answer: AnswerState, userAnswerReport: string) => void;
  showAnswerState?: boolean;
}

export const TableFill: React.FC<ITableFillStudyBlockComponent> = ({
  component,
  onAnswerStateChange,
  showAnswerState = false,
}) => {
  const [answers, setAnswers] = useState<Array<Array<string>>>(() =>
    component.tableContent.map((row) => row.map(() => "")),
  );
  const [lastSelectedInput, setLastSelectedInput] = useState<{
    x: number;
    y: number;
  }>();

  const blankIndexByCoord = useMemo(() => {
    const map = new Map<string, number>();
    component.blankCellCoords.forEach((coord, idx) => {
      map.set(`${coord[0]}-${coord[1]}`, idx);
    });
    return map;
  }, [component.blankCellCoords]);

  function handleCellChange(x: number, y: number, value: string) {
    const newArray: Array<Array<string>> = answers.map((row) => row.slice());
    newArray[y][x] = value.toLowerCase();
    setAnswers(newArray);

    const answerStrings: Array<string> = [];
    const answerStates: Array<AnswerState> = [];

    component.blankCellCoords.forEach((coord) => {
      const answer = newArray[coord[1]][coord[0]];
      answerStrings.push(answer);

      if (answer === component.tableContent[coord[1]][coord[0]].toLowerCase()) {
        answerStates.push("RIGHT");
      } else if (answer === "") {
        answerStates.push("NONE");
      } else {
        answerStates.push("WRONG");
      }
    });

    // Determine aggregate state for this block
    const aggregateState: AnswerState = answerStates.every((s) => s === "RIGHT")
      ? "RIGHT"
      : answerStates.some((s) => s === "WRONG")
        ? "WRONG"
        : "NONE";

    onAnswerStateChange?.(aggregateState, answerStrings.join(" | "));
  }

  // Fire initial NONE state on mount and whenever answers grid changes shape
  React.useEffect(() => {
    const states: Array<AnswerState> = [];
    component.blankCellCoords.forEach((coord) => {
      const val = answers[coord[1]]?.[coord[0]] ?? "";
      if (val === "") {
        states.push("NONE");
      } else if (
        val === component.tableContent[coord[1]][coord[0]].toLowerCase()
      ) {
        states.push("RIGHT");
      } else {
        states.push("WRONG");
      }
    });
    const aggregate: AnswerState = states.every((s) => s === "RIGHT")
      ? "RIGHT"
      : states.some((s) => s === "WRONG")
        ? "WRONG"
        : "NONE";
    const answerStrings = component.blankCellCoords.map(
      (coord) => answers[coord[1]]?.[coord[0]] ?? "",
    );
    onAnswerStateChange?.(aggregate, answerStrings.join(" | "));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component.blankCellCoords, component.tableContent, answers.length]);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {component.title ? (
        <Typography variant="h6" component="div">
          {component.title}
        </Typography>
      ) : null}
      <TableContainer component={Paper}>
        <Table size="small" sx={{ tableLayout: "fixed" }}>
          <TableBody>
            {component.tableContent.map((row, y) => (
              <TableRow key={`row-${y}`}>
                {row.map((cell, x) => {
                  const isBlank = blankIndexByCoord.has(`${x}-${y}`);
                  return (
                    <TableCell key={`cell-${x}-${y}`} sx={{ p: 0.5 }}>
                      {isBlank ? (
                        <TextField
                          value={answers[y][x]}
                          onChange={(e) =>
                            handleCellChange(x, y, e.target.value)
                          }
                          onFocus={() => setLastSelectedInput({ x, y })}
                          inputProps={{ "data-testid": `blank-${x}-${y}` }}
                          fullWidth
                          size="small"
                          variant="standard"
                          disabled={showAnswerState}
                          sx={{
                            "& .MuiInputBase-root.Mui-disabled::before": {
                              borderBottomColor:
                                showAnswerState &&
                                answers[y][x] ===
                                  component.tableContent[y][x].toLowerCase()
                                  ? "success.main"
                                  : showAnswerState &&
                                      answers[y][x] !== "" &&
                                      answers[y][x] !==
                                        component.tableContent[y][
                                          x
                                        ].toLowerCase()
                                    ? "error.main"
                                    : undefined,
                              borderBottomWidth: showAnswerState
                                ? 2
                                : undefined,
                              borderBottomStyle: showAnswerState
                                ? "solid"
                                : undefined,
                            },
                          }}
                        />
                      ) : (
                        <Typography sx={{ px: 1, py: 1.25 }}>{cell}</Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{ mt: 1, width: "100%" }}
        display="flex"
        justifyItems="flex-start"
      >
        {(component.characterButtons ?? []).map((character, i) => (
          <CharacterButton
            key={i}
            character={character}
            onClick={() => {
              if (!lastSelectedInput) return;
              const { x, y } = lastSelectedInput;
              handleCellChange(x, y, `${answers[y][x]}${character}`);
            }}
            disabled={showAnswerState}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TableFill;
