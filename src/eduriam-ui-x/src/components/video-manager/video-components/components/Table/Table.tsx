import React from "react";

import Box from "@mui/material/Box";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import type { ComponentPosition } from "../../../types/shared";
import { positionToStyle } from "../../../utils/positionToStyle";
import type { BaseVideoComponent } from "../../VideoComponent";

export type TableCell = string | number;
export type TableRow = TableCell[];

export interface ITable extends BaseVideoComponent {
  type: "TABLE";
  position: ComponentPosition;
  highlightHeader: boolean;
  rows: TableRow[];
}

export interface ITableProps {
  comp: ITable;
}

export const Table: React.FC<ITableProps> = ({ comp }) => {
  const header = comp.highlightHeader ? (comp.rows[0] ?? []) : [];
  const body = comp.highlightHeader ? comp.rows.slice(1) : comp.rows;
  return (
    <Box style={positionToStyle(comp.position)}>
      <TableContainer component={Box} sx={{ overflow: "auto" }}>
        <MuiTable
          size="small"
          stickyHeader={comp.highlightHeader && header.length > 0}
        >
          {comp.highlightHeader && header.length > 0 && (
            <TableHead>
              <TableRow>
                {header.map((cell, idx) => (
                  <TableCell
                    key={idx}
                    sx={{
                      backgroundColor: "background.default",
                      borderBottom: 1,
                      borderColor: "divider",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography variant="subtitle2">{String(cell)}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {body.map((row, r) => (
              <TableRow key={r}>
                {row.map((cell, c) => (
                  <TableCell
                    key={c}
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography variant="body1">{String(cell)}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
};

export default Table;
