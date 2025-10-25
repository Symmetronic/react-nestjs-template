import { Container } from "@/components/Container";
import { H1 } from "@/components/H1";
import { Link } from "@/components/Link";
import { Stack } from "@/components/Stack";
import { useTranslation } from "react-i18next";

export function IndexView() {
  const { t } = useTranslation("index");

  return (
    <Container>
      <Stack spacing={1}>
        <H1>{t("welcome")}</H1>
        <Link to="/login">{t("login")}</Link>
      </Stack>
    </Container>
  );
}
