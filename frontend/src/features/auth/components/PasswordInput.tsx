import { TextField } from "@mui/material";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface PasswordInputProps extends UseFormRegisterReturn {
  error: FieldError | undefined;
}

export function PasswordInput({ error, ...register }: PasswordInputProps) {
  const { t } = useTranslation("auth");

  const helperText = (error: FieldError | undefined) => {
    if (!error) return undefined;
    switch (error.type) {
      case "too_small":
        return t("validation.password.tooSmall");
      default:
        return t("validation.password.unknown");
    }
  };

  return (
    <TextField
      {...register}
      error={!!error}
      fullWidth
      helperText={helperText(error)}
      label={t("password")}
      type="password"
    />
  );
}
