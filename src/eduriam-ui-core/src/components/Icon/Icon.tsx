import { IconProps } from "@mui/material";
import MuiIcon from "@mui/material/Icon";

/**
 * Additional props required by the `Icon` component.
 *
 * Extends MUI `IconProps` with a `name` that maps to a Material Icon glyph.
 */
export interface IconPropsExtended {
  /**
   * Material icon name.
   *
   * If the name ends with `_outlined`, the outlined icon set is used and
   * the suffix is removed for the rendered glyph.
   *
   * Examples: `"close"`, `"arrow_back"`, `"close_outlined"`.
   */
  name: string;
}

/**
 * Wrapper around MUI `Icon` that supports both filled and outlined
 * Material Icons via the `name` prop.
 *
 * Use this whenever you need a Material icon so styling and font setup
 * remain consistent.
 */
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
