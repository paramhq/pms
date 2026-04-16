import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddIcon from "@mui/icons-material/Add";

export function Header() {
  return (
    <Box
      component="header"
      sx={{
        height: 56,
        minHeight: 56,
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
      }}
    >
      {/* Breadcrumb */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        <Typography
          component="a"
          href="#"
          sx={{ fontSize: 13, color: "text.disabled", textDecoration: "none", "&:hover": { color: "text.primary" }, transition: "color 0.15s" }}
        >
          Projects
        </Typography>
        <Typography sx={{ fontSize: 13, color: "divider" }}>/</Typography>
        <Typography
          component="a"
          href="#"
          sx={{ fontSize: 13, color: "text.disabled", textDecoration: "none", "&:hover": { color: "text.primary" }, transition: "color 0.15s" }}
        >
          PMS
        </Typography>
        <Typography sx={{ fontSize: 13, color: "divider" }}>/</Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "text.primary" }}>
          Board
        </Typography>
      </Box>

      {/* Right actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
        {/* Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "background.default",
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
            px: 1.5,
            height: 36,
            width: 220,
            "&:focus-within": {
              borderColor: "primary.main",
              boxShadow: (t) => `0 0 0 2px ${t.palette.primary.light}`,
            },
            transition: "all 0.15s",
          }}
        >
          <SearchIcon sx={{ fontSize: 16, color: "text.disabled" }} />
          <InputBase
            placeholder="Search issues..."
            sx={{ fontSize: 13, flex: 1, "& input": { p: 0 } }}
          />
        </Box>

        {/* Notifications */}
        <IconButton
          size="small"
          sx={{
            bgcolor: "background.default",
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            width: 36,
            height: 36,
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <Badge
            variant="dot"
            color="error"
            overlap="circular"
            sx={{ "& .MuiBadge-dot": { top: 2, right: 2, width: 8, height: 8, border: "2px solid #fff" } }}
          >
            <NotificationsNoneIcon sx={{ fontSize: 18 }} />
          </Badge>
        </IconButton>

        {/* Create Issue */}
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon sx={{ fontSize: 18 }} />}
          sx={{ height: 36, px: 2, fontSize: 13 }}
        >
          Create Issue
        </Button>
      </Box>
    </Box>
  );
}
