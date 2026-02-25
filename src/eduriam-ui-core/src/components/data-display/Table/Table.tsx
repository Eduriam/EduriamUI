import React from "react";

import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type TableCellValue = React.ReactNode;

export interface TableColumn {
  key: string;
  label?: string;
}

export type TableRow = Record<string, TableCellValue>;

export interface TableProps extends Omit<BoxProps, "children"> {
  columns: TableColumn[];
  rows: TableRow[];
  rowKey?: (row: TableRow, rowIndex: number) => React.Key;
}

const renderCellContent = (
  value: TableCellValue,
  textVariant: "body1" | "body2",
  fontWeight: number,
  color: "text.primary" | "text.secondary",
) => {
  if (React.isValidElement(value)) {
    return value;
  }

  return (
    <Typography
      color={color}
      fontWeight={fontWeight}
      sx={{ whiteSpace: "normal", overflowWrap: "anywhere" }}
      variant={textVariant}
    >
      {value === null || value === undefined ? "" : String(value)}
    </Typography>
  );
};

/**
 * Table component matching the Eduriam design system row/header styling.
 *
 * Uses equally distributed flexible columns that grow rows when content wraps.
 */
export const Table: React.FC<TableProps> = ({
  columns,
  rows,
  rowKey,
  sx,
  ...rest
}) => {
  return (
    <Box
      role="table"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        ...sx,
      }}
      {...rest}
    >
      <Box
        role="row"
        sx={(theme) => ({
          display: "flex",
          gap: 1,
          alignItems: "stretch",
          px: "9px",
          py: "5px",
          minHeight: 32,
          backgroundColor: theme.palette.background.default,
          borderBottom: `2px solid ${theme.palette.divider}`,
        })}
      >
        {columns.map((column) => (
          <Box
            key={column.key}
            role="columnheader"
            sx={{
              display: "flex",
              alignItems: "center",
              flex: "1 1 0",
              minWidth: 0,
            }}
          >
            {renderCellContent(
              column.label ?? column.key,
              "body2",
              700,
              "text.secondary",
            )}
          </Box>
        ))}
      </Box>

      {rows.map((row, rowIndex) => {
        const isLastRow = rowIndex === rows.length - 1;

        return (
          <Box
            key={rowKey?.(row, rowIndex) ?? rowIndex}
            role="row"
            sx={(theme) => ({
              display: "flex",
              gap: 1,
              alignItems: "stretch",
              px: "9px",
              py: "5px",
              minHeight: 32,
              backgroundColor: theme.palette.background.default,
              borderBottom: isLastRow
                ? "none"
                : `1px solid ${theme.palette.divider}`,
              borderBottomLeftRadius: isLastRow ? 1 : 0,
              borderBottomRightRadius: isLastRow ? 1 : 0,
            })}
          >
            {columns.map((column) => (
              <Box
                key={column.key}
                role="cell"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: "1 1 0",
                  minWidth: 0,
                }}
              >
                {renderCellContent(
                  row[column.key],
                  "body1",
                  400,
                  "text.primary",
                )}
              </Box>
            ))}
          </Box>
        );
      })}
    </Box>
  );
};

export default Table;
