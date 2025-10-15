import { IconProps } from "@mui/material";
import MuiIcon from "@mui/material/Icon";

export interface IconPropsExtended {
  name: string;
}

export const Icon: React.FC<IconPropsExtended & IconProps> = (props) => {
  let variant: "OUTLINED" | "FILLED" = "FILLED";
  if (props.name.endsWith("_outlined")) {
    variant = "OUTLINED";
  }

  const cutOutlined = (str: string) => str.slice(0, -9);

  return (
    <MuiIcon
      baseClassName={
        variant === "OUTLINED" ? "material-icons-outlined" : undefined
      }
      {...props}
    >
      {variant === "OUTLINED" ? cutOutlined(props.name) : props.name}
    </MuiIcon>
  );
};

export default Icon;
