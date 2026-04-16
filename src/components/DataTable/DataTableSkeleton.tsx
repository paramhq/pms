import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import type { ColumnDef } from "./types";
import { palette } from "@/theme";

interface DataTableSkeletonProps<T> {
  columns: ColumnDef<T>[];
  rows: number;
  selectable?: boolean;
}

export function DataTableSkeleton<T>({
  columns,
  rows,
  selectable,
}: DataTableSkeletonProps<T>) {
  return (
    <Box component="tbody">
      {Array.from({ length: rows }, (_, i) => (
        <Box
          component="tr"
          key={i}
          sx={{
            "& td": {
              py: 1.5,
              px: 2,
              borderBottom: i === rows - 1 ? "none" : `1px solid ${palette.page.cardBorder}`,
            },
          }}
        >
          {selectable && (
            <Box component="td" sx={{ width: 44 }}>
              <Skeleton
                variant="rectangular"
                width={18}
                height={18}
                sx={{ borderRadius: 0.5 }}
                animation="wave"
              />
            </Box>
          )}
          {columns.map((col, j) => (
            <Box component="td" key={col.key}>
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  width: `${55 + ((i + j) % 4) * 10}%`,
                  maxWidth: 200,
                  fontSize: 13,
                }}
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
