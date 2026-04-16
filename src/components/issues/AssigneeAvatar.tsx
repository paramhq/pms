import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import type { Assignee } from "@/types/issue";

export function AssigneeAvatar({
  assignee,
  size = 24,
  showName,
}: {
  assignee: Assignee | null;
  size?: number;
  showName?: boolean;
}) {
  if (!assignee) {
    return (
      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}>
        <Avatar sx={{ width: size, height: size, bgcolor: "action.hover", color: "text.disabled" }}>
          <PersonOutlineRoundedIcon sx={{ fontSize: size * 0.6 }} />
        </Avatar>
        {showName && (
          <Typography sx={{ fontSize: 13, color: "text.disabled" }}>Unassigned</Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}>
      <Avatar
        sx={{
          width: size,
          height: size,
          fontSize: size * 0.4,
          fontWeight: 700,
          bgcolor: assignee.avatarColor,
        }}
        title={assignee.fullName}
      >
        {assignee.initials}
      </Avatar>
      {showName && (
        <Typography sx={{ fontSize: 13, color: "text.primary" }}>
          {assignee.displayName}
        </Typography>
      )}
    </Box>
  );
}
