import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

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
  const hasHeader = comp.highlightHeader && header.length > 0;

  return (
    <Box style={positionToStyle(comp.position)}>
      <Box
        sx={{
          width: "min(92%, 1100px)",
          px: 3,
          py: 2,
        }}
      >
        <TableContainer
          component={Paper}
          sx={(theme) => ({
            overflow: "auto",
            borderRadius: 2.5,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: `0 10px 26px ${alpha(theme.palette.common.black, 0.08)}`,
            backgroundColor: theme.palette.background.paper,
          })}
        >
          <MuiTable size="small" stickyHeader={hasHeader}>
            {hasHeader && (
              <TableHead>
                <TableRow>
                  {header.map((cell, idx) => (
                    <TableCell
                      key={idx}
                      sx={(theme) => ({
                        backgroundColor: theme.palette.background.default,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        py: 1.25,
                        px: 2,
                        whiteSpace: "nowrap",
                      })}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, letterSpacing: 0.2 }}
                      >
                        {String(cell)}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {body.map((row, r) => (
                <TableRow
                  key={r}
                  sx={(theme) => ({
                    "&:nth-of-type(2n)": {
                      backgroundColor: alpha(theme.palette.action.hover, 0.3),
                    },
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.action.selected, 0.32),
                    },
                  })}
                >
                  {row.map((cell, c) => (
                    <TableCell
                      key={c}
                      sx={(theme) => ({
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        py: 1.15,
                        px: 2,
                        whiteSpace: "nowrap",
                      })}
                    >
                      <Typography variant="body2">{String(cell)}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Table;
