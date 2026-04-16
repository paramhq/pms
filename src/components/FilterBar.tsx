import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface FilterChip {
  label: string;
  active: boolean;
}

export function FilterBar() {
  const [filters, setFilters] = useState<FilterChip[]>([
    { label: "Assignee", active: false },
    { label: "Type", active: false },
    { label: "Priority", active: true },
    { label: "Label", active: false },
    { label: "Epic", active: false },
  ]);

  const toggleFilter = (index: number) => {
    setFilters((prev) =>
      prev.map((f, i) => (i === index ? { ...f, active: !f.active } : f)),
    );
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 3, py: 1.5 }}>
      <FilterListIcon sx={{ fontSize: 16, color: "text.disabled", mr: 0.5 }} />
      {filters.map((f, i) => (
        <Chip
          key={f.label}
          label={f.label}
          size="small"
          deleteIcon={<KeyboardArrowDownIcon sx={{ fontSize: "16px !important" }} />}
          onDelete={() => {}} // keeps the delete icon visible as a dropdown arrow
          onClick={() => toggleFilter(i)}
          variant={f.active ? "filled" : "outlined"}
          sx={{
            fontWeight: 500,
            fontSize: 12,
            cursor: "pointer",
            ...(f.active
              ? {
                  bgcolor: "primary.light",
                  color: "primary.main",
                  border: "1px solid",
                  borderColor: "primary.200",
                  "& .MuiChip-deleteIcon": { color: "primary.main" },
                }
              : {
                  bgcolor: "background.paper",
                  borderColor: "divider",
                  color: "text.secondary",
                  "& .MuiChip-deleteIcon": { color: "text.disabled" },
                  "&:hover": { borderColor: "text.disabled", color: "text.primary" },
                }),
          }}
        />
      ))}
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5 }} />
      <Chip
        label="Group by: Status"
        size="small"
        variant="outlined"
        deleteIcon={<KeyboardArrowDownIcon sx={{ fontSize: "16px !important" }} />}
        onDelete={() => {}}
        sx={{
          fontWeight: 500,
          fontSize: 12,
          bgcolor: "background.paper",
          borderColor: "divider",
          color: "text.secondary",
          "& .MuiChip-deleteIcon": { color: "text.disabled" },
          "&:hover": { borderColor: "text.disabled" },
        }}
      />
    </Box>
  );
}
