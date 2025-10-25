import { useGetCurrentUser } from "@/api/generated/users/users";
import { Container } from "@/components/Container";
import { H1 } from "@/components/H1";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { P } from "@/components/P";
import { Stack } from "@/components/Stack";
import { Navigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function DashboardView() {
  const { t } = useTranslation("dashboard");
  const { data: response, isPending } = useGetCurrentUser();

  if (isPending) {
    return <LoadingSpinner />;
  }

  const user = response?.data;

  if (!user) {
    return <Navigate to="/500" />;
  }

  return (
    <Container>
      <Stack spacing={1}>
        <H1>{t("dashboard")}</H1>
        <P>{t("welcomeEmail", { email: user.email })}</P>
      </Stack>
    </Container>
  );
}
