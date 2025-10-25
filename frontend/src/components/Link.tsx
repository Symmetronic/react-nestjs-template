import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

export interface LinkProps {
  to: string;
}

export function Link({ children, to }: PropsWithChildren<LinkProps>) {
  return (
    <MuiLink component={RouterLink} to={to} variant="button">
      {children}
    </MuiLink>
  );
}
