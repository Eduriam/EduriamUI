import { Sequence, useVideoConfig } from "remotion";

import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { IDString } from "../../../../../models/ID";
import type { BaseVideoComponent } from "../../VideoComponent";
import { ListDot } from "./components/ListDot";

export type ListItem = { id: IDString; text: string; startTime?: number };

export interface IList extends BaseVideoComponent {
  type: "LIST";
  items: ListItem[];
  ordered: boolean;
}

export interface IListProps {
  comp: IList;
}

export const List: React.FC<IListProps> = ({ comp }) => {
  const { fps } = useVideoConfig();

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "flex-start",
        }}
      >
        {comp.items.map((item, index) => {
          const startFrame = Math.max(
            0,
            Math.round(((item.startTime ?? 0) / 1000) * fps),
          );

          return startFrame > 0 ? (
            <Sequence key={item.id} from={startFrame} layout="none">
              <Box
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
            </Sequence>
          ) : (
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
          );
        })}
      </Box>
    </Box>
  );
};

export default List;
