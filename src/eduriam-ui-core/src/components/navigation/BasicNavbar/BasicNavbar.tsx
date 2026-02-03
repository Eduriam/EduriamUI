import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Icon } from "../../Icon";

export type BasicNavbarIconButton = {
  icon: string;
  onClick: () => void;
  dataTest?: string;
};

export type BasicNavbarTextButton = {
  text: string;
  onClick: () => void;
  dataTest?: string;
};

export type BasicNavbarButton = BasicNavbarIconButton | BasicNavbarTextButton;

export interface BasicNavbarProps extends Omit<AppBarProps, "children"> {
  header?: string;
  leftButton?: BasicNavbarButton;
  rightButton?: BasicNavbarButton;
}

const isIconButton = (
  button: BasicNavbarButton,
): button is BasicNavbarIconButton => "icon" in button;

const renderButton = (button?: BasicNavbarButton) => {
  if (!button) {
    return null;
  }

  if (isIconButton(button)) {
    return (
      <ButtonBase
        data-test={button.dataTest}
        onClick={button.onClick}
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
        <Icon name={button.icon} sx={{ fontSize: 24 }} />
      </ButtonBase>
    );
  }

  return (
    <ButtonBase
      data-test={button.dataTest}
      onClick={button.onClick}
      sx={{ color: "primary.dark" }}
    >
      <Typography
        variant="subtitle2"
        sx={{ lineHeight: "24px", textTransform: "uppercase" }}
      >
        {button.text}
      </Typography>
    </ButtonBase>
  );
};

export const BasicNavbar: React.FC<BasicNavbarProps> = ({
  header,
  leftButton,
  rightButton,
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
          height: "64px",
          justifyContent: "space-between",
          minHeight: "64px",
          padding: "0 24px",
          position: "relative",
        }}
      >
        <Box>{renderButton(leftButton)}</Box>
        {header && (
          <Typography
            color="text.primary"
            sx={{
              fontSize: 22,
              fontWeight: 500,
              left: "50%",
              lineHeight: "28px",
              position: "absolute",
              textAlign: "center",
              transform: "translateX(-50%)",
            }}
          >
            {header}
          </Typography>
        )}
        <Box>{renderButton(rightButton)}</Box>
      </Toolbar>
    </AppBar>
  );
};

export default BasicNavbar;
