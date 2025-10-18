import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../src/eduriam-ui-core/src/theme/theme";
import "../src/eduriam-ui-core/src/styles/fonts.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
