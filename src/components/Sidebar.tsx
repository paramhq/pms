import { NavLink } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import LayersIcon from "@mui/icons-material/Layers";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { palette, sidebarConfig } from "@/theme";
import { navItems, projects } from "@/data";
import { useAuth } from "@/contexts/AuthContext";

const sb = palette.sidebar;

const iconMap: Record<string, React.ReactNode> = {
  home: <HomeRoundedIcon sx={{ fontSize: 18 }} />,
  folder: <FolderRoundedIcon sx={{ fontSize: 18 }} />,
  list: <ViewListRoundedIcon sx={{ fontSize: 18 }} />,
  sprint: <AssignmentRoundedIcon sx={{ fontSize: 18 }} />,
  settings: <SettingsRoundedIcon sx={{ fontSize: 18 }} />,
};

function SectionLabel({ children }: { children: string }) {
  return (
    <Typography
      sx={{
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "1.8px",
        color: sb.text,
        px: 1.5,
        pt: 2,
        pb: 0.75,
        opacity: 0.6,
      }}
    >
      {children}
    </Typography>
  );
}

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <Box
      component="aside"
      sx={{
        width: sidebarConfig.width,
        minWidth: sidebarConfig.width,
        bgcolor: sb.bg,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRight: `1px solid ${sb.border}`,
        // Subtle inner glow
        boxShadow: `inset -1px 0 0 ${sb.border}`,
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 1.75, pt: 2.5, pb: 2 }}>
        <Avatar
          sx={{
            width: 30,
            height: 30,
            borderRadius: 1.5,
            background: `linear-gradient(135deg, ${palette.purple[500]} 0%, ${palette.purple[700]} 100%)`,
            fontSize: 16,
          }}
        >
          <LayersIcon sx={{ fontSize: 18 }} />
        </Avatar>
        <Typography sx={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
          ProjectHub
        </Typography>
      </Box>

      <Box sx={{ height: "1px", bgcolor: sb.border, mx: 1.5 }} />

      {/* Main nav */}
      <SectionLabel>Menu</SectionLabel>
      <Box component="nav" sx={{ display: "flex", flexDirection: "column", gap: "2px", px: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/dashboard" || item.to === "/projects" || item.to === "/settings"}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1.5,
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  transition: "all 0.15s ease",
                  color: isActive ? sb.textActive : sb.text,
                  bgcolor: isActive ? sb.active : "transparent",
                  "&:hover": {
                    color: sb.textHover,
                    bgcolor: isActive ? sb.active : sb.bgLight,
                  },
                }}
              >
                <Box sx={{ display: "flex", color: isActive ? palette.purple[400] : "inherit" }}>
                  {iconMap[item.icon]}
                </Box>
                {item.label}
              </Box>
            )}
          </NavLink>
        ))}
      </Box>

      <Box sx={{ height: "1px", bgcolor: sb.border, mx: 1.5, mt: 1.5 }} />

      {/* Projects */}
      <SectionLabel>Projects</SectionLabel>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2px", px: 1, flex: 1 }}>
        {projects.map((p) => (
          <NavLink
            key={p.key}
            to={`/projects/${p.key}`}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  px: 1.5,
                  py: 0.625,
                  borderRadius: 1.5,
                  fontSize: 13,
                  fontWeight: 500,
                  transition: "all 0.15s ease",
                  color: isActive ? sb.textActive : sb.text,
                  bgcolor: isActive ? sb.active : "transparent",
                  "&:hover": { color: sb.textHover, bgcolor: sb.bgLight },
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: "3px", bgcolor: p.color, flexShrink: 0 }} />
                <Box sx={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.name}
                </Box>
                <Typography sx={{ fontSize: 10, color: sb.text, opacity: 0.5, fontWeight: 600 }}>{p.key}</Typography>
              </Box>
            )}
          </NavLink>
        ))}
      </Box>

      <Box sx={{ height: "1px", bgcolor: sb.border, mx: 1.5 }} />

      {/* Bottom: user + actions */}
      <Box sx={{ px: 1.5, py: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
        {/* Quick actions row */}
        <Box sx={{ display: "flex", gap: 0.5, px: 0.5 }}>
          <IconButton size="small" sx={{ color: sb.text, "&:hover": { color: sb.textHover, bgcolor: sb.bgLight } }}>
            <NotificationsNoneRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" sx={{ color: sb.text, "&:hover": { color: sb.textHover, bgcolor: sb.bgLight } }}>
            <HelpOutlineRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Box sx={{ flex: 1 }} />
          <IconButton size="small" onClick={logout} title="Sign out" sx={{ color: sb.text, "&:hover": { color: "#e11d48", bgcolor: "rgba(225,29,72,0.1)" } }}>
            <LogoutRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        {/* User */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 0.5 }}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              fontSize: 10,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${palette.purple[500]}, ${palette.purple[700]})`,
            }}
          >
            SZ
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: sb.textActive, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Sukhdev Z.
            </Typography>
            <Typography sx={{ fontSize: 10, color: sb.text, opacity: 0.6 }}>Admin</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
