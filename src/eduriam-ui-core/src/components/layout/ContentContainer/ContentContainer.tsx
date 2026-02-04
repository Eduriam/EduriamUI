import { ReactNode } from "react";

import Container, { ContainerProps } from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";

const DESKTOP_MAX_WIDTH = 960;

export interface ContentContainerProps extends Omit<
  ContainerProps,
  "maxWidth"
> {
  children?: ReactNode;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  sx,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={[
        {
          width: "100%",
          mx: "auto",
          px: { xs: 6, md: 0 },
          [theme.breakpoints.up("md")]: {
            maxWidth: DESKTOP_MAX_WIDTH,
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
