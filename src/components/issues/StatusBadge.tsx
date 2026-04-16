import { alpha } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import type { Status } from "@/types/issue";
import { STATUS_LABELS } from "@/types/issue";
import { statusColors } from "@/theme";

export function StatusBadge({ status, size = "small" }: { status: Status; size?: "small" | "medium" }) {
  const color = statusColors[status];
  return (
    <Chip
      size={size}
      icon={<Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color, ml: "4px !important" }} />}
      label={STATUS_LABELS[status]}
      sx={{
        bgcolor: alpha(color, 0.1),
        color,
        fontWeight: 600,
        fontSize: size === "small" ? 11 : 12,
        "& .MuiChip-icon": { mr: -0.25 },
      }}
    />
  );
}
