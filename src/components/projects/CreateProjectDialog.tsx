import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { FormField } from "@/components/form";
import { createProjectSchema, type CreateProjectFormData } from "@/lib/validations/project";

const PRESET_COLORS = ["#7e22ce", "#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#e11d48", "#ec4899", "#6b7280"];

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectFormData) => void;
}

export function CreateProjectDialog({ open, onClose, onSubmit }: CreateProjectDialogProps) {
  const { control, handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: "", key: "", description: "", color: PRESET_COLORS[0] },
  });

  const selectedColor = watch("color");

  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 4 } } }}>
      <DialogTitle sx={{ fontWeight: 700, fontSize: 18, pb: 1 }}>New Project</DialogTitle>
      <Box component="form" onSubmit={handleSubmit((data) => { onSubmit(data); handleClose(); })} noValidate>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormField control={control} name="name" label="Project name" fullWidth autoFocus />
            <FormField control={control} name="key" label="Key" sx={{ width: 120 }} placeholder="PMS"
              slotProps={{ htmlInput: { style: { textTransform: "uppercase" }, maxLength: 5 } }}
            />
          </Box>
          <FormField control={control} name="description" label="Description" fullWidth multiline minRows={2} />
          <Box>
            <Box sx={{ fontSize: 13, fontWeight: 500, color: "text.secondary", mb: 1 }}>Color</Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              {PRESET_COLORS.map((c) => (
                <Box
                  key={c}
                  onClick={() => setValue("color", c)}
                  sx={{
                    width: 32, height: 32, borderRadius: "50%", bgcolor: c, cursor: "pointer",
                    border: selectedColor === c ? "3px solid" : "3px solid transparent",
                    borderColor: selectedColor === c ? "text.primary" : "transparent",
                    transition: "border-color 0.15s",
                  }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button variant="outlined" onClick={handleClose} sx={{ color: "text.secondary", borderColor: "divider" }}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>Create Project</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
