import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import styles from "./MatchTextOption.module.css";

export interface IMatchTextOptionProps {
  text: string;
  selected?: boolean;
  disabled?: boolean;
  animateWrong?: boolean;
  onClick?: () => void;
}

const MatchTextOption: React.FC<IMatchTextOptionProps> = ({
  text,
  selected,
  disabled,
  animateWrong,
  onClick,
}) => {
  return (
    <Box className={animateWrong ? `${styles.shake}` : undefined}>
      <Button
        variant={"contained"}
        color={"inherit"}
        sx={{
          borderRadius: "8px",
          backgroundColor: "inherit",
          borderStyle: selected === true ? "solid" : undefined,
          borderWidth: selected === true ? 2 : undefined,
          borderColor: selected === true ? "primary.main" : undefined,
          py: 1.5,
        }}
        fullWidth
        onClick={onClick}
        disabled={disabled}
        size="large"
      >
        <Typography variant="h6" sx={{ textTransform: "none" }}>
          {text}
        </Typography>
      </Button>
    </Box>
  );
};

export default MatchTextOption;
