import { ReactNode } from "react";

import Container, { ContainerProps } from "@mui/material/Container";
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
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  width = "medium",
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
          px: 6,
          [theme.breakpoints.up("sm")]: {
            px: 0,
            maxWidth: desktopMaxWidth,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ].filter(Boolean)}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default ContentContainer;
