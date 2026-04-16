import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

export function SprintBar() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        px: 3,
        py: 1.75,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Typography variant="h1" sx={{ m: 0 }}>Sprint 14</Typography>

        <Chip
          icon={<CalendarTodayOutlinedIcon sx={{ fontSize: "14px !important" }} />}
          label="Apr 7 – Apr 21, 2026"
          size="small"
          sx={{
            bgcolor: "background.default",
            color: "text.secondary",
            fontWeight: 500,
            "& .MuiChip-icon": { color: "text.disabled" },
          }}
        />

        <Chip
          label="5 days left"
          size="small"
          sx={{
            bgcolor: "#fffbeb",
            color: "#b45309",
            border: "1px solid #fde68a",
            fontWeight: 600,
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
          <LinearProgress
            variant="determinate"
            value={58}
            sx={{
              width: 128,
              height: 6,
              borderRadius: 3,
              bgcolor: "action.hover",
              "& .MuiLinearProgress-bar": { borderRadius: 3 },
            }}
          />
          <Typography sx={{ fontSize: 11, fontWeight: 600, color: "text.secondary" }}>
            58%
          </Typography>
        </Box>
      </Box>

      <Button
        variant="outlined"
        size="small"
        sx={{
          height: 34,
          fontSize: 13,
          color: "text.secondary",
          borderColor: "divider",
          "&:hover": { borderColor: "text.disabled", color: "text.primary" },
        }}
      >
        Complete Sprint
      </Button>
    </Box>
  );
}
