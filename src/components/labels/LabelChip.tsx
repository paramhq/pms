import { alpha } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import type { Label } from "@/types/label";

export function LabelChip({ label, size = "small" }: { label: Label; size?: "small" | "medium" }) {
  return (
    <Chip
      label={label.name}
      size={size}
      sx={{
        bgcolor: alpha(label.color, 0.1),
        color: label.color,
        fontWeight: 600,
        fontSize: 11,
        borderRadius: 1.5,
      }}
    />
  );
}
