import { Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

export function H1({ children }: PropsWithChildren) {
  return (
    <Typography component="h1" variant="h4">
      {children}
    </Typography>
  );
}
