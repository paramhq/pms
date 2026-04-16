import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ProjectSettingsPage() {
  const { key } = useParams();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" sx={{ mb: 1 }}>{key} &mdash; Settings</Typography>
      <Typography color="text.secondary">Project settings and configuration. Coming soon.</Typography>
    </Box>
  );
}
