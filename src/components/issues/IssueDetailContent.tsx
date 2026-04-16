import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import type { Issue, Assignee, Status, Priority, IssueType } from "@/types/issue";
import { STATUSES, PRIORITIES, ISSUE_TYPES, STATUS_LABELS, TYPE_LABELS } from "@/types/issue";
import { IssueTypeIcon } from "./IssueTypeIcon";
import { PriorityIcon } from "./PriorityIcon";
import { AssigneeAvatar } from "./AssigneeAvatar";
import { formatRelativeTime } from "@/lib/utils/relativeTime";
import { palette, statusColors } from "@/theme";

interface IssueDetailContentProps {
  issue: Issue;
  assignees: Assignee[];
  onUpdate: (issueId: string, updates: Partial<Issue>) => void;
  onDelete: (issueId: string) => void;
}

function MetadataRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", py: 1, borderBottom: `1px solid ${palette.page.cardBorder}` }}>
      <Typography sx={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "text.disabled", width: 90, flexShrink: 0 }}>
        {label}
      </Typography>
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
}

export function IssueDetailContent({ issue, assignees, onUpdate, onDelete }: IssueDetailContentProps) {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <IssueTypeIcon type={issue.type} size={20} />
        <Typography sx={{ fontSize: 13, fontFamily: "monospace", color: "text.disabled" }}>
          {issue.key}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: "text.primary", mb: 3 }}>
        {issue.title}
      </Typography>

      {/* Two-column layout */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Left: Description + Activity */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "text.disabled", mb: 1 }}>
            Description
          </Typography>
          {issue.description ? (
            <Typography sx={{ fontSize: 14, color: "text.primary", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
              {issue.description}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: 14, color: "text.disabled", fontStyle: "italic" }}>
              No description provided.
            </Typography>
          )}

          <Box sx={{ mt: 4 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "text.disabled", mb: 1.5 }}>
              Activity
            </Typography>
            <Box sx={{ py: 3, textAlign: "center", bgcolor: palette.purple[50], borderRadius: 3 }}>
              <Typography sx={{ fontSize: 13, color: "text.disabled" }}>
                Comments & activity coming soon.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right: Metadata sidebar */}
        <Box sx={{ width: 220, flexShrink: 0 }}>
          <MetadataRow label="Status">
            <Select
              size="small"
              value={issue.status}
              onChange={(e) => onUpdate(issue.id, { status: e.target.value as Status })}
              sx={{ fontSize: 13, borderRadius: 2, "& .MuiSelect-select": { py: 0.5, px: 1 } }}
              fullWidth
            >
              {STATUSES.map((s) => (
                <MenuItem key={s} value={s} sx={{ fontSize: 13, gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: statusColors[s], display: "inline-block", mr: 1 }} />
                  {STATUS_LABELS[s]}
                </MenuItem>
              ))}
            </Select>
          </MetadataRow>

          <MetadataRow label="Priority">
            <Select
              size="small"
              value={issue.priority}
              onChange={(e) => onUpdate(issue.id, { priority: e.target.value as Priority })}
              sx={{ fontSize: 13, borderRadius: 2, "& .MuiSelect-select": { py: 0.5, px: 1 } }}
              fullWidth
            >
              {PRIORITIES.map((p) => (
                <MenuItem key={p} value={p} sx={{ fontSize: 13, gap: 1 }}>
                  <PriorityIcon priority={p} size={14} showLabel />
                </MenuItem>
              ))}
            </Select>
          </MetadataRow>

          <MetadataRow label="Type">
            <Select
              size="small"
              value={issue.type}
              onChange={(e) => onUpdate(issue.id, { type: e.target.value as IssueType })}
              sx={{ fontSize: 13, borderRadius: 2, "& .MuiSelect-select": { py: 0.5, px: 1 } }}
              fullWidth
            >
              {ISSUE_TYPES.map((t) => (
                <MenuItem key={t} value={t} sx={{ fontSize: 13, gap: 1 }}>
                  <IssueTypeIcon type={t} size={14} />
                  <span style={{ marginLeft: 6 }}>{TYPE_LABELS[t]}</span>
                </MenuItem>
              ))}
            </Select>
          </MetadataRow>

          <MetadataRow label="Assignee">
            <Select
              size="small"
              value={issue.assigneeId ?? ""}
              onChange={(e) => onUpdate(issue.id, { assigneeId: e.target.value || null })}
              sx={{ fontSize: 13, borderRadius: 2, "& .MuiSelect-select": { py: 0.5, px: 1 } }}
              fullWidth
              displayEmpty
            >
              <MenuItem value="" sx={{ fontSize: 13 }}>
                <AssigneeAvatar assignee={null} size={20} showName />
              </MenuItem>
              {assignees.map((a) => (
                <MenuItem key={a.id} value={a.id} sx={{ fontSize: 13 }}>
                  <AssigneeAvatar assignee={a} size={20} showName />
                </MenuItem>
              ))}
            </Select>
          </MetadataRow>

          <MetadataRow label="Points">
            <TextField
              size="small"
              type="number"
              value={issue.storyPoints ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                onUpdate(issue.id, { storyPoints: val ? Number(val) : null });
              }}
              sx={{ "& input": { fontSize: 13, py: 0.5, px: 1 } }}
              fullWidth
              placeholder="—"
            />
          </MetadataRow>

          <MetadataRow label="Labels">
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {issue.labels.length > 0 ? (
                issue.labels.map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    size="small"
                    sx={{ fontSize: 11, height: 22, bgcolor: palette.purple[50], color: palette.purple[700] }}
                  />
                ))
              ) : (
                <Typography sx={{ fontSize: 13, color: "text.disabled" }}>—</Typography>
              )}
            </Box>
          </MetadataRow>

          <MetadataRow label="Created">
            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
              {formatRelativeTime(issue.createdAt)}
            </Typography>
          </MetadataRow>

          <MetadataRow label="Updated">
            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
              {formatRelativeTime(issue.updatedAt)}
            </Typography>
          </MetadataRow>

          {/* Delete */}
          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteOutlineRoundedIcon />}
              onClick={() => onDelete(issue.id)}
              fullWidth
              sx={{ borderColor: "error.main", "&:hover": { bgcolor: "rgba(225,29,72,0.05)" } }}
            >
              Delete Issue
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
