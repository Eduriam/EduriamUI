import ButtonBase, { ButtonBaseProps } from "@mui/material/ButtonBase";

import { Icon } from "../../Icon";

export type IconButtonSize = "small" | "medium" | "large";
export type IconButtonVariant = "contained" | "outlined" | "text";

export interface IconButtonProps extends Omit<ButtonBaseProps, "children"> {
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  icon?: string;
}

const SIZE_CONFIG: Record<
  IconButtonSize,
  { button: number; icon: number; radius: number }
> = {
  small: { button: 32, icon: 24, radius: 8 },
  medium: { button: 40, icon: 24, radius: 12 },
  large: { button: 48, icon: 32, radius: 12 },
};

export const IconButton: React.FC<IconButtonProps> = ({
  size = "medium",
  variant = "contained",
  icon = "play_arrow",
  ...rest
}) => {
  const config = SIZE_CONFIG[size];

  return (
    <ButtonBase
      sx={(theme) => ({
        alignItems: "center",
        backgroundColor:
          variant === "contained"
            ? theme.palette.primary.main
            : variant === "outlined"
              ? theme.palette.background.default
              : "transparent",
        border:
          variant === "outlined"
            ? `1px solid ${theme.palette.divider}`
            : "none",
        borderRadius: `${config.radius}px`,
        color:
          variant === "contained"
            ? theme.palette.common.white
            : theme.palette.primary.main,
        display: "inline-flex",
        height: config.button,
        justifyContent: "center",
        width: config.button,
      })}
      {...rest}
    >
      <Icon name={icon} sx={{ fontSize: config.icon }} />
    </ButtonBase>
  );
};

export default IconButton;
