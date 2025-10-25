import { P } from "@/components/P";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/500")({
  component: RouteComponent,
});

function RouteComponent() {
  return <P>500 Internal Server Error</P>;
}
