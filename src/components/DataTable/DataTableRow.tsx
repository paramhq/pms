import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import type { ColumnDef } from "./types";
import { palette } from "@/theme";

interface DataTableRowProps<T> {
  row: T;
  columns: ColumnDef<T>[];
  index: number;
  selectable?: boolean;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onClick?: () => void;
  isLast: boolean;
}

export function DataTableRow<T>({
  row,
  columns,
  index,
  selectable,
  selected,
  onSelect,
  onClick,
  isLast,
}: DataTableRowProps<T>) {
  return (
    <Box
      component="tr"
      onClick={onClick}
      sx={{
        cursor: onClick ? "pointer" : "default",
        transition: "background-color 0.1s",
        bgcolor: selected ? palette.purple[50] : "transparent",
        "&:hover": { bgcolor: palette.purple[50] },
        "& td": {
          py: 1.25,
          px: 2,
          fontSize: 13,
          color: "text.primary",
          borderBottom: isLast ? "none" : `1px solid ${palette.page.cardBorder}`,
          verticalAlign: "middle",
        },
      }}
    >
      {selectable && (
        <Box component="td" sx={{ width: 44, textAlign: "center" }}>
          <Checkbox
            size="small"
            checked={selected}
            onChange={(_, checked) => onSelect(checked)}
            onClick={(e) => e.stopPropagation()}
            sx={{ p: 0, color: palette.purple[300], "&.Mui-checked": { color: palette.purple[600] } }}
          />
        </Box>
      )}
      {columns.map((col) => (
        <Box component="td" key={col.key} sx={{ textAlign: col.align ?? "left" }}>
          {col.render
            ? col.render(row, index)
            : String((row as Record<string, unknown>)[col.key] ?? "")}
        </Box>
      ))}
    </Box>
  );
}
