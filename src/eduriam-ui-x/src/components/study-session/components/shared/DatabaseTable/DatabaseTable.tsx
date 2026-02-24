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

export type DatabaseValue = string | number | boolean | null;

export interface DatabaseColumn {
  key: string;
  label?: string;
}

export type DatabaseRow = Record<string, DatabaseValue>;

export interface DatabaseTableProps {
  columns: DatabaseColumn[];
  rows: DatabaseRow[];
  tableName?: string;
  maxHeight?: number | string;
  variant?: "bordered" | "borderless";
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

export const DatabaseTable: React.FC<DatabaseTableProps> = ({
  columns,
  rows,
  tableName,
  maxHeight,
  variant = "bordered",
}) => {
  const noRowsColSpan = columns.length;
  const hasTitle = (tableName ?? "").trim().length > 0;
  const isBorderless = variant === "borderless";

  return (
    <Box
      sx={{
        width: "100%",
        px: isBorderless ? 0 : { xs: 0.75, sm: 2, md: 3 },
        py: isBorderless ? 0 : { xs: 0.5, sm: 1.5, md: 2 },
      }}
    >
      <TableContainer
        component={isBorderless ? "div" : Paper}
        sx={(theme) => ({
          overflow: "auto",
          ...(maxHeight !== undefined && { maxHeight }),
          borderRadius: isBorderless ? 0 : 2.5,
          border: isBorderless ? "none" : `1px solid ${theme.palette.divider}`,
          boxShadow: isBorderless ? "none" : undefined,
          backgroundColor: theme.palette.background.paper,
        })}
      >
        {hasTitle && (
          <Box
            sx={(theme) => ({
              px: 2,
              py: 1.1,
              borderBottom: isBorderless
                ? "none"
                : `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.text.disabled,
            })}
          >
            <Typography variant="code" fontWeight={700}>
              {tableName}
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
              {columns.map((column) => (
                <MuiTableCell
                  key={column.key}
                  sx={(theme) => ({
                    py: { xs: 0.7, sm: 1.1 },
                    px: { xs: 1, sm: 2 },
                    borderBottom: isBorderless
                      ? "none"
                      : `1px solid ${theme.palette.divider}`,
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
            {rows.length === 0 && (
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

            {rows.map((row, rowIndex) => (
              <MuiTableRow
                key={rowIndex}
                sx={(theme) => ({
                  "&:nth-of-type(2n)": {
                    backgroundColor: theme.palette.background.default,
                  },
                })}
              >
                {columns.map((column) => {
                  const value = row[column.key] ?? null;
                  const isNull = value === null;

                  return (
                    <MuiTableCell
                      key={`${rowIndex}-${column.key}`}
                      sx={(theme) => ({
                        py: { xs: 0.65, sm: 0.95 },
                        px: { xs: 1, sm: 2 },
                        borderBottom: isBorderless
                          ? "none"
                          : `1px solid ${theme.palette.divider}`,
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
  );
};

export default DatabaseTable;
