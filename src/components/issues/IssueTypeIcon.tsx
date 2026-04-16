import Box from "@mui/material/Box";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import type { IssueType } from "@/types/issue";
import { issueTypeColors } from "@/theme";

const iconMap: Record<IssueType, React.ReactNode> = {
  story: <CheckBoxRoundedIcon />,
  bug: <BugReportRoundedIcon />,
  task: <TaskAltRoundedIcon />,
  subtask: <IndeterminateCheckBoxRoundedIcon />,
};

export function IssueTypeIcon({ type, size = 16 }: { type: IssueType; size?: number }) {
  return (
    <Box sx={{ display: "inline-flex", color: issueTypeColors[type], "& > svg": { fontSize: size } }}>
      {iconMap[type]}
    </Box>
  );
}
