import { useState, useMemo } from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { DataTable, type SortState } from "@/components/DataTable";
import { DetailPanel } from "@/components/DetailPanel";
import { EmptyState } from "@/components/EmptyState";
import { FilterBar } from "@/components/issues/FilterBar";
import { CreateIssueDialog } from "@/components/issues/CreateIssueDialog";
import { IssueDetailContent } from "@/components/issues/IssueDetailContent";
import { StatusBadge, PriorityIcon, IssueTypeIcon, AssigneeAvatar } from "@/components/issues";
import { useIssueState } from "@/hooks/useIssueState";
import { useToast } from "@/contexts/ToastContext";
import { MOCK_ISSUES, MOCK_ASSIGNEES, INITIAL_ISSUE_COUNTER } from "@/data/mockIssues";
import { formatRelativeTime } from "@/lib/utils/relativeTime";
import type { Issue, IssueFilters, Priority } from "@/types/issue";
import { EMPTY_FILTERS, PRIORITIES } from "@/types/issue";
import type { ColumnDef } from "@/components/DataTable";
import { palette } from "@/theme";

export default function BacklogPage() {
  const { key } = useParams();
  const toast = useToast();
  const { issues, isLoading, createIssue, updateIssue, deleteIssue } = useIssueState(MOCK_ISSUES, INITIAL_ISSUE_COUNTER);

  const [filters, setFilters] = useState<IssueFilters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortState>({ key: "updatedAt", direction: "desc" });
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<Priority>>(new Set());

  const assigneeMap = useMemo(() => new Map(MOCK_ASSIGNEES.map((a) => [a.id, a])), []);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (issue.status === "done") return false;
      if (filters.status.length > 0 && !filters.status.includes(issue.status)) return false;
      if (filters.priority.length > 0 && !filters.priority.includes(issue.priority)) return false;
      if (filters.type.length > 0 && !filters.type.includes(issue.type)) return false;
      if (filters.assigneeId.length > 0) {
        const id = issue.assigneeId ?? "__unassigned__";
        if (!filters.assigneeId.includes(id)) return false;
      }
      if (filters.searchText) {
        const q = filters.searchText.toLowerCase();
        if (!issue.title.toLowerCase().includes(q) && !issue.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [issues, filters]);

  const sortedIssues = useMemo(() => {
    if (!sort.direction) return filteredIssues;
    const sorted = [...filteredIssues].sort((a, b) => {
      const aVal = a[sort.key as keyof Issue];
      const bVal = b[sort.key as keyof Issue];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (typeof aVal === "number" && typeof bVal === "number") return aVal - bVal;
      return String(aVal).localeCompare(String(bVal));
    });
    return sort.direction === "desc" ? sorted.reverse() : sorted;
  }, [filteredIssues, sort]);

  const grouped = useMemo(() => {
    return PRIORITIES.map((p) => ({
      priority: p,
      issues: sortedIssues.filter((i) => i.priority === p),
    })).filter((g) => g.issues.length > 0);
  }, [sortedIssues]);

  const selectedIssue = useMemo(
    () => (selectedIssueId ? issues.find((i) => i.id === selectedIssueId) ?? null : null),
    [issues, selectedIssueId],
  );

  const toggleGroup = (p: Priority) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  };

  const columns: ColumnDef<Issue>[] = useMemo(
    () => [
      { key: "type", header: "", width: 40, render: (row) => <IssueTypeIcon type={row.type} /> },
      { key: "key", header: "Key", width: 90, sortable: true, render: (row) => <Typography sx={{ fontFamily: "monospace", fontSize: 12, color: "text.secondary", fontWeight: 500 }}>{row.key}</Typography> },
      { key: "title", header: "Title", sortable: true, render: (row) => <Typography sx={{ fontSize: 13, fontWeight: 500 }} noWrap>{row.title}</Typography> },
      { key: "status", header: "Status", width: 140, sortable: true, render: (row) => <StatusBadge status={row.status} /> },
      { key: "assigneeId", header: "Assignee", width: 150, sortable: true, render: (row) => <AssigneeAvatar assignee={assigneeMap.get(row.assigneeId ?? "") ?? null} size={24} showName /> },
      { key: "updatedAt", header: "Updated", width: 100, sortable: true, render: (row) => <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{formatRelativeTime(row.updatedAt)}</Typography> },
    ],
    [assigneeMap],
  );

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
          <Typography variant="h1">{key} — Backlog</Typography>
          <Typography sx={{ fontSize: 13, color: "text.disabled" }}>
            {filteredIssues.length} issue{filteredIssues.length !== 1 ? "s" : ""}
          </Typography>
        </Box>
        <Button variant="contained" size="small" startIcon={<AddRoundedIcon />} onClick={() => setCreateDialogOpen(true)}>
          New Issue
        </Button>
      </Box>

      <FilterBar filters={filters} onFiltersChange={setFilters} assignees={MOCK_ASSIGNEES} />

      {isLoading ? (
        <DataTable<Issue> columns={columns} data={[]} keyExtractor={(r) => r.id} loading sort={sort} onSortChange={setSort} />
      ) : filteredIssues.length === 0 ? (
        <EmptyState
          icon={AssignmentRoundedIcon}
          title="Backlog is empty"
          description="All issues are either done or filtered out."
        />
      ) : (
        grouped.map((group) => (
          <Box key={group.priority} sx={{ mb: 2 }}>
            <Box
              onClick={() => toggleGroup(group.priority)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1,
                py: 1,
                cursor: "pointer",
                borderRadius: 2,
                "&:hover": { bgcolor: palette.purple[50] },
              }}
            >
              <IconButton size="small" sx={{ p: 0.25 }}>
                {collapsedGroups.has(group.priority) ? <ExpandMoreRoundedIcon sx={{ fontSize: 18 }} /> : <ExpandLessRoundedIcon sx={{ fontSize: 18 }} />}
              </IconButton>
              <PriorityIcon priority={group.priority} size={16} showLabel />
              <Typography sx={{ fontSize: 12, color: "text.disabled", fontWeight: 600 }}>
                {group.issues.length}
              </Typography>
            </Box>
            {!collapsedGroups.has(group.priority) && (
              <DataTable<Issue>
                columns={columns}
                data={group.issues}
                keyExtractor={(r) => r.id}
                sort={sort}
                onSortChange={setSort}
                onRowClick={(row) => setSelectedIssueId(row.id)}
              />
            )}
          </Box>
        ))
      )}

      <DetailPanel open={!!selectedIssue} onClose={() => setSelectedIssueId(null)} title={selectedIssue?.key ?? ""}>
        {selectedIssue && (
          <IssueDetailContent
            issue={selectedIssue}
            assignees={MOCK_ASSIGNEES}
            onUpdate={(id, updates) => updateIssue(id, updates)}
            onDelete={(id) => { deleteIssue(id); setSelectedIssueId(null); toast.success("Issue deleted"); }}
          />
        )}
      </DetailPanel>

      <CreateIssueDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={(data) => { const issue = createIssue(data); toast.success(`${issue.key} created`); }}
        assignees={MOCK_ASSIGNEES}
      />
    </>
  );
}
