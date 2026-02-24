import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import type { ComponentPosition } from "../../../types/shared";
import { positionToStyle } from "../../../utils/positionToStyle";
import type { BaseVideoComponent } from "../../VideoComponent";

export type DatabaseValue = string | number | boolean | null;

export interface DatabaseColumn {
  key: string;
  label?: string;
}

export type DatabaseRow = Record<string, DatabaseValue>;

export interface IDatabaseTable extends BaseVideoComponent {
  type: "DATABASE_TABLE";
  position: ComponentPosition;
  columns: DatabaseColumn[];
  rows: DatabaseRow[];
  tableName?: string;
  maxHeight?: number;
}

export interface IDatabaseTableProps {
  comp: IDatabaseTable;
}

const formatValue = (value: DatabaseValue): string => {
  if (value === null) {
    return "NULL";
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  return String(value);
};

export const DatabaseTable: React.FC<IDatabaseTableProps> = ({ comp }) => {
  const noRowsColSpan = comp.columns.length;
  const hasTitle = (comp.tableName ?? "").trim().length > 0;

  return (
    <Box style={positionToStyle(comp.position)}>
      <Box
        sx={{
          width: "min(100%, 1180px)",
          px: { xs: 0.75, sm: 2, md: 3 },
          py: { xs: 0.5, sm: 1.5, md: 2 },
        }}
      >
        <TableContainer
          component={Paper}
          sx={(theme) => ({
            overflow: "auto",
            maxHeight: comp.maxHeight ?? "min(520px, 72vh)",
            borderRadius: 2.5,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          })}
        >
          {hasTitle && (
            <Box
              sx={(theme) => ({
                px: 2,
                py: 1.1,
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.text.disabled,
              })}
            >
              <Typography variant="code" fontWeight={700}>
                {comp.tableName}
              </Typography>
            </Box>
          )}

          <MuiTable
            size="small"
            stickyHeader
            sx={{
              width: "100%",
              tableLayout: "fixed",
            }}
          >
            <TableHead>
              <MuiTableRow>
                {comp.columns.map((column) => (
                  <MuiTableCell
                    key={column.key}
                    sx={(theme) => ({
                      py: { xs: 0.7, sm: 1.1 },
                      px: { xs: 1, sm: 2 },
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      backgroundColor: theme.palette.background.default,
                      whiteSpace: "normal",
                      overflowWrap: "anywhere",
                    })}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 700,
                        color: "text.secondary",
                        fontSize: { xs: "0.68rem", sm: "0.8rem", md: "0.875rem" },
                      }}
                    >
                      {column.label ?? column.key}
                    </Typography>
                  </MuiTableCell>
                ))}
              </MuiTableRow>
            </TableHead>

            <TableBody>
              {comp.rows.length === 0 && (
                <MuiTableRow>
                  <MuiTableCell colSpan={noRowsColSpan} sx={{ py: 2.5 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", textAlign: "center" }}
                    >
                      No rows returned.
                    </Typography>
                  </MuiTableCell>
                </MuiTableRow>
              )}

              {comp.rows.map((row, rowIndex) => (
                <MuiTableRow
                  key={rowIndex}
                  sx={(theme) => ({
                    "&:nth-of-type(2n)": {
                      backgroundColor: theme.palette.background.default,
                    },
                  })}
                >
                  {comp.columns.map((column) => {
                    const value = row[column.key] ?? null;
                    const isNull = value === null;

                    return (
                      <MuiTableCell
                        key={`${rowIndex}-${column.key}`}
                        sx={(theme) => ({
                          py: { xs: 0.65, sm: 0.95 },
                          px: { xs: 1, sm: 2 },
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          whiteSpace: "normal",
                          overflowWrap: "anywhere",
                        })}
                      >
                        <Typography
                          variant="code"
                          sx={{
                            color: isNull ? "text.secondary" : "text.primary",
                            fontStyle: isNull ? "italic" : "normal",
                            fontSize: { xs: "0.68rem", sm: "0.8rem", md: "0.875rem" },
                          }}
                        >
                          {formatValue(value)}
                        </Typography>
                      </MuiTableCell>
                    );
                  })}
                </MuiTableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DatabaseTable;
