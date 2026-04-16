import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { palette } from "@/theme";
import { useCommandPalette } from "@/components/CommandPalette";

export function Header() {
  const { open: openPalette } = useCommandPalette();

  return (
    <Box
      component="header"
      sx={{
        height: 52,
        minHeight: 52,
        bgcolor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
      }}
    >
      {/* Breadcrumb */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        {["Projects", "PMS"].map((seg, i) => (
          <Box key={seg} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            {i > 0 && <Typography sx={{ fontSize: 12, color: "text.disabled" }}>/</Typography>}
            <Typography
              component="a"
              href="#"
              sx={{
                fontSize: 13,
                color: "text.disabled",
                textDecoration: "none",
                "&:hover": { color: "text.primary" },
                transition: "color 0.15s",
              }}
            >
              {seg}
            </Typography>
          </Box>
        ))}
        <Typography sx={{ fontSize: 12, color: "text.disabled" }}>/</Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "text.primary" }}>
          Dashboard
        </Typography>
      </Box>

      {/* Right actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Search — opens Command Palette */}
        <Box
          onClick={openPalette}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "background.paper",
            borderRadius: 2.5,
            border: "1px solid",
            borderColor: "divider",
            px: 1.5,
            height: 34,
            width: 200,
            cursor: "pointer",
            transition: "all 0.15s",
            "&:hover": {
              borderColor: palette.purple[300],
              bgcolor: palette.purple[50],
            },
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
          <Typography sx={{ fontSize: 13, color: "text.disabled", flex: 1 }}>
            Search...
          </Typography>
          <Box
            sx={{
              px: 0.75,
              py: 0.125,
              borderRadius: 1,
              border: `1px solid ${palette.page.cardBorder}`,
              fontSize: 10,
              fontWeight: 600,
              color: "text.disabled",
              fontFamily: "monospace",
            }}
          >
            ⌘K
          </Box>
        </Box>

        {/* Notifications */}
        <IconButton
          size="small"
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2.5,
            width: 34,
            height: 34,
            "&:hover": { bgcolor: palette.purple[50] },
          }}
        >
          <Badge
            variant="dot"
            color="error"
            sx={{
              "& .MuiBadge-dot": {
                width: 7,
                height: 7,
                border: "2px solid #fff",
                top: 1,
                right: 1,
              },
            }}
          >
            <NotificationsNoneRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          </Badge>
        </IconButton>

        {/* Create */}
        <Button
          variant="contained"
          size="small"
          startIcon={<AddRoundedIcon sx={{ fontSize: "18px !important" }} />}
          sx={{ height: 34, px: 2 }}
        >
          New Issue
        </Button>
      </Box>
    </Box>
  );
}
