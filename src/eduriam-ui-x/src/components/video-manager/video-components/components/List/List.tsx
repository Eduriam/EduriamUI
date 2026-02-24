import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { ComponentPosition } from "../../../types/shared";
import { positionToStyle } from "../../../utils/positionToStyle";
import type { BaseVideoComponent } from "../../VideoComponent";
import { ListDot } from "./components/ListDot";

export type ListItem = { id: string; text: string };

export interface IList extends BaseVideoComponent {
  type: "LIST";
  position: ComponentPosition;
  title: string;
  items: ListItem[];
  ordered: boolean;
}

export interface IListProps {
  comp: IList;
}

export const List: React.FC<IListProps> = ({ comp }) => (
  <Box style={positionToStyle(comp.position)}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        alignItems: "flex-start",
      }}
    >
      {comp.items.map((item, index) => (
        <Box
          key={item.id}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <ListDot ordered={comp.ordered} number={index + 1} />
          <Typography variant="h2">{item.text}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

export default List;
