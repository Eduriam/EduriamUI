import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DOT_SLOT_SIZE = 48;
const ORDERED_DOT_SIZE = 48;
const UNORDERED_DOT_SIZE = 32;
const DOT_BORDER = 6;

export interface IListDotProps {
  ordered: boolean;
  number: number;
}

export const ListDot: React.FC<IListDotProps> = ({ ordered, number }) => (
  <Box
    sx={{
      width: DOT_SLOT_SIZE,
      height: DOT_SLOT_SIZE,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexShrink: 0,
    }}
  >
    <Box
      sx={(theme) => ({
        width: ordered ? ORDERED_DOT_SIZE : UNORDERED_DOT_SIZE,
        height: ordered ? ORDERED_DOT_SIZE : UNORDERED_DOT_SIZE,
        borderRadius: "64px",
        border: `${DOT_BORDER}px solid ${theme.palette.primary.light}`,
        bgcolor: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxSizing: "border-box",
      })}
    >
      {ordered ? (
        <Typography
          variant="h6"
          sx={(theme) => ({
            color: theme.palette.primary.contrastText,
          })}
        >
          {number}
        </Typography>
      ) : null}
    </Box>
  </Box>
);

export default ListDot;
