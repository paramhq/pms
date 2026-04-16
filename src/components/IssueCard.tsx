import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import BugReportIcon from "@mui/icons-material/BugReport";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RemoveIcon from "@mui/icons-material/Remove";
import WarningIcon from "@mui/icons-material/Warning";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { Issue } from "../data";
import { issueType, priority as priorityColors } from "../theme";

const typeIconMap: Record<string, React.ReactNode> = {
  story: <CheckBoxOutlinedIcon sx={{ fontSize: 14, color: issueType.story }} />,
  bug: <BugReportIcon sx={{ fontSize: 14, color: issueType.bug }} />,
  task: <TaskAltIcon sx={{ fontSize: 14, color: issueType.task }} />,
  subtask: <RemoveIcon sx={{ fontSize: 14, bgcolor: issueType.subtask, borderRadius: 0.5, color: "#fff" }} />,
};

const priorityIconMap: Record<string, React.ReactNode> = {
  critical: <WarningIcon sx={{ fontSize: 14, color: priorityColors.critical }} />,
  high: <ArrowUpwardIcon sx={{ fontSize: 14, color: priorityColors.high }} />,
  medium: <DragHandleIcon sx={{ fontSize: 14, color: priorityColors.medium }} />,
  low: <ArrowDownwardIcon sx={{ fontSize: 14, color: priorityColors.low }} />,
};

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.75,
        border: 1,
        borderColor: "grey.100",
        borderRadius: 2,
        cursor: "pointer",
        transition: "all 0.15s",
        "&:hover": {
          boxShadow: 2,
          borderColor: "primary.200",
          "& .more-btn": { opacity: 1 },
        },
      }}
    >
      {/* Top row */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          {typeIconMap[issue.type]}
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: "text.disabled" }}>
            {issue.id}
          </Typography>
        </Box>
        <IconButton
          size="small"
          className="more-btn"
          sx={{ opacity: 0, transition: "opacity 0.15s", p: 0.25 }}
        >
          <MoreHorizIcon sx={{ fontSize: 16, color: "text.disabled" }} />
        </IconButton>
      </Box>

      {/* Title */}
      <Typography sx={{ fontSize: 13, fontWeight: 500, color: "text.primary", lineHeight: 1.45, mb: 1.5 }}>
        {issue.title}
      </Typography>

      {/* Labels */}
      {issue.labels && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
          {issue.labels.map((label) => (
            <Chip
              key={label}
              label={label.toUpperCase()}
              size="small"
              sx={{
                height: 20,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.04em",
                bgcolor: "primary.light",
                color: "primary.dark",
              }}
            />
          ))}
        </Box>
      )}

      {/* Bottom row */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {priorityIconMap[issue.priority]}
          {issue.storyPoints != null && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 1,
                bgcolor: "action.hover",
                color: "text.secondary",
              }}
            >
              {issue.storyPoints}
            </Box>
          )}
          {issue.commentCount != null && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.25, color: "text.disabled" }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: 13 }} />
              <Typography sx={{ fontSize: 11 }}>{issue.commentCount}</Typography>
            </Box>
          )}
          {issue.attachmentCount != null && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.25, color: "text.disabled" }}>
              <AttachFileIcon sx={{ fontSize: 13, transform: "rotate(45deg)" }} />
              <Typography sx={{ fontSize: 11 }}>{issue.attachmentCount}</Typography>
            </Box>
          )}
        </Box>
        <Avatar
          sx={{
            width: 24,
            height: 24,
            fontSize: 10,
            fontWeight: 700,
            bgcolor: issue.assignee.color,
          }}
          title={issue.assignee.name}
        >
          {issue.assignee.initials}
        </Avatar>
      </Box>
    </Paper>
  );
}
