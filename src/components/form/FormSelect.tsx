import type { ReactNode } from "react";
import { useController, type Control, type FieldValues, type Path } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormHelperText from "@mui/material/FormHelperText";
import type { SxProps, Theme } from "@mui/material/styles";

interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
};

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  disabled,
  fullWidth = true,
  size = "small",
  sx,
}: FormSelectProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <FormControl
      fullWidth={fullWidth}
      size={size}
      error={!!error}
      disabled={disabled}
      sx={sx}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        label={label}
        displayEmpty={!!placeholder}
        sx={{ borderRadius: "10px" }}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.icon && <ListItemIcon sx={{ minWidth: 28 }}>{opt.icon}</ListItemIcon>}
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
