import { IconButton, type IconName } from "@eduriam/ui-core";

import React from "react";

import Box from "@mui/material/Box";

/**
 * Props for `StudySessionNavigationButton`.
 */
export interface StudySessionNavigationButtonProps {
  /** Navigation direction – determines which screen edge the button hugs. */
  direction: "prev" | "next";

  /** Called when the button is clicked. */
  onClick: () => void;

  /** Optional data attribute for E2E tests. */
  "data-test"?: string;
}

/**
 * Desktop-only hover-activated navigation button anchored to the left or
 * right edge of the viewport.  Appears when the user hovers within ~200 px
 * of the corresponding screen edge.
 */
export const StudySessionNavigationButton: React.FC<
  StudySessionNavigationButtonProps
> = ({ direction, onClick, "data-test": dataTest }) => {
  const isLeft = direction === "prev";
  const icon: IconName = isLeft ? "arrowLeft" : "arrowRight";

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        [isLeft ? "left" : "right"]: 0,
        width: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        zIndex: 1400,
        "& .StudySessionNavigationButton-icon": {
          opacity: 0,
          transition: "opacity 200ms ease",
        },
        "&:hover .StudySessionNavigationButton-icon": {
          opacity: 1,
        },
        paddingX: 8,
      }}
    >
      <Box className="StudySessionNavigationButton-icon">
        <IconButton
          icon={icon}
          size="large"
          variant="contained"
          color="textPrimary"
          onClick={onClick}
          data-test={dataTest}
        />
      </Box>
    </Box>
  );
};
