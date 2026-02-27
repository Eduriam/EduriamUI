import React from "react";

import Box from "@mui/material/Box";

import { DatabaseTable } from "../../../../../../shared/DatabaseTable/DatabaseTable";

export interface CodeEditorTableProps {
  /**
   * Table data as a 2D string array.
   * The first row is treated as the header.
   */
  rows: string[][];
  dataTest?: string;
}

/**
 * Renders a predefined data table inside the code editor.
 *
 * The container is scrollable both horizontally and vertically to
 * accommodate tables with many columns or rows.
 */
export const CodeEditorTable: React.FC<CodeEditorTableProps> = ({
  rows,
  dataTest,
}) => {
  if (rows.length === 0) return null;

  const columns = rows[0].map((cell, index) => ({
    key: `col_${index}`,
    label: cell,
  }));
  const bodyRows = rows.slice(1);
  const mappedRows = bodyRows.map((row) =>
    Object.fromEntries(columns.map((column, index) => [column.key, row[index] ?? ""])),
  );

  return (
    <Box
      data-test={dataTest}
      sx={{
        flexGrow: 1,
        minHeight: 0,
      }}
    >
      <DatabaseTable
        columns={columns}
        rows={mappedRows}
        maxHeight="100%"
        variant="borderless"
      />
    </Box>
  );
};

export default CodeEditorTable;
