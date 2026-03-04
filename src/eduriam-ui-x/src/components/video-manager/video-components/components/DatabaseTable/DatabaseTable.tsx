import React from "react";

import Box from "@mui/material/Box";

import type {
  DatabaseColumn,
  DatabaseRow,
  DatabaseValue,
} from "../../../../study-session/components/shared/DatabaseTable/DatabaseTable";
import { DatabaseTable as SharedDatabaseTable } from "../../../../study-session/components/shared/DatabaseTable/DatabaseTable";
import type { BaseVideoComponent } from "../../VideoComponent";

export type { DatabaseColumn, DatabaseRow, DatabaseValue };

export interface IDatabaseTable extends BaseVideoComponent {
  type: "DATABASE_TABLE";
  columns: DatabaseColumn[];
  rows: DatabaseRow[];
  tableName?: string;
  maxHeight?: number | string;
}

export interface IDatabaseTableProps {
  comp: IDatabaseTable;
}

export const DatabaseTable: React.FC<IDatabaseTableProps> = ({ comp }) => (
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
      <SharedDatabaseTable
        columns={comp.columns}
        rows={comp.rows}
        tableName={comp.tableName}
        maxHeight={comp.maxHeight ?? "min(520px, 72vh)"}
      />
    </Box>
  </Box>
);

export default DatabaseTable;
