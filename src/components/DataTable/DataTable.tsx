import { useCallback, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import { EmptyState } from "@/components/EmptyState";
import { contentCardTokens } from "@/theme";
import { DataTableHead } from "./DataTableHead";
import { DataTableRow } from "./DataTableRow";
import { DataTableSkeleton } from "./DataTableSkeleton";
import type { DataTableProps } from "./types";

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  loading,
  skeletonRows = 5,
  emptyState,
  sort,
  onSortChange,
  selectable,
  selectedKeys,
  onSelectionChange,
  onRowClick,
  stickyHeader = true,
}: DataTableProps<T>) {
  const allKeys = data.map(keyExtractor);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedKeys?.has(k));
  const someSelected = allKeys.some((k) => selectedKeys?.has(k));

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (!onSelectionChange) return;
      onSelectionChange(checked ? new Set(allKeys) : new Set());
    },
    [allKeys, onSelectionChange],
  );

  const handleSelectRow = useCallback(
    (key: string, checked: boolean) => {
      if (!onSelectionChange || !selectedKeys) return;
      const next = new Set(selectedKeys);
      if (checked) next.add(key);
      else next.delete(key);
      onSelectionChange(next);
    },
    [selectedKeys, onSelectionChange],
  );

  const defaultEmptyState: ReactNode = (
    <EmptyState
      icon={TableChartRoundedIcon}
      title="No data"
      description="There's nothing here yet."
      compact
    />
  );

  return (
    <Paper
      sx={{
        borderRadius: `${contentCardTokens.borderRadius}px`,
        boxShadow: contentCardTokens.shadow,
        border: `1px solid ${contentCardTokens.border}`,
        overflow: "hidden",
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
          }}
        >
          <DataTableHead
            columns={columns}
            sort={sort}
            onSortChange={onSortChange}
            selectable={selectable}
            allSelected={allSelected}
            someSelected={someSelected}
            onSelectAll={handleSelectAll}
            sticky={stickyHeader}
          />

          {loading ? (
            <DataTableSkeleton columns={columns} rows={skeletonRows} selectable={selectable} />
          ) : data.length === 0 ? (
            <Box component="tbody">
              <tr>
                <Box
                  component="td"
                  colSpan={columns.length + (selectable ? 1 : 0)}
                >
                  {emptyState ?? defaultEmptyState}
                </Box>
              </tr>
            </Box>
          ) : (
            <Box component="tbody">
              {data.map((row, i) => {
                const key = keyExtractor(row);
                return (
                  <DataTableRow
                    key={key}
                    row={row}
                    columns={columns}
                    index={i}
                    selectable={selectable}
                    selected={selectedKeys?.has(key) ?? false}
                    onSelect={(checked) => handleSelectRow(key, checked)}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    isLast={i === data.length - 1}
                  />
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
