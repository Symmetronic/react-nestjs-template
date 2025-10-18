import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/500")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>500 Internal Server Error</div>;
}
