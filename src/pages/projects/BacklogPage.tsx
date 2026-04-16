import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function BacklogPage() {
  const { key } = useParams();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" sx={{ mb: 1 }}>{key} &mdash; Backlog</Typography>
      <Typography color="text.secondary">Prioritized backlog with drag-to-reorder. Coming soon.</Typography>
    </Box>
  );
}
