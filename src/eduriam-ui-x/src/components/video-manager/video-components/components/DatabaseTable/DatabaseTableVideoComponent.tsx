import React from "react";

import Box from "@mui/material/Box";

import type {
  DatabaseColumn,
  DatabaseRow,
  DatabaseValue,
} from "../../../../study-session/components/shared/DatabaseTable/DatabaseTable";
import { DatabaseTable } from "../../../../study-session/components/shared/DatabaseTable/DatabaseTable";
import type { ComponentPosition } from "../../../types/shared";
import { positionToStyle } from "../../../utils/positionToStyle";
import type { BaseVideoComponent } from "../../VideoComponent";

export type { DatabaseColumn, DatabaseRow, DatabaseValue };

export interface IDatabaseTableVideoComponent extends BaseVideoComponent {
  type: "DATABASE_TABLE";
  position: ComponentPosition;
  columns: DatabaseColumn[];
  rows: DatabaseRow[];
  tableName?: string;
  maxHeight?: number | string;
}

export interface IDatabaseTableVideoComponentProps {
  comp: IDatabaseTableVideoComponent;
}

export const DatabaseTableVideoComponent: React.FC<
  IDatabaseTableVideoComponentProps
> = ({ comp }) => (
  <Box style={positionToStyle(comp.position)}>
    <Box sx={{ width: "min(100%, 1180px)" }}>
      <DatabaseTable
        columns={comp.columns}
        rows={comp.rows}
        tableName={comp.tableName}
        maxHeight={comp.maxHeight ?? "min(520px, 72vh)"}
      />
    </Box>
  </Box>
);

export default DatabaseTableVideoComponent;
