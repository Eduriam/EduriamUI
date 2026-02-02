import type { Components, Theme } from "@mui/material/styles";

const elevationLight1 = "0px 3px 8px 0px rgba(0, 0, 0, 0.08)";

export const componentOverrides: Components<Omit<Theme, "components">> = {
  MuiCard: {
    styleOverrides: {
      root: { boxShadow: elevationLight1 },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { boxShadow: elevationLight1 },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.variant === "contained" && {
          boxShadow: elevationLight1,
        }),
      }),
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: { boxShadow: elevationLight1 },
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
    styleOverrides: {
      root: ({ theme }) => ({
        "& fieldset": { borderColor: theme.palette.divider },
      }),
    },
  },
  MuiListItem: { styleOverrides: { root: { borderRadius: 16 } } },
  MuiListItemButton: { styleOverrides: { root: { borderRadius: 16 } } },
};
