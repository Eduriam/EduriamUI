import type { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    energy: Palette["primary"];
    coin: Palette["primary"];
    chipGreen: Palette["primary"];
    chipYellow: Palette["primary"];
    chipBlue: Palette["primary"];
    chipPink: Palette["primary"];
  }

  interface PaletteOptions {
    energy?: PaletteOptions["primary"];
    coin?: PaletteOptions["primary"];
    chipGreen?: PaletteOptions["primary"];
    chipYellow?: PaletteOptions["primary"];
    chipBlue?: PaletteOptions["primary"];
    chipPink?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    chipGreen: true;
    chipYellow: true;
    chipBlue: true;
    chipPink: true;
  }
}

export const corePalette: PaletteOptions = {
  primary: {
    light: "#90D5FF",
    main: "#57B7FB",
    dark: "#4889D4",
    contrastText: "#000000",
  },
  background: { paper: "#F3F3F3", default: "#FFFFFF" },
  divider: "#E5E5E5",
  success: {
    light: "#CDF9CA",
    main: "#11D23F",
    dark: "#00A500",
    contrastText: "#000000",
  },
  error: {
    light: "#FFD1D6",
    main: "#FF5043",
    dark: "#C12B28",
    contrastText: "#000000",
  },
  warning: {
    light: "#ffe3ba",
    main: "#ffa439",
    dark: "#e0642b",
    contrastText: "#000000",
  },
  text: {
    primary: "#000000",
    secondary: "#6F6F6F",
    disabled: "#A6A6A6",
  },
  action: { disabledBackground: "#F3F3F3" },
  energy: { main: "#FFD951" },
  coin: { main: "#F5CB10" },
  chipGreen: { main: "#DBFFD0", contrastText: "#29CC57" },
  chipYellow: { main: "#FFF5CC", contrastText: "#F9A825" },
  chipBlue: { main: "#8BD5FB", contrastText: "#148DD4" },
  chipPink: { main: "#F9E1E7", contrastText: "#8A5F6B" },
  common: { white: "#ffffff", black: "#000000" },
};

export const corePaletteDark: PaletteOptions = {
  primary: {
    light: "#90D5FF",
    main: "#57B7FB",
    dark: "#4D9CE9",
    contrastText: "#000000",
  },
  background: { paper: "#292834", default: "#1A181D" },
  divider: "#454545",
  success: {
    light: "#CDF9CA",
    main: "#11D23F",
    dark: "#00B800",
    contrastText: "#000000",
  },
  error: {
    light: "#FFD1D6",
    main: "#FF5043",
    dark: "#D03634",
    contrastText: "#000000",
  },
  warning: {
    light: "#FFE3BA",
    main: "#FFA439",
    dark: "#EC7A2F",
    contrastText: "#000000",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#989898",
    disabled: "#A6A6A6",
  },
  action: { disabledBackground: "#292834" },
  energy: { main: "#FFD951" },
  coin: { main: "#F5CB10" },
  chipGreen: { main: "#DBFFD0", contrastText: "#29CC57" },
  chipYellow: { main: "#FFF5CC", contrastText: "#F9A825" },
  chipBlue: { main: "#8BD5FB", contrastText: "#148DD4" },
  chipPink: { main: "#F9E1E7", contrastText: "#8A5F6B" },
  common: { white: "#ffffff", black: "#000000" },
};
