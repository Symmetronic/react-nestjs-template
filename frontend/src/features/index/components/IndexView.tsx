import { Container, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function IndexView() {
  const { t } = useTranslation("index");

  return (
    <Container>
      <Stack spacing={1}>
        <Typography component="h1" variant="h4">
          {t("welcome")}
        </Typography>
        <Link component={RouterLink} to="/login" variant="button">
          {t("login")}
        </Link>
      </Stack>
    </Container>
  );
}
