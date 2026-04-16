import { useController, type Control, type FieldValues, type Path } from "react-hook-form";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<TextFieldProps, "name" | "error" | "helperText" | "value" | "onChange" | "onBlur">;

export function FormField<T extends FieldValues>({
  control,
  name,
  ...textFieldProps
}: FormFieldProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <TextField
      {...field}
      {...textFieldProps}
      error={!!error}
      helperText={error?.message}
    />
  );
}
