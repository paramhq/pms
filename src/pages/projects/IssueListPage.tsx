import { useState, useMemo } from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
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
import type { Issue, IssueFilters } from "@/types/issue";
import { EMPTY_FILTERS } from "@/types/issue";
import type { ColumnDef } from "@/components/DataTable";

export default function IssueListPage() {
  const { key } = useParams();
  const toast = useToast();
  const { issues, isLoading, createIssue, updateIssue, deleteIssue } = useIssueState(MOCK_ISSUES, INITIAL_ISSUE_COUNTER);

  const [filters, setFilters] = useState<IssueFilters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortState>({ key: "updatedAt", direction: "desc" });
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const assigneeMap = useMemo(
    () => new Map(MOCK_ASSIGNEES.map((a) => [a.id, a])),
    [],
  );

  // Filter
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
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

  // Sort
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

  // Selected issue (derived)
  const selectedIssue = useMemo(
    () => (selectedIssueId ? issues.find((i) => i.id === selectedIssueId) ?? null : null),
    [issues, selectedIssueId],
  );

  const columns: ColumnDef<Issue>[] = useMemo(
    () => [
      {
        key: "type",
        header: "",
        width: 40,
        render: (row) => <IssueTypeIcon type={row.type} />,
      },
      {
        key: "key",
        header: "Key",
        width: 90,
        sortable: true,
        render: (row) => (
          <Typography sx={{ fontFamily: "monospace", fontSize: 12, color: "text.secondary", fontWeight: 500 }}>
            {row.key}
          </Typography>
        ),
      },
      {
        key: "title",
        header: "Title",
        sortable: true,
        render: (row) => (
          <Typography sx={{ fontSize: 13, fontWeight: 500, color: "text.primary" }} noWrap>
            {row.title}
          </Typography>
        ),
      },
      {
        key: "status",
        header: "Status",
        width: 140,
        sortable: true,
        render: (row) => <StatusBadge status={row.status} />,
      },
      {
        key: "priority",
        header: "",
        width: 40,
        sortable: true,
        render: (row) => <PriorityIcon priority={row.priority} />,
      },
      {
        key: "assigneeId",
        header: "Assignee",
        width: 150,
        sortable: true,
        render: (row) => (
          <AssigneeAvatar
            assignee={assigneeMap.get(row.assigneeId ?? "") ?? null}
            size={24}
            showName
          />
        ),
      },
      {
        key: "updatedAt",
        header: "Updated",
        width: 100,
        sortable: true,
        render: (row) => (
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            {formatRelativeTime(row.updatedAt)}
          </Typography>
        ),
      },
    ],
    [assigneeMap],
  );

  return (
    <>
      {/* Page header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
          <Typography variant="h1">{key} — Issues</Typography>
          <Typography sx={{ fontSize: 13, color: "text.disabled" }}>
            {filteredIssues.length} issue{filteredIssues.length !== 1 ? "s" : ""}
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddRoundedIcon />}
          onClick={() => setCreateDialogOpen(true)}
        >
          New Issue
        </Button>
      </Box>

      {/* Filters */}
      <FilterBar filters={filters} onFiltersChange={setFilters} assignees={MOCK_ASSIGNEES} />

      {/* Table */}
      <DataTable<Issue>
        columns={columns}
        data={sortedIssues}
        keyExtractor={(row) => row.id}
        loading={isLoading}
        sort={sort}
        onSortChange={setSort}
        onRowClick={(row) => setSelectedIssueId(row.id)}
        emptyState={
          <EmptyState
            icon={AssignmentRoundedIcon}
            title="No issues found"
            description={
              filters !== EMPTY_FILTERS
                ? "Try adjusting your filters."
                : "Create your first issue to start tracking work."
            }
            action={
              filters === EMPTY_FILTERS
                ? { label: "New Issue", onClick: () => setCreateDialogOpen(true) }
                : undefined
            }
          />
        }
      />

      {/* Detail panel */}
      <DetailPanel
        open={!!selectedIssue}
        onClose={() => setSelectedIssueId(null)}
        title={selectedIssue?.key ?? ""}
      >
        {selectedIssue && (
          <IssueDetailContent
            issue={selectedIssue}
            assignees={MOCK_ASSIGNEES}
            onUpdate={(id, updates) => updateIssue(id, updates)}
            onDelete={(id) => {
              deleteIssue(id);
              setSelectedIssueId(null);
              toast.success("Issue deleted");
            }}
          />
        )}
      </DetailPanel>

      {/* Create dialog */}
      <CreateIssueDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={(data) => {
          const issue = createIssue(data);
          toast.success(`${issue.key} created`);
        }}
        assignees={MOCK_ASSIGNEES}
      />
    </>
  );
}
