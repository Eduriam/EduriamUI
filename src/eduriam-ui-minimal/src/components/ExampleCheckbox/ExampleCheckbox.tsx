import React from "react";
import {
  ExampleCheckbox as CoreExampleCheckbox,
  ExampleCheckboxProps,
} from "@eduriam/ui-core";

export const ExampleCheckbox: React.FC<ExampleCheckboxProps> = (props) => {
  return (
    <CoreExampleCheckbox
      sx={{
        "&.Mui-checked": { color: "secondary.main" },
      }}
      {...props}
    />
  );
};

export default ExampleCheckbox;
