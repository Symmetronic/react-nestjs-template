import { Typography, type TypographyTypeMap } from "@mui/material";
import type { PropsWithChildren } from "react";

export interface PProps {
  color?: TypographyTypeMap["props"]["color"];
}

export function P({ children, color }: PropsWithChildren<PProps>) {
  return (
    <Typography {...(color && { color })} component="p">
      {children}
    </Typography>
  );
}
