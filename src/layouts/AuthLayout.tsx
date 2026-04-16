import { Suspense } from "react";
import { Outlet } from "react-router";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { authPageTokens, palette } from "@/theme";

export function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: authPageTokens.bg,
        background: `
          radial-gradient(ellipse at 30% 20%, ${authPageTokens.gradientStart} 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(99,102,241,0.15) 0%, transparent 40%),
          ${authPageTokens.bg}
        `,
        // Subtle grid pattern
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        },
        position: "relative",
      }}
    >
      <Suspense
        fallback={<CircularProgress size={28} sx={{ color: palette.purple[400] }} />}
      >
        <Outlet />
      </Suspense>
    </Box>
  );
}
