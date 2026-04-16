import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import WavingHandRoundedIcon from "@mui/icons-material/WavingHandRounded";
import { contentCardTokens, palette } from "@/theme";

export default function DashboardPage() {
  return (
    <Paper
      sx={{
        borderRadius: `${contentCardTokens.borderRadius}px`,
        boxShadow: contentCardTokens.shadow,
        border: `1px solid ${contentCardTokens.border}`,
        p: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <WavingHandRoundedIcon sx={{ fontSize: 28, color: palette.purple[400] }} />
        <Typography variant="h1">Good afternoon, Sukhdev</Typography>
      </Box>
      <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 3 }}>
        Here's what's happening across your projects today.
      </Typography>

      {/* Stats row placeholder */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {[
          { label: "Assigned to me", value: "—" },
          { label: "Completed this week", value: "—" },
          { label: "Overdue", value: "—" },
        ].map((stat) => (
          <Paper
            key={stat.label}
            sx={{
              flex: 1,
              p: 2.5,
              borderRadius: 3,
              border: `1px solid ${contentCardTokens.border}`,
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: 700, color: "text.primary" }}>
              {stat.value}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.5 }}>
              {stat.label}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Typography sx={{ fontSize: 13, color: "text.disabled", textAlign: "center", py: 6 }}>
        Dashboard widgets coming soon — issues, activity, and project insights.
      </Typography>
    </Paper>
  );
}
