import { useGetCurrentUser } from "@/api/generated/users/users";
import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { Navigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function DashboardView() {
  const { t } = useTranslation("dashboard");
  const { data: response, isPending } = useGetCurrentUser();

  if (isPending) {
    return <CircularProgress />;
  }

  const user = response?.data;

  if (!user) {
    return <Navigate to="/500" />;
  }

  return (
    <Container>
      <Stack spacing={1}>
        <Typography component="h1" variant="h4">
          {t("dashboard")}
        </Typography>
        <Typography>{t("welcomeEmail", { email: user.email })}</Typography>
      </Stack>
    </Container>
  );
}
