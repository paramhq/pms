import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function IssueListPage() {
  const { key } = useParams();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" sx={{ mb: 1 }}>{key} &mdash; Issues</Typography>
      <Typography color="text.secondary">Issue list with filters, sorting, and grouping. Coming soon.</Typography>
    </Box>
  );
}
