import React from "react";
import {
  ExampleButton as CoreExampleButton,
  ExampleButtonProps,
} from "@eduriam-ui/core";

export const ExampleButton: React.FC<ExampleButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <CoreExampleButton color="secondary" variant="outlined" {...props}>
      {children}
    </CoreExampleButton>
  );
};

export default ExampleButton;
