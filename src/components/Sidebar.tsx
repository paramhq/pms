import { NavLink } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LayersIcon from "@mui/icons-material/Layers";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { sidebar } from "../theme";
import { navItems, projects } from "../data";

const iconMap: Record<string, React.ReactNode> = {
  home: <HomeOutlinedIcon sx={{ fontSize: 18 }} />,
  folder: <FolderOutlinedIcon sx={{ fontSize: 18 }} />,
  board: <ViewColumnOutlinedIcon sx={{ fontSize: 18 }} />,
  list: <ListOutlinedIcon sx={{ fontSize: 18 }} />,
  sprint: <FastForwardOutlinedIcon sx={{ fontSize: 18 }} />,
  chart: <BarChartOutlinedIcon sx={{ fontSize: 18 }} />,
  settings: <SettingsOutlinedIcon sx={{ fontSize: 18 }} />,
};

export function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: sidebar.width,
        minWidth: sidebar.width,
        bgcolor: sidebar.bg,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRight: `1px solid ${sidebar.border}`,
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 2.5, pt: 2.5, pb: 2.5 }}>
        <Avatar sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: "primary.main" }}>
          <LayersIcon sx={{ fontSize: 20 }} />
        </Avatar>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
          ProjectHub
        </Typography>
      </Box>

      <Box sx={{ height: "1px", bgcolor: sidebar.border, mx: 1.5 }} />

      {/* Main nav */}
      <Box component="nav" sx={{ display: "flex", flexDirection: "column", gap: 0.25, px: 1.5, py: 2 }}>
        {navItems.map((item) => {
          const to = item.label === "Board" ? "/board" : `/${item.label.toLowerCase()}`;
          return (
            <NavLink
              key={item.label}
              to={to}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    px: 1.5,
                    py: 1,
                    borderRadius: 1,
                    fontSize: 13,
                    fontWeight: 500,
                    transition: "all 0.15s",
                    color: isActive ? "#fff" : sidebar.text,
                    bgcolor: isActive ? sidebar.active : "transparent",
                    "&:hover": {
                      color: "#fff",
                      bgcolor: isActive ? sidebar.active : sidebar.hover,
                    },
                  }}
                >
                  <Box sx={{ color: isActive ? "primary.main" : sidebar.text, display: "flex" }}>
                    {iconMap[item.icon]}
                  </Box>
                  {item.label}
                </Box>
              )}
            </NavLink>
          );
        })}
      </Box>

      <Box sx={{ height: "1px", bgcolor: sidebar.border, mx: 1.5 }} />

      {/* Projects */}
      <Box sx={{ px: 2.5, py: 2, flex: 1 }}>
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: sidebar.text,
            mb: 1.5,
          }}
        >
          Your Projects
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {projects.map((p) => (
            <Box
              key={p.key}
              component="a"
              href="#"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                px: 1,
                py: 0.75,
                borderRadius: 1,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.15s",
                color: p.active ? "#fff" : sidebar.text,
                bgcolor: p.active ? sidebar.hover : "transparent",
                "&:hover": { color: "#fff", bgcolor: sidebar.hover },
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: 0.5, bgcolor: p.color, flexShrink: 0 }} />
              <Box sx={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {p.name}
              </Box>
              <Typography sx={{ fontSize: 11, color: sidebar.text }}>{p.key}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ height: "1px", bgcolor: sidebar.border, mx: 1.5 }} />

      {/* User */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 2.5, py: 2 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: 11, fontWeight: 700 }}>
          SZ
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            Sukhdev Z.
          </Typography>
          <Typography sx={{ fontSize: 11, color: sidebar.text }}>Admin</Typography>
        </Box>
      </Box>
    </Box>
  );
}
