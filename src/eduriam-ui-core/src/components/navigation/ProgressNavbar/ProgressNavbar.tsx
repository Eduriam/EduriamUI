import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Toolbar from "@mui/material/Toolbar";

import { Icon } from "../../Icon";
import { ProgressBar, ProgressBarSize } from "../../feedback/ProgressBar";

export type ProgressNavbarIconButton = {
  icon: string;
  onClick: () => void;
  dataTest?: string;
};

export interface ProgressNavbarProps extends Omit<AppBarProps, "children"> {
  leftButton?: ProgressNavbarIconButton;
  progressValue?: number;
  progressSize?: ProgressBarSize;
}

export const ProgressNavbar: React.FC<ProgressNavbarProps> = ({
  leftButton,
  progressValue = 40,
  progressSize = "large",
  sx,
  ...rest
}) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={[
        {
          backgroundColor:
            rest.color === "transparent" ? "transparent" : "background.default",
          boxShadow: "none",
          color: "text.primary",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ].filter(Boolean)}
      {...rest}
    >
      <Toolbar
        sx={{
          alignItems: "center",
          display: "flex",
          gap: "24px",
          height: "64px",
          minHeight: "64px",
          padding: "0 24px",
        }}
      >
        <Box>
          {leftButton && (
            <ButtonBase
              data-test={leftButton.dataTest}
              onClick={leftButton.onClick}
              sx={{
                alignItems: "center",
                borderRadius: "12px",
                color: "text.primary",
                display: "inline-flex",
                height: "24px",
                justifyContent: "center",
                width: "24px",
              }}
            >
              <Icon name={leftButton.icon} sx={{ fontSize: 24 }} />
            </ButtonBase>
          )}
        </Box>
        <ProgressBar
          size={progressSize}
          value={progressValue}
          sx={{ flex: 1, width: "100%" }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default ProgressNavbar;
