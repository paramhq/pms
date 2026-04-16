import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function UserSettingsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" sx={{ mb: 1 }}>Settings</Typography>
      <Typography color="text.secondary">Profile, notifications, appearance, and shortcuts. Coming soon.</Typography>
    </Box>
  );
}
