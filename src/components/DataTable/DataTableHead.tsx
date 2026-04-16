import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import type { ColumnDef, SortState } from "./types";
import { palette } from "@/theme";

interface DataTableHeadProps<T> {
  columns: ColumnDef<T>[];
  sort?: SortState;
  onSortChange?: (sort: SortState) => void;
  selectable?: boolean;
  allSelected: boolean;
  someSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  sticky?: boolean;
}

export function DataTableHead<T>({
  columns,
  sort,
  onSortChange,
  selectable,
  allSelected,
  someSelected,
  onSelectAll,
  sticky = true,
}: DataTableHeadProps<T>) {
  const handleSort = (key: string) => {
    if (!onSortChange) return;
    let direction: "asc" | "desc" | null = "asc";
    if (sort?.key === key) {
      if (sort.direction === "asc") direction = "desc";
      else if (sort.direction === "desc") direction = null;
    }
    onSortChange({ key, direction });
  };

  return (
    <Box
      component="thead"
      sx={{
        "& th": {
          bgcolor: palette.purple[50],
          borderBottom: `2px solid ${palette.page.cardBorder}`,
          py: 1.25,
          px: 2,
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "text.secondary",
          textAlign: "left",
          whiteSpace: "nowrap",
          ...(sticky && {
            position: "sticky",
            top: 0,
            zIndex: 2,
          }),
        },
      }}
    >
      <tr>
        {selectable && (
          <Box
            component="th"
            sx={{ width: 44, textAlign: "center !important" }}
          >
            <Checkbox
              size="small"
              checked={allSelected}
              indeterminate={someSelected && !allSelected}
              onChange={(_, checked) => onSelectAll(checked)}
              sx={{ p: 0, color: palette.purple[300], "&.Mui-checked": { color: palette.purple[600] } }}
            />
          </Box>
        )}
        {columns.map((col) => (
          <Box
            component="th"
            key={col.key}
            sx={{
              width: col.width,
              textAlign: col.align ?? "left",
              cursor: col.sortable ? "pointer" : "default",
              userSelect: col.sortable ? "none" : "auto",
              "&:hover": col.sortable ? { color: "text.primary" } : undefined,
            }}
            onClick={col.sortable ? () => handleSort(col.key) : undefined}
          >
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
              {col.header}
              {col.sortable && (
                sort?.key === col.key && sort.direction === "asc" ? (
                  <ArrowUpwardRoundedIcon sx={{ fontSize: 14, color: palette.purple[500] }} />
                ) : sort?.key === col.key && sort.direction === "desc" ? (
                  <ArrowDownwardRoundedIcon sx={{ fontSize: 14, color: palette.purple[500] }} />
                ) : (
                  <UnfoldMoreRoundedIcon sx={{ fontSize: 14, opacity: 0.4 }} />
                )
              )}
            </Box>
          </Box>
        ))}
      </tr>
    </Box>
  );
}
