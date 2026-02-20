import React from "react";

import Box from "@mui/material/Box";
import MuiList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import type { ComponentPosition } from "../../../types/shared";
import { positionToStyle } from "../../../utils/positionToStyle";
import type { BaseVideoComponent } from "../../VideoComponent";

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
    <Box>
      <Typography variant="h3">{comp.title}</Typography>
      <MuiList
        component={comp.ordered ? "ol" : "ul"}
        disablePadding
        sx={{
          listStyle: comp.ordered ? "decimal" : "disc",
          pl: comp.ordered ? 3.5 : 3.5,
          "& .MuiListItemText-root": { mt: 0, mb: 0 },
        }}
      >
        {comp.items.map((i) => (
          <ListItem
            key={i.id}
            disableGutters
            disablePadding
            sx={{ display: "list-item", mb: 1 }}
          >
            <ListItemText
              primary={i.text}
              primaryTypographyProps={{ variant: "h5", component: "span" }}
            />
          </ListItem>
        ))}
      </MuiList>
    </Box>
  </Box>
);

export default List;
