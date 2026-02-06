import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Icon } from "../../data-display/Icon";

/**
 * Icon button config for `BasicNavbar`.
 */
export type BasicNavbarIconButton = {
  /**
   * Material icon name to display.
   */
  icon: string;

  /**
   * Click handler for the button.
   */
  onClick: () => void;

  /**
   * Optional test id written to `data-test`.
   */
  dataTest?: string;
};

/**
 * Text button config for `BasicNavbar`.
 */
export type BasicNavbarTextButton = {
  /**
   * Uppercase label text for the button.
   */
  text: string;

  /**
   * Click handler for the button.
   */
  onClick: () => void;

  /**
   * Optional test id written to `data-test`.
   */
  dataTest?: string;
};

export type BasicNavbarButton = BasicNavbarIconButton | BasicNavbarTextButton;

/**
 * Props for the `BasicNavbar` component.
 *
 * Simple top navigation bar with optional left/right buttons and a centered header.
 */
export interface BasicNavbarProps {
  /**
   * Optional centered header text shown in the bar.
   */
  header?: string;

  /**
   * Optional left-aligned button (icon or text).
   */
  leftButton?: BasicNavbarButton;

  /**
   * Optional right-aligned button (icon or text).
   */
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

/**
 * Basic top app bar with an optional centered title and side actions.
 *
 * Use this for simple pages that need a header with back/close actions.
 */
export const BasicNavbar: React.FC<BasicNavbarProps> = ({
  header,
  leftButton,
  rightButton,
}) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "background.default",
        boxShadow: "none",
        color: "text.primary",
      }}
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
