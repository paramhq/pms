import { useState, useCallback, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import type { IssueFilters, Assignee, Status, Priority, IssueType } from "@/types/issue";
import { STATUSES, PRIORITIES, ISSUE_TYPES, TYPE_LABELS, EMPTY_FILTERS } from "@/types/issue";
import { StatusBadge } from "./StatusBadge";
import { PriorityIcon } from "./PriorityIcon";
import { IssueTypeIcon } from "./IssueTypeIcon";
import { AssigneeAvatar } from "./AssigneeAvatar";
import { palette } from "@/theme";

interface FilterBarProps {
  filters: IssueFilters;
  onFiltersChange: (filters: IssueFilters) => void;
  assignees: Assignee[];
}

function FilterChipDropdown<T extends string>({
  label,
  values,
  selected,
  onChange,
  renderItem,
}: {
  label: string;
  values: readonly T[];
  selected: T[];
  onChange: (selected: T[]) => void;
  renderItem: (value: T) => ReactNode;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const toggle = useCallback(
    (val: T) => {
      onChange(
        selected.includes(val)
          ? selected.filter((v) => v !== val)
          : [...selected, val],
      );
    },
    [selected, onChange],
  );

  const isActive = selected.length > 0;

  return (
    <>
      <Chip
        label={isActive ? `${label} (${selected.length})` : label}
        size="small"
        deleteIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: "16px !important" }} />}
        onDelete={() => setAnchorEl(null)} // keeps icon visible
        onClick={(e) => setAnchorEl(e.currentTarget)}
        variant={isActive ? "filled" : "outlined"}
        sx={{
          cursor: "pointer",
          fontWeight: 500,
          fontSize: 12,
          ...(isActive
            ? {
                bgcolor: palette.purple[50],
                color: palette.purple[700],
                border: `1px solid ${palette.purple[200]}`,
                "& .MuiChip-deleteIcon": { color: palette.purple[500] },
              }
            : {
                borderColor: "divider",
                color: "text.secondary",
                "&:hover": { borderColor: palette.purple[300] },
              }),
        }}
      />
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: { mt: 0.5, borderRadius: 3, minWidth: 200, maxHeight: 300 },
          },
        }}
      >
        <List dense disablePadding sx={{ py: 0.5 }}>
          {values.map((val) => (
            <ListItemButton key={val} onClick={() => toggle(val)} sx={{ borderRadius: 1, mx: 0.5, px: 1 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Checkbox
                  size="small"
                  checked={selected.includes(val)}
                  sx={{ p: 0, color: palette.purple[300], "&.Mui-checked": { color: palette.purple[600] } }}
                />
              </ListItemIcon>
              <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13 } }}>
                {renderItem(val)}
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
}

export function FilterBar({ filters, onFiltersChange, assignees }: FilterBarProps) {
  const hasFilters =
    filters.status.length > 0 ||
    filters.priority.length > 0 ||
    filters.type.length > 0 ||
    filters.assigneeId.length > 0;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
      <FilterListRoundedIcon sx={{ fontSize: 16, color: "text.disabled", mr: 0.25 }} />

      <FilterChipDropdown<Status>
        label="Status"
        values={STATUSES}
        selected={filters.status}
        onChange={(status) => onFiltersChange({ ...filters, status })}
        renderItem={(s) => <StatusBadge status={s} size="small" />}
      />

      <FilterChipDropdown<Priority>
        label="Priority"
        values={PRIORITIES}
        selected={filters.priority}
        onChange={(priority) => onFiltersChange({ ...filters, priority })}
        renderItem={(p) => <PriorityIcon priority={p} size={14} showLabel />}
      />

      <FilterChipDropdown<IssueType>
        label="Type"
        values={ISSUE_TYPES}
        selected={filters.type}
        onChange={(type) => onFiltersChange({ ...filters, type })}
        renderItem={(t) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IssueTypeIcon type={t} size={14} />
            {TYPE_LABELS[t]}
          </Box>
        )}
      />

      <FilterChipDropdown<string>
        label="Assignee"
        values={["__unassigned__", ...assignees.map((a) => a.id)]}
        selected={filters.assigneeId}
        onChange={(assigneeId) => onFiltersChange({ ...filters, assigneeId })}
        renderItem={(id) =>
          id === "__unassigned__" ? (
            <AssigneeAvatar assignee={null} size={20} showName />
          ) : (
            <AssigneeAvatar
              assignee={assignees.find((a) => a.id === id) ?? null}
              size={20}
              showName
            />
          )
        }
      />

      {hasFilters && (
        <Chip
          label="Clear all"
          size="small"
          deleteIcon={<CloseRoundedIcon sx={{ fontSize: "14px !important" }} />}
          onDelete={() => onFiltersChange(EMPTY_FILTERS)}
          onClick={() => onFiltersChange(EMPTY_FILTERS)}
          sx={{
            ml: 0.5,
            color: "text.secondary",
            borderColor: "divider",
            fontSize: 12,
            fontWeight: 500,
            "& .MuiChip-deleteIcon": { color: "text.disabled" },
          }}
          variant="outlined"
        />
      )}
    </Box>
  );
}
