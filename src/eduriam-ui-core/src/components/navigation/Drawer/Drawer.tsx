import type { ReactNode } from "react";

import MuiDrawer from "@mui/material/Drawer";
import type { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
   * Maximum width of the drawer surface on desktop.
   *
   * @default 480
   */
  maxWidth?: number | string;

  /**
   * Drawer content.
   */
  children?: ReactNode;
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
  maxWidth = 480,
  children,
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
        sx: (muiTheme: Theme) => {
          const borderRadiusDesktop = muiTheme.shape.borderRadius * 2;

          return {
            boxSizing: "border-box",
            width: "100%",
            maxWidth,
            marginX: "auto",
            padding: 6,
            maxHeight: { xs: "90vh", md: "80vh" },
            display: "flex",
            flexDirection: "column",
            borderRadius: isMobile
              ? "24px 24px 0 0"
              : `${borderRadiusDesktop}px`,
            // Desktop positioning – lift the drawer up so it looks like a dialog
            [muiTheme.breakpoints.up("md")]: {
              bottom: "auto",
              top: "10vh",
            },
          };
        },
      }}
    >
      {children}
    </MuiDrawer>
  );
};

export default Drawer;

