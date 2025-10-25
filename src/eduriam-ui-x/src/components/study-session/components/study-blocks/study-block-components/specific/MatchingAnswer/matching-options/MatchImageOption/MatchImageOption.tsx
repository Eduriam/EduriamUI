import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

import styles from "./MatchImageOption.module.css";

export interface IMatchImageOptionProps {
  imageUrl: string;
  selected?: boolean;
  disabled?: boolean;
  animateWrong?: boolean;
  onClick?: () => void;
}

const MatchImageOption: React.FC<IMatchImageOptionProps> = ({
  imageUrl,
  selected,
  disabled,
  animateWrong,
  onClick,
}) => {
  return (
    <Box
      className={animateWrong ? `${styles.shake}` : undefined}
      sx={{ minWidth: "150px" }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "250px",
          aspectRatio: "1/1",
          mx: "auto",
          borderStyle: selected === true ? "solid" : undefined,
          borderWidth: selected === true ? 2 : undefined,
          borderColor: selected === true ? "primary.main" : undefined,
        }}
      >
        <CardActionArea
          onClick={onClick}
          sx={{ width: "100%", height: "100%" }}
        >
          <CardMedia
            image={imageUrl}
            sx={{
              width: "100%",
              height: "100%",
              filter: disabled ? "contrast(50%) grayscale(1)" : undefined,
            }}
          />
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default MatchImageOption;
