import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import { EmptyState } from "@/components/EmptyState";
import { CreateProjectDialog } from "@/components/projects";
import { useProjectState } from "@/hooks/useProjectState";
import { useToast } from "@/contexts/ToastContext";
import { MOCK_PROJECTS, INITIAL_PROJECT_COUNTER } from "@/data/mockProjects";
import { MOCK_ISSUES } from "@/data/mockIssues";
import { contentCardTokens, palette } from "@/theme";

export default function ProjectListPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { projects, isLoading, createProject } = useProjectState(MOCK_PROJECTS, INITIAL_PROJECT_COUNTER);
  const [createOpen, setCreateOpen] = useState(false);

  const issueCountMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const issue of MOCK_ISSUES) {
      const key = issue.key.split("-")[0];
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Projects</Typography>
        <Button variant="contained" size="small" startIcon={<AddRoundedIcon />} onClick={() => setCreateOpen(true)}>
          New Project
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2.5 }}>
          {[1, 2, 3].map((i) => (
            <Paper key={i} sx={{ p: 3, borderRadius: `${contentCardTokens.borderRadius}px`, border: `1px solid ${contentCardTokens.border}` }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="60%" sx={{ fontSize: 16 }} />
              <Skeleton variant="text" width="40%" sx={{ fontSize: 12 }} />
              <Skeleton variant="text" width="100%" sx={{ fontSize: 13, mt: 1 }} />
            </Paper>
          ))}
        </Box>
      ) : projects.length === 0 ? (
        <Paper sx={{ borderRadius: `${contentCardTokens.borderRadius}px`, boxShadow: contentCardTokens.shadow, border: `1px solid ${contentCardTokens.border}` }}>
          <EmptyState
            icon={FolderRoundedIcon}
            title="No projects yet"
            description="Create your first project to start tracking work."
            action={{ label: "New Project", onClick: () => setCreateOpen(true) }}
          />
        </Paper>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2.5 }}>
          {projects.map((project) => (
            <Paper
              key={project.id}
              onClick={() => navigate(`/projects/${project.key}`)}
              sx={{
                p: 0,
                borderRadius: `${contentCardTokens.borderRadius}px`,
                boxShadow: contentCardTokens.shadow,
                border: `1px solid ${contentCardTokens.border}`,
                cursor: "pointer",
                overflow: "hidden",
                transition: "all 0.15s",
                "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.08)", borderColor: palette.purple[200] },
              }}
            >
              {/* Color stripe */}
              <Box sx={{ height: 4, bgcolor: project.color }} />
              <Box sx={{ p: 3 }}>
                {/* Icon + name */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: project.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>
                    {project.key[0]}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>{project.name}</Typography>
                    <Typography sx={{ fontSize: 11, fontFamily: "monospace", color: "text.disabled" }}>{project.key}</Typography>
                  </Box>
                </Box>

                {/* Description */}
                <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {project.description || "No description"}
                </Typography>

                {/* Stats */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.disabled" }}>
                    <PeopleRoundedIcon sx={{ fontSize: 14 }} />
                    <Typography sx={{ fontSize: 12, fontWeight: 500 }}>{project.memberIds.length}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.disabled" }}>
                    <AssignmentRoundedIcon sx={{ fontSize: 14 }} />
                    <Typography sx={{ fontSize: 12, fontWeight: 500 }}>{issueCountMap.get(project.key) ?? 0} issues</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      <CreateProjectDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={(data) => {
          const p = createProject(data);
          toast.success(`Project "${p.name}" created`);
        }}
      />
    </>
  );
}
