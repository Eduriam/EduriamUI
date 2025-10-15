import type { Components, Theme } from "@mui/material/styles";

export const componentOverrides: Components<Omit<Theme, "components">> = {
  MuiCard: {
    styleOverrides: {
      root: { boxShadow: "0px 1px 3px 2px rgba(0, 0, 0, .06)" },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { boxShadow: "0px 1px 3px 2px rgba(0, 0, 0, .06)" },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.variant === "contained" && {
          boxShadow: "0px 1px 3px 2px rgba(0, 0, 0, .06)",
        }),
      }),
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: { boxShadow: "0px 1px 3px 2px rgba(0, 0, 0, .1)" },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: { root: { "& fieldset": { borderColor: "#b9b8b8" } } },
  },
  MuiListItem: { styleOverrides: { root: { borderRadius: 16 } } },
  MuiListItemButton: { styleOverrides: { root: { borderRadius: 16 } } },
};
