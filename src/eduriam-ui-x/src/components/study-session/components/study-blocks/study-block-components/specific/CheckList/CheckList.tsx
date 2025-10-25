import React, { useEffect, useMemo, useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

import { AnswerState } from "../../../../../types/AnswerState";
import { CheckListComponent } from "../../types/StudyBlockComponentDTO";

export interface ICheckListStudyBlockComponent {
  component: CheckListComponent;
  onAnswerStateChange?: (answer: AnswerState) => void;
}

export const CheckList: React.FC<ICheckListStudyBlockComponent> = ({
  component,
  onAnswerStateChange,
}) => {
  const [checked, setChecked] = useState<boolean[]>(() =>
    component.items.map(() => false),
  );

  const state: AnswerState = useMemo(() => {
    if (checked.every((v) => v === false)) return "NONE";
    return checked.every((v) => v === true) ? "RIGHT" : "WRONG";
  }, [checked]);

  useEffect(() => {
    onAnswerStateChange?.(state);
  }, [state, onAnswerStateChange]);

  return (
    <FormGroup>
      {component.items.map((item, idx) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={checked[idx]}
              onChange={(e) => {
                const next = [...checked];
                next[idx] = e.target.checked;
                setChecked(next);
              }}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );
};

export default CheckList;
