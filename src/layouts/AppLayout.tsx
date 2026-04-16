import { Suspense } from "react";
import { Outlet } from "react-router";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { palette } from "@/theme";

export function AppLayout() {
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
          height: "100%",
          bgcolor: palette.page.bg,
          // Subtle warm gradient on the content area
          backgroundImage: `radial-gradient(ellipse at top left, rgba(168,85,247,0.06) 0%, transparent 60%)`,
        }}
      >
        <Header />
        <Box sx={{ flex: 1, overflow: "auto", px: 3, pb: 3 }}>
          <Suspense
            fallback={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 300,
                }}
              >
                <CircularProgress size={28} sx={{ color: palette.purple[400] }} />
              </Box>
            }
          >
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}
