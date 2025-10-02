import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export interface ExampleButtonProps extends ButtonProps {}

export const ExampleButton: React.FC<ExampleButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Paper elevation={1} sx={{ display: "inline-block", p: 1 }}>
      <Button variant="contained" color="primary" {...props}>
        {children}
      </Button>
    </Paper>
  );
};

export default ExampleButton;
