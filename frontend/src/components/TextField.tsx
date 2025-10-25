import { TextField as MuiTextField } from "@mui/material";
import type { ChangeEvent, ReactNode, RefCallback } from "react";

export interface TextFieldProps {
  disabled?: boolean;
  label?: ReactNode;
  error?: string | undefined;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ref: RefCallback<HTMLInputElement>;
  required?: boolean;
  type?: string;
  value?: string;
}

export function TextField({
  disabled = false,
  error,
  label,
  name,
  onChange,
  ref,
  required = false,
  type = "text",
  value,
}: TextFieldProps) {
  return (
    <MuiTextField
      disabled={disabled}
      error={!!error}
      fullWidth
      helperText={error}
      label={label}
      name={name}
      onChange={onChange}
      required={required}
      ref={ref}
      type={type}
      value={value}
    />
  );
}
