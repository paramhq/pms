import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import type { Priority } from "@/types/issue";
import { PRIORITY_LABELS } from "@/types/issue";
import { priorityColors } from "@/theme";

const iconMap: Record<Priority, React.ReactNode> = {
  critical: <ErrorRoundedIcon />,
  high: <ArrowUpwardRoundedIcon />,
  medium: <DragHandleRoundedIcon />,
  low: <ArrowDownwardRoundedIcon />,
  none: <RemoveRoundedIcon />,
};

export function PriorityIcon({
  priority,
  size = 16,
  showLabel,
}: {
  priority: Priority;
  size?: number;
  showLabel?: boolean;
}) {
  const color = priorityColors[priority];
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, color }}>
      <Box sx={{ display: "flex", "& > svg": { fontSize: size } }}>{iconMap[priority]}</Box>
      {showLabel && (
        <Typography sx={{ fontSize: 13, fontWeight: 500, color }}>
          {PRIORITY_LABELS[priority]}
        </Typography>
      )}
    </Box>
  );
}
