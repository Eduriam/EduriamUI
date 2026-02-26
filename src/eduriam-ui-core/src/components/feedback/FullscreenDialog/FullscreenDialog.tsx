import type { ReactNode } from "react";

import Dialog from "@mui/material/Dialog";

import { PageRoot } from "../../layout/PageRoot";

export interface FullscreenDialogProps {
  /**
   * Whether the dialog is open.
   */
  open: boolean;

  /**
   * Called when the dialog requests to close.
   */
  onClose: () => void;

  /**
   * Dialog content.
   */
  children: ReactNode;

  /**
   * Optional data attribute used to identify the dialog in E2E tests.
   */
  dataTest?: string;
}

export const FullscreenDialog: React.FC<FullscreenDialogProps> = ({
  open,
  onClose,
  children,
  dataTest,
}) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: (theme) => ({
          backgroundColor: theme.palette.background.default,
        }),
      }}
    >
      <PageRoot data-test={dataTest}>{children}</PageRoot>
    </Dialog>
  );
};

export default FullscreenDialog;
