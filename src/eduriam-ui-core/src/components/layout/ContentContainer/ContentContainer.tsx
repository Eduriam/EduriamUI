import { ReactNode } from "react";

import Container from "@mui/material/Container";
import Stack, { StackProps } from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";

const DESKTOP_MAX_WIDTHS = {
  small: 400,
  medium: 600,
  large: 800,
} as const;

/**
 * Width presets for `ContentContainer` on desktop breakpoints.
 *
 * - `"small"` – narrow layouts such as dialogs or focused forms.
 * - `"medium"` – default page content width.
 * - `"large"` – wider content like dashboards.
 */
type ContentContainerWidth = keyof typeof DESKTOP_MAX_WIDTHS;

/**
 * Props for the `ContentContainer` component.
 *
 * Centers page content with consistent horizontal padding and max width.
 */
export interface ContentContainerProps {
  /**
   * Child content to render inside the container.
   */
  children?: ReactNode;

  /**
   * Maximum content width preset applied on desktop breakpoints.
   *
   * @default "medium"
   */
  width?: ContentContainerWidth;

  /**
   * Vertical alignment of children within the stack.
   */
  justifyContent?: "flex-start" | "center" | "space-between";

  /**
   * Vertical spacing between stacked children.
   */
  spacing?: StackProps["spacing"];

  /**
   * Top padding preset for the container.
   *
   * - `"none"` – no vertical padding.
   * - `"small"` – 5 on mobile, 10 on `sm` and above.
   * - `"medium"` – 10 on mobile, 15 on `sm` and above.
   *
   * @default "medium"
   */
  paddingTop?: "none" | "small" | "medium";

  /**
   * Bottom padding preset for the container.
   *
   * - `"none"` – no vertical padding.
   * - `"small"` – 5 on mobile, 10 on `sm` and above.
   * - `"medium"` – 10 on mobile, 15 on `sm` and above.
   *
   * @default "medium"
   */
  paddingBottom?: "none" | "small" | "medium";
}

/**
 * Centered page content wrapper with responsive padding and max width.
 *
 * Use `ContentContainer` for top-level screen content so pages feel
 * consistent and responsive without manual layout code.
 */
export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  width = "medium",
  justifyContent,
  spacing,
  paddingTop = "medium",
  paddingBottom = "medium",
}) => {
  const theme = useTheme();
  const desktopMaxWidth = DESKTOP_MAX_WIDTHS[width];

  const ptMobile =
    paddingTop === "none" ? 0 : paddingTop === "small" ? 5 : 10;
  const ptSmUp =
    paddingTop === "none" ? 0 : paddingTop === "small" ? 10 : 15;

  const pbMobile =
    paddingBottom === "none" ? 0 : paddingBottom === "small" ? 5 : 10;
  const pbSmUp =
    paddingBottom === "none" ? 0 : paddingBottom === "small" ? 10 : 15;

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: "100%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        px: 6,
        pt: ptMobile,
        pb: pbMobile,
        [theme.breakpoints.up("sm")]: {
          px: 0,
          pt: ptSmUp,
          pb: pbSmUp,
          maxWidth: desktopMaxWidth,
        },
        flexGrow: 1,
      }}
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
