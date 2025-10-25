import { TextField } from "@/components/TextField";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface EmailInputProps extends UseFormRegisterReturn {
  error: FieldError | undefined;
}

export function EmailInput({ error, ...register }: EmailInputProps) {
  const { t } = useTranslation("auth");

  const helperText = (error: FieldError | undefined) => {
    if (!error) return undefined;
    switch (error.type) {
      case "invalid_format":
        return t("validation.email.invalidFormat");
      case "too_small":
        return t("validation.email.tooSmall");
      default:
        return t("validation.email.unknown");
    }
  };

  return (
    <TextField {...register} error={helperText(error)} label={t("email")} />
  );
}
