import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { FormField, FormSelect } from "@/components/form";
import { createIssueSchema, type CreateIssueFormData } from "@/lib/validations/issue";
import { ISSUE_TYPES, PRIORITIES, STATUSES, TYPE_LABELS, PRIORITY_LABELS, STATUS_LABELS } from "@/types/issue";
import type { Assignee } from "@/types/issue";

interface CreateIssueDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateIssueFormData) => void;
  assignees: Assignee[];
}

export function CreateIssueDialog({ open, onClose, onSubmit, assignees }: CreateIssueDialogProps) {
  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<CreateIssueFormData>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "task",
      priority: "medium",
      status: "todo",
      assigneeId: "",
      storyPoints: "",
      labels: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: CreateIssueFormData) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: { sx: { borderRadius: 4 } },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: 18, pb: 1 }}>
        New Issue
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
          <FormField
            control={control}
            name="title"
            label="Title"
            fullWidth
            autoFocus
            placeholder="Issue title"
          />
          <FormField
            control={control}
            name="description"
            label="Description"
            fullWidth
            multiline
            minRows={3}
            placeholder="Add a description..."
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormSelect
              control={control}
              name="type"
              label="Type"
              options={ISSUE_TYPES.map((t) => ({ value: t, label: TYPE_LABELS[t] }))}
              sx={{ flex: 1 }}
            />
            <FormSelect
              control={control}
              name="priority"
              label="Priority"
              options={PRIORITIES.map((p) => ({ value: p, label: PRIORITY_LABELS[p] }))}
              sx={{ flex: 1 }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormSelect
              control={control}
              name="status"
              label="Status"
              options={STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] }))}
              sx={{ flex: 1 }}
            />
            <FormSelect
              control={control}
              name="assigneeId"
              label="Assignee"
              placeholder="Unassigned"
              options={[
                { value: "", label: "Unassigned" },
                ...assignees.map((a) => ({ value: a.id, label: a.displayName })),
              ]}
              sx={{ flex: 1 }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormField
              control={control}
              name="storyPoints"
              label="Story Points"
              type="number"
              sx={{ flex: 1 }}
            />
            <FormField
              control={control}
              name="labels"
              label="Labels"
              placeholder="frontend, bug (comma-separated)"
              sx={{ flex: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button variant="outlined" onClick={handleClose} sx={{ color: "text.secondary", borderColor: "divider" }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Issue"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
