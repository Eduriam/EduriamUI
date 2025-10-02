import React from "react";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

export interface ExampleCheckboxProps extends CheckboxProps {}

export const ExampleCheckbox: React.FC<ExampleCheckboxProps> = (props) => {
  return (
    <Checkbox
      color="primary"
      sx={{
        "&.Mui-checked": {
          color: "primary.main",
        },
      }}
      {...props}
    />
  );
};

export default ExampleCheckbox;
