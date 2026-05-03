import { LargeButton, theme } from "@eduriam/ui-core";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";

const LARGE_BUTTON_HEIGHT = 48;
const LARGE_BUTTON_BORDER_RADIUS = "16px";

export interface CodeOptionButtonProps {
  selected?: boolean;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  draggableId: string;
  draggableData?: Record<string, unknown>;
  "data-test"?: string;
  "data-testid"?: string;
}

export const CodeOptionButton: React.FC<CodeOptionButtonProps> = ({
  selected = false,
  children,
  onClick,
  draggableId,
  draggableData,
  "data-test": dataTest,
  "data-testid": dataTestId,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: draggableId,
      data: draggableData,
      disabled: selected,
    });

  const content = selected ? (
    <Box
      height={LARGE_BUTTON_HEIGHT}
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: LARGE_BUTTON_BORDER_RADIUS,
        paddingTop: (theme) => theme.spacing(3),
        paddingBottom: (theme) => theme.spacing(3),
        paddingLeft: "16px",
        paddingRight: "16px",
        backgroundColor: "background.paper",
        display: "flex",
        alignItems: "center",
      }}
      data-test={dataTest}
    >
      <Typography
        variant={"codeButton" as TypographyProps["variant"]}
        sx={{ color: "background.paper", userSelect: "none" }}
      >
        {children}
      </Typography>
    </Box>
  ) : (
    <LargeButton
      variant="outlined"
      color="textPrimary"
      onClick={onClick}
      data-test={dataTest}
      fullWidth={false}
    >
      <Typography
        variant={"codeButton" as TypographyProps["variant"]}
        sx={{ userSelect: "none" }}
      >
        {children}
      </Typography>
    </LargeButton>
  );

  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: "fit-content",
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0 : 1,
        touchAction: "none",
        cursor: selected ? "default" : "grab",
      }}
      data-testid={dataTestId}
      {...attributes}
      {...listeners}
    >
      {content}
    </Box>
  );
};

export default CodeOptionButton;
