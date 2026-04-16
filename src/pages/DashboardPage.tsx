import { useMemo } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import WavingHandRoundedIcon from "@mui/icons-material/WavingHandRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useCurrentUser } from "@/contexts/AuthContext";
import { MOCK_ISSUES } from "@/data/mockIssues";
import { IssueTypeIcon, PriorityIcon, StatusBadge } from "@/components/issues";
import { contentCardTokens, palette } from "@/theme";
import type { Issue, Status } from "@/types/issue";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function IssueRow({ issue, onClick }: { issue: Issue; onClick: () => void }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 2,
        py: 1.25,
        borderRadius: 2,
        cursor: "pointer",
        transition: "background-color 0.1s",
        "&:hover": { bgcolor: palette.purple[50] },
      }}
    >
      <IssueTypeIcon type={issue.type} size={16} />
      <Typography sx={{ fontFamily: "monospace", fontSize: 12, color: "text.disabled", width: 60, flexShrink: 0 }}>
        {issue.key}
      </Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 500, flex: 1 }} noWrap>
        {issue.title}
      </Typography>
      <PriorityIcon priority={issue.priority} size={14} />
      {issue.dueDate && (
        <Typography sx={{ fontSize: 11, color: new Date(issue.dueDate) < new Date() ? "error.main" : "text.disabled", fontWeight: 500 }}>
          {new Date(issue.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </Typography>
      )}
    </Box>
  );
}

export default function DashboardPage() {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const firstName = user.fullName.split(" ")[0];

  const myOpenIssues = useMemo(
    () => MOCK_ISSUES.filter((i) => i.assigneeId === user.id && i.status !== "done"),
    [user.id],
  );

  const completedThisWeek = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return MOCK_ISSUES.filter(
      (i) => i.assigneeId === user.id && i.status === "done" && new Date(i.updatedAt) >= weekAgo,
    ).length;
  }, [user.id]);

  const overdueIssues = useMemo(
    () => {
      const today = new Date().toISOString().split("T")[0];
      return myOpenIssues.filter((i) => i.dueDate && i.dueDate < today);
    },
    [myOpenIssues],
  );

  const grouped = useMemo(() => {
    const groups: { status: Status; issues: Issue[] }[] = [];
    for (const s of ["todo", "in_progress", "in_review"] as Status[]) {
      const issues = myOpenIssues.filter((i) => i.status === s);
      if (issues.length > 0) groups.push({ status: s, issues });
    }
    return groups;
  }, [myOpenIssues]);

  const stats = [
    { label: "Assigned to me", value: myOpenIssues.length, color: palette.purple[600] },
    { label: "Completed this week", value: completedThisWeek, color: "#10b981" },
    { label: "Overdue", value: overdueIssues.length, color: overdueIssues.length > 0 ? "#e11d48" : palette.purple[600] },
  ];

  return (
    <Paper
      sx={{
        borderRadius: `${contentCardTokens.borderRadius}px`,
        boxShadow: contentCardTokens.shadow,
        border: `1px solid ${contentCardTokens.border}`,
        p: 4,
      }}
    >
      {/* Greeting */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
        <WavingHandRoundedIcon sx={{ fontSize: 28, color: palette.purple[400] }} />
        <Typography variant="h1">{getGreeting()}, {firstName}</Typography>
      </Box>
      <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 3 }}>
        Here's what's happening across your projects today.
      </Typography>

      {/* Stats */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {stats.map((stat) => (
          <Paper
            key={stat.label}
            sx={{
              flex: 1,
              p: 2.5,
              borderRadius: 3,
              border: `1px solid ${stat.value > 0 && stat.label === "Overdue" ? "#fecdd3" : contentCardTokens.border}`,
              textAlign: "center",
              bgcolor: stat.value > 0 && stat.label === "Overdue" ? "#fff1f2" : "background.paper",
            }}
          >
            <Typography sx={{ fontSize: 28, fontWeight: 700, color: stat.color }}>
              {stat.value}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.5 }}>
              {stat.label}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Overdue alert */}
      {overdueIssues.length > 0 && (
        <Alert
          severity="error"
          icon={<WarningAmberRoundedIcon />}
          sx={{ mb: 3, borderRadius: 3 }}
        >
          <AlertTitle sx={{ fontWeight: 600 }}>
            {overdueIssues.length} overdue issue{overdueIssues.length > 1 ? "s" : ""}
          </AlertTitle>
          {overdueIssues.map((i) => (
            <Typography key={i.id} sx={{ fontSize: 13 }}>
              <strong>{i.key}</strong> — {i.title} (due {new Date(i.dueDate!).toLocaleDateString("en-US", { month: "short", day: "numeric" })})
            </Typography>
          ))}
        </Alert>
      )}

      {/* Grouped issues */}
      {grouped.length > 0 ? (
        grouped.map((group) => (
          <Box key={group.status} sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1, px: 2 }}>
              <StatusBadge status={group.status} size="small" />
              <Typography sx={{ fontSize: 12, color: "text.disabled", fontWeight: 600 }}>
                {group.issues.length}
              </Typography>
            </Box>
            {group.issues.map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                onClick={() => navigate("/projects/PMS/issues")}
              />
            ))}
          </Box>
        ))
      ) : (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography sx={{ fontSize: 14, color: "text.disabled" }}>
            No open issues assigned to you. You're all caught up!
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
