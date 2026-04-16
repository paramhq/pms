import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { FormField } from "@/components/form";
import { labelSchema, type LabelFormData } from "@/lib/validations/label";

const PRESET_COLORS = ["#6366f1", "#10b981", "#e11d48", "#f59e0b", "#6b7280", "#ef4444", "#8b5cf6", "#3b82f6"];

interface CreateLabelDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: LabelFormData) => void;
  initialValues?: LabelFormData;
  title?: string;
}

export function CreateLabelDialog({ open, onClose, onSubmit, initialValues, title = "New Label" }: CreateLabelDialogProps) {
  const { control, handleSubmit, reset, watch, setValue } = useForm<LabelFormData>({
    resolver: zodResolver(labelSchema),
    defaultValues: initialValues ?? { name: "", color: PRESET_COLORS[0] },
  });

  const selectedColor = watch("color");

  useEffect(() => {
    if (open && initialValues) reset(initialValues);
    if (open && !initialValues) reset({ name: "", color: PRESET_COLORS[0] });
  }, [open, initialValues, reset]);

  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" slotProps={{ paper: { sx: { borderRadius: 4 } } }}>
      <DialogTitle sx={{ fontWeight: 700, fontSize: 16, pb: 1 }}>{title}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit((data) => { onSubmit(data); handleClose(); })} noValidate>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
          <FormField control={control} name="name" label="Label name" fullWidth autoFocus placeholder="e.g. frontend" />
          <Box>
            <Box sx={{ fontSize: 13, fontWeight: 500, color: "text.secondary", mb: 1 }}>Color</Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {PRESET_COLORS.map((c) => (
                <Box
                  key={c}
                  onClick={() => setValue("color", c)}
                  sx={{
                    width: 28, height: 28, borderRadius: "50%", bgcolor: c, cursor: "pointer",
                    border: selectedColor === c ? "3px solid" : "3px solid transparent",
                    borderColor: selectedColor === c ? "text.primary" : "transparent",
                    transition: "border-color 0.15s",
                  }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button variant="outlined" onClick={handleClose} sx={{ color: "text.secondary", borderColor: "divider" }}>Cancel</Button>
          <Button type="submit" variant="contained">{initialValues ? "Save" : "Create"}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
