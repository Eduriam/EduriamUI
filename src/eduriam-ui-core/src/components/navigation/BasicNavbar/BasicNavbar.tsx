import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { type IconName } from "../../data-display/Icon";
import { IconButton } from "../../inputs/IconButton";
import {
  DESKTOP_PADDING_X,
  MOBILE_PADDING_X,
} from "../../layout/ContentContainer";

/**
 * Icon button config for `BasicNavbar`.
 */
export type BasicNavbarIconButton = {
  /**
   * Material icon name to display.
   */
  icon: IconName;

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
export type BasicNavbarBackground = "default" | "transparent";

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

  /**
   * Optional navbar background style.
   */
  background?: BasicNavbarBackground;
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
      <IconButton
        icon={button.icon}
        variant="text"
        color="textPrimary"
        onClick={button.onClick}
        data-test={button.dataTest}
      />
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
  background = "default",
}) => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor:
          background === "transparent" ? "transparent" : "background.default",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          alignItems: "center",
          display: "flex",
          height: "64px",
          justifyContent: "space-between",
          minHeight: "64px",
          position: "relative",
          margin: "0 auto",
          maxWidth: 1000,
          width: "100%",
          px: MOBILE_PADDING_X,
          [theme.breakpoints.up("sm")]: {
            px: DESKTOP_PADDING_X,
          },
        }}
      >
        <Box>{renderButton(leftButton)}</Box>
        {header && (
          <Typography color="text.primary" variant="h6">
            {header}
          </Typography>
        )}
        <Box>{renderButton(rightButton)}</Box>
      </Toolbar>
    </AppBar>
  );
};

export default BasicNavbar;
