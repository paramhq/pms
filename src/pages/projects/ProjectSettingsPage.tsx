import { useState } from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";
import { LabelChip, CreateLabelDialog } from "@/components/labels";
import { useLabelState } from "@/hooks/useLabelState";
import { useToast } from "@/contexts/ToastContext";
import { MOCK_LABELS } from "@/data/mockLabels";
import { contentCardTokens, palette } from "@/theme";
import type { Label } from "@/types/label";
import type { LabelFormData } from "@/lib/validations/label";

export default function ProjectSettingsPage() {
  const { key } = useParams();
  const toast = useToast();
  const { labels, createLabel, updateLabel, deleteLabel } = useLabelState(MOCK_LABELS);

  const [createOpen, setCreateOpen] = useState(false);
  const [editingLabel, setEditingLabel] = useState<Label | null>(null);
  const [deletingLabel, setDeletingLabel] = useState<Label | null>(null);

  const handleCreate = (data: LabelFormData) => {
    createLabel(data);
    toast.success(`Label "${data.name}" created`);
  };

  const handleEdit = (data: LabelFormData) => {
    if (!editingLabel) return;
    updateLabel(editingLabel.id, data);
    toast.success(`Label updated`);
    setEditingLabel(null);
  };

  const handleDelete = () => {
    if (!deletingLabel) return;
    deleteLabel(deletingLabel.id);
    toast.success(`Label "${deletingLabel.name}" deleted`);
    setDeletingLabel(null);
  };

  return (
    <>
      <Typography variant="h1" sx={{ mb: 3 }}>{key} — Settings</Typography>

      <Paper sx={{ borderRadius: `${contentCardTokens.borderRadius}px`, boxShadow: contentCardTokens.shadow, border: `1px solid ${contentCardTokens.border}`, p: 3 }}>
        {/* Labels section */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LabelRoundedIcon sx={{ fontSize: 20, color: palette.purple[500] }} />
            <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Labels</Typography>
            <Typography sx={{ fontSize: 13, color: "text.disabled" }}>({labels.length})</Typography>
          </Box>
          <Button size="small" startIcon={<AddRoundedIcon />} onClick={() => setCreateOpen(true)}>
            New Label
          </Button>
        </Box>

        {labels.length === 0 ? (
          <Typography sx={{ fontSize: 13, color: "text.disabled", textAlign: "center", py: 4 }}>
            No labels yet. Create one to categorize your issues.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {labels.map((label) => (
              <Box
                key={label.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: 2,
                  py: 1.25,
                  borderRadius: 2,
                  "&:hover": { bgcolor: palette.purple[50], "& .actions": { opacity: 1 } },
                }}
              >
                <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: label.color, flexShrink: 0 }} />
                <Typography sx={{ fontSize: 14, fontWeight: 500, flex: 1 }}>{label.name}</Typography>
                <LabelChip label={label} />
                <Box className="actions" sx={{ opacity: 0, transition: "opacity 0.15s", display: "flex", gap: 0.5 }}>
                  <IconButton size="small" onClick={() => setEditingLabel(label)} sx={{ color: "text.disabled" }}>
                    <EditRoundedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => setDeletingLabel(label)} sx={{ color: "text.disabled", "&:hover": { color: "error.main" } }}>
                    <DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      {/* Create dialog */}
      <CreateLabelDialog open={createOpen} onClose={() => setCreateOpen(false)} onSubmit={handleCreate} />

      {/* Edit dialog */}
      <CreateLabelDialog
        open={!!editingLabel}
        onClose={() => setEditingLabel(null)}
        onSubmit={handleEdit}
        initialValues={editingLabel ? { name: editingLabel.name, color: editingLabel.color } : undefined}
        title="Edit Label"
      />

      {/* Delete confirmation */}
      <Dialog open={!!deletingLabel} onClose={() => setDeletingLabel(null)} maxWidth="xs" slotProps={{ paper: { sx: { borderRadius: 4 } } }}>
        <DialogTitle sx={{ fontWeight: 700, fontSize: 16 }}>Delete label?</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
            Are you sure you want to delete <strong>"{deletingLabel?.name}"</strong>? This will remove it from all issues.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button variant="outlined" onClick={() => setDeletingLabel(null)} sx={{ color: "text.secondary", borderColor: "divider" }}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
