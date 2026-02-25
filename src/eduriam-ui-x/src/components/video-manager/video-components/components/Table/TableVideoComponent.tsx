import React from "react";

import { Table as CoreTable } from "@eduriam/ui-core";
import Box from "@mui/material/Box";

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

export interface ITableVideoComponentProps {
  comp: ITable;
}

const buildColumnKey = (index: number): string => `col_${index}`;

const getColumnCount = (rows: TableRow[]): number =>
  rows.reduce((max, row) => Math.max(max, row.length), 0);

const createColumns = (
  header: TableRow,
  columnCount: number,
  withHeader: boolean,
) =>
  Array.from({ length: columnCount }, (_, index) => ({
    key: buildColumnKey(index),
    label: withHeader ? String(header[index] ?? "") : "",
  }));

const createRows = (rows: TableRow[], columnCount: number) =>
  rows.map((row) =>
    Object.fromEntries(
      Array.from({ length: columnCount }, (_, index) => [
        buildColumnKey(index),
        row[index] ?? "",
      ]),
    ),
  );

export const TableVideoComponent: React.FC<ITableVideoComponentProps> = ({
  comp,
}) => {
  const header = comp.highlightHeader ? (comp.rows[0] ?? []) : [];
  const body = comp.highlightHeader ? comp.rows.slice(1) : comp.rows;
  const columnCount = getColumnCount(comp.rows);

  if (columnCount === 0) {
    return null;
  }

  const columns = createColumns(header, columnCount, comp.highlightHeader);
  const rows = createRows(body, columnCount);

  return (
    <Box style={positionToStyle(comp.position)}>
      <Box
        sx={{
          width: "min(92%, 1100px)",
          px: 3,
          py: 2,
        }}
      >
        <CoreTable
          columns={columns}
          rows={rows}
          sx={
            comp.highlightHeader
              ? undefined
              : { "& > [role='row']:first-of-type": { display: "none" } }
          }
        />
      </Box>
    </Box>
  );
};

export default TableVideoComponent;
