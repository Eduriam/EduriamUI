import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { ImageComponent } from "../../types/StudyBlockComponentDTO";

export interface IImageStudyBlockComponent {
  component: ImageComponent;
}

export const Image: React.FC<IImageStudyBlockComponent> = ({ component }) => {
  const sizeToMax: Record<NonNullable<typeof component.size>, { w: number; h: number }> = {
    small: { w: 160, h: 200 },
    medium: { w: 200, h: 260 },
    large: { w: 320, h: 420 },
  };
  const chosen = component.size ? sizeToMax[component.size] : { w: 200, h: 260 };
  const maxWidthPx = `${chosen.w}px`;
  const maxHeightPx = `${chosen.h}px`;
  const VIEWPORT_MAX_WIDTH = "90vw";
  const VIEWPORT_MAX_HEIGHT = "60vh";
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: { xs: VIEWPORT_MAX_WIDTH, sm: maxWidthPx },
          my: 2,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: VIEWPORT_MAX_WIDTH, sm: maxWidthPx },
            maxHeight: { xs: VIEWPORT_MAX_HEIGHT, sm: maxHeightPx },
            m: "auto",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }}
            image={component.url}
            alt={component.alt ?? ""}
            title={component.alt ?? ""}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default Image;

