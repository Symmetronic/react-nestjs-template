import { postLoginBody } from "@/api/generated/auth/auth.zod";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { H1 } from "@/components/H1";
import { P } from "@/components/P";
import { Stack } from "@/components/Stack";
import { EmailInput } from "@/features/auth/components/EmailInput";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { useAuth } from "@/hooks/useAuth";
import type { LoginRequestDto } from "@/types/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface LoginViewProps {
  redirect: string | undefined;
}

export function LoginView({ redirect }: LoginViewProps) {
  const { t } = useTranslation("auth");
  const { isLoginError, isAuthenticated, login } = useAuth();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginRequestDto>({
    resolver: zodResolver(postLoginBody),
  });

  if (isAuthenticated) {
    return <Navigate to={redirect ?? "/dashboard"} />;
  }

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(login)}>
        <Stack spacing={1}>
          <H1>{t("login")}</H1>
          {isLoginError && <P color="error">{t("invalidCredentials")}</P>}
          <EmailInput {...register("email")} error={errors.email} />
          <PasswordInput {...register("password")} error={errors.password} />
          <Button fullWidth type="submit">
            {t("login")}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
