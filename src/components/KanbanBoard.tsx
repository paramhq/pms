import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { columns } from "../data";
import { IssueCard } from "./IssueCard";

export function KanbanBoard() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        px: 3,
        pb: 3,
        pt: 1,
        flex: 1,
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      {columns.map((col) => (
        <Box
          key={col.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 272,
            width: 272,
            maxHeight: "100%",
          }}
        >
          {/* Column header */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 1, mb: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: col.dotColor,
                }}
              />
              <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: "text.secondary" }}>
                {col.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 20,
                  height: 20,
                  px: 0.75,
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 5,
                  bgcolor: "action.hover",
                  color: "text.disabled",
                }}
              >
                {col.issues.length}
              </Box>
            </Box>
            <IconButton size="small" sx={{ color: "text.disabled" }}>
              <AddIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {/* Cards */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.25,
              overflowY: "auto",
              flex: 1,
              pr: 0.5,
              pb: 1,
            }}
          >
            {col.issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
