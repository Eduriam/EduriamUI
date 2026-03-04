import React from "react";

import Box from "@mui/material/Box";

import type {
  DatabaseColumn,
  DatabaseRow,
  DatabaseValue,
} from "../../../../study-session/components/shared/DatabaseTable/DatabaseTable";
import { DatabaseTable } from "../../../../study-session/components/shared/DatabaseTable/DatabaseTable";
import type { BaseVideoComponent } from "../../VideoComponent";

export type { DatabaseColumn, DatabaseRow, DatabaseValue };

export interface IDatabaseTableVideoComponent extends BaseVideoComponent {
  type: "DATABASE_TABLE";
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
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
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
