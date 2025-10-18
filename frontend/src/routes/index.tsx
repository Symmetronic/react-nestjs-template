import { IndexView } from "@/features/index/components/IndexView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexView,
  head: () => ({
    meta: [{ title: "App" }],
  }),
});
