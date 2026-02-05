import { MouseEvent } from "react";

import { ButtonProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Props for the `FullWidthButton` component.
 *
 * Adapts between a centered desktop button and a fixed, full-width mobile
 * button anchored to the bottom of the viewport.
 */
export interface FullWidthButtonProps {
  /**
   * Click handler for the button.
   */
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;

  /**
   * Semantic outcome variant for the mobile button color.
   *
   * - `"right"` – success/positive (uses success palette color).
   * - `"wrong"` – error/negative (uses error palette color).
   * - `undefined` – primary action color.
   */
  buttonVariant?: "right" | "wrong";

  /**
   * Button label or custom content.
   */
  children?: React.ReactNode;

  /**
   * Whether to insert extra spacing below the fixed button on mobile so
   * content is not visually cut off.
   *
   * @default false
   */
  bottomOffset?: boolean;
}

/**
 * Responsive call-to-action button that is centered on desktop and fixed
 * to the bottom of the screen on mobile.
 *
 * Use this for primary page actions that should always remain visible.
 */
export const FullWidthButton: React.FC<FullWidthButtonProps & ButtonProps> = ({
  children,
  onClick,
  buttonVariant,
  bottomOffset,
  ...rest
}) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {desktop ? (
        <Button
          onClick={(e) => onClick?.(e)}
          variant="contained"
          size="large"
          fullWidth
          sx={{ maxWidth: "300px", alignSelf: "center" }}
          {...rest}
        >
          {children}
        </Button>
      ) : (
        <>
          <Toolbar sx={{ zIndex: 0 }} />
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              zIndex: 1,
              backgroundColor: "white",
            }}
          >
            <Button
              onClick={(e) => onClick?.(e)}
              variant="contained"
              size="large"
              sx={{
                width: "100%",
                borderRadius: 0,
                height: "56px",
              }}
              color={
                buttonVariant === "right"
                  ? "success"
                  : buttonVariant === "wrong"
                    ? "error"
                    : "primary"
              }
              {...rest}
            >
              {children}
            </Button>
            {bottomOffset && <Toolbar />}
          </Box>
        </>
      )}
    </>
  );
};

export default FullWidthButton;
