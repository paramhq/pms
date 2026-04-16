import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function IssueDetailPage() {
  const { key, id } = useParams();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" sx={{ mb: 1 }}>{key}-{id}</Typography>
      <Typography color="text.secondary">Issue detail view. Coming soon.</Typography>
    </Box>
  );
}
