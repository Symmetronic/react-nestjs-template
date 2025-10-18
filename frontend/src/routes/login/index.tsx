import { LoginView } from "@/features/auth/components/LoginView";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login/")({
  component: LoginComponent,
  head: () => ({
    meta: [{ title: "Login" }],
  }),
  validateSearch: loginSearchSchema,
});

function LoginComponent() {
  const { redirect } = Route.useSearch();
  return <LoginView redirect={redirect} />;
}
