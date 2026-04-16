import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ProjectOverviewPage() {
  const { key } = useParams();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" sx={{ mb: 1 }}>Project: {key}</Typography>
      <Typography color="text.secondary">Project overview and README. Coming soon.</Typography>
    </Box>
  );
}
