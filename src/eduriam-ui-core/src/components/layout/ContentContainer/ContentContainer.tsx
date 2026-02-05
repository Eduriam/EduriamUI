import { ReactNode } from "react";

import Container, { ContainerProps } from "@mui/material/Container";
import Stack, { StackProps } from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";

const DESKTOP_MAX_WIDTHS = {
  small: 400,
  medium: 600,
  large: 800,
} as const;

type ContentContainerWidth = keyof typeof DESKTOP_MAX_WIDTHS;

export interface ContentContainerProps extends Omit<
  ContainerProps,
  "maxWidth"
> {
  children?: ReactNode;
  width?: ContentContainerWidth;
  justifyContent?: "flex-start" | "center" | "space-between";
  spacing?: StackProps["spacing"];
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  width = "medium",
  justifyContent,
  spacing,
  sx,
  ...rest
}) => {
  const theme = useTheme();
  const desktopMaxWidth = DESKTOP_MAX_WIDTHS[width];

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={[
        {
          width: "100%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          px: 6,
          py: 10,
          [theme.breakpoints.up("sm")]: {
            px: 0,
            py: 15,
            maxWidth: desktopMaxWidth,
          },
          flexGrow: 1,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ].filter(Boolean)}
      {...rest}
    >
      <Stack
        width="100%"
        flexGrow={1}
        direction="column"
        justifyContent={justifyContent}
        spacing={spacing}
      >
        {children}
      </Stack>
    </Container>
  );
};

export default ContentContainer;
