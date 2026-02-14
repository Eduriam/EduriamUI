import type { ReactNode } from "react";

import MuiDrawer from "@mui/material/Drawer";
import type { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { ContentContainer } from "../../layout/ContentContainer";

/**
 * Supported background color tokens for the `Drawer` surface.
 *
 * These map directly to slots on `theme.palette` so that callers are forced
 * to use design-system colors instead of arbitrary CSS values.
 */
export type DrawerBackgroundColor =
  /**
   * Use the default elevated surface color (same as the drawer's default).
   */
  | "default"
  /**
   * Use the success/positive color.
   */
  | "success"
  /**
   * Use the error/negative color.
   */
  | "error";

export interface DrawerProps {
  /**
   * Whether the drawer is open.
   */
  open: boolean;

  /**
   * Called when the drawer requests to be closed,
   * for example when the backdrop is clicked or Escape is pressed.
   */
  onClose: () => void;

  /**
   * Maximum width of the drawer surface when presented as a desktop dialog.
   *
   * @default 480
   */
  maxDialogWidth?: number | string;

  /**
   * Maximum width preset for the **drawer content**.
   *
   * Forwarded to `ContentContainer` as its `width` prop.
   *
   * @default "medium"
   */
  maxContentWidth?: "small" | "medium" | "large";

  /**
   * Disable the "dialog-like" desktop presentation.
   *
   * By default, on larger screens the drawer surface is lifted/centered and
   * given fully rounded corners to behave like a dialog. When this is `true`,
   * the drawer keeps the standard bottom-sheet style even on desktop.
   *
   * @default false
   */
  disableDesktopDialog?: boolean;

  /**
   * Vertical padding preset/scale for the drawer content.
   *
   * @default "medium"
   */
  paddingY?: "small" | "medium" | "large";

  /**
   * Horizontal padding preset/scale for the drawer content.
   *
   * @default "medium"
   */
  paddingX?: "small" | "medium" | "large";

  /**
   * Optional background color token for the drawer surface.
   *
   * Must be a value from the theme palette to ensure consistency with the
   * design system. When omitted, the default elevated surface background is
   * used.
   */
  backgroundColor?: DrawerBackgroundColor;

  /**
   * Drawer content.
   */
  children?: ReactNode;

  /**
   * Optional data attribute used to identify this drawer in E2E tests.
   *
   * Passed to the drawer surface via MUI `PaperProps` as `data-test`.
   */
  "data-test"?: string;
}

/**
 * Responsive modal drawer.
 *
 * - On **mobile** it behaves like a bottom sheet sliding up from the bottom.
 * - On **desktop** it appears centered, similar to a dialog with rounded corners.
 */
export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  maxDialogWidth = 480,
  maxContentWidth = "medium",
  disableDesktopDialog = false,
  paddingY = "medium",
  paddingX = "medium",
  backgroundColor,
  children,
  "data-test": dataTest,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MuiDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        "data-test": dataTest,
        sx: (muiTheme: Theme) => {
          const borderRadiusDesktop = muiTheme.shape.borderRadius * 2;
          const shouldUseDialogStyle = !disableDesktopDialog && !isMobile;
          const resolvePaddingScale = (
            value: "small" | "medium" | "large",
          ): number => {
            switch (value) {
              case "small":
                return 5;
              case "large":
                return 7;
              case "medium":
              default:
                return 6;
            }
          };

          const paddingScaleY = resolvePaddingScale(paddingY);
          const paddingScaleX = resolvePaddingScale(paddingX);

          const resolvedBackgroundColor = (() => {
            if (!backgroundColor || backgroundColor === "default") {
              return muiTheme.palette.background.default;
            }

            if (backgroundColor === "success") {
              return muiTheme.palette.success.light;
            }

            if (backgroundColor === "error") {
              return muiTheme.palette.error.light;
            }

            // Fallback to the default surface if an unsupported value somehow slips through.
            return muiTheme.palette.background.default;
          })();

          return {
            boxSizing: "border-box",
            width: "100%",
            maxWidth: shouldUseDialogStyle ? maxDialogWidth : "100%",
            marginX: shouldUseDialogStyle ? "auto" : 0,
            paddingY: muiTheme.spacing(paddingScaleY),
            paddingX: isMobile ? 0 : muiTheme.spacing(paddingScaleX),
            maxHeight: { xs: "90vh", md: "80vh" },
            display: "flex",
            flexDirection: "column",
            borderRadius: shouldUseDialogStyle
              ? `${borderRadiusDesktop}px`
              : "24px 24px 0 0",
            backgroundColor: resolvedBackgroundColor,
            ...(!disableDesktopDialog
              ? {
                  // Desktop positioning – lift the drawer up so it looks like a dialog
                  [muiTheme.breakpoints.up("md")]: {
                    bottom: "auto",
                    top: "10vh",
                  },
                }
              : {}),
          };
        },
      }}
    >
      <ContentContainer
        width={maxContentWidth}
        paddingTop="none"
        paddingBottom="none"
      >
        {children}
      </ContentContainer>
    </MuiDrawer>
  );
};

export default Drawer;
