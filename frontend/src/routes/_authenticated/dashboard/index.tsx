import { DashboardView } from "@/features/dashboard/components/DashboardView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: DashboardView,
  head: () => ({
    meta: [{ title: "Dashboard" }],
  }),
});
