import React from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export interface CodeEditorTableProps {
  /**
   * Table data as a 2D string array.
   * The first row is treated as the header.
   */
  rows: string[][];
}

/**
 * Renders a predefined data table inside the code editor.
 *
 * The container is scrollable both horizontally and vertically to
 * accommodate tables with many columns or rows.
 */
export const CodeEditorTable: React.FC<CodeEditorTableProps> = ({ rows }) => {
  if (rows.length === 0) return null;

  const headerRow = rows[0];
  const bodyRows = rows.slice(1);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
      }}
    >
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {headerRow.map((cell, idx) => (
              <TableCell
                key={idx}
                sx={{
                  backgroundColor: "background.default",
                  borderBottom: 1,
                  borderColor: "divider",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography variant="subtitle2">{cell}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyRows.map((row, rowIdx) => (
            <TableRow key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <TableCell
                  key={cellIdx}
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Typography variant="body1">{cell}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CodeEditorTable;
