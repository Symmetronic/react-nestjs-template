import { Stack as MuiStack, type StackTypeMap } from "@mui/material";
import type { PropsWithChildren } from "react";

export interface StackProps {
  spacing?: StackTypeMap["props"]["spacing"];
}

export function Stack({
  children,
  spacing = 0,
}: PropsWithChildren<StackProps>) {
  return <MuiStack spacing={spacing}>{children}</MuiStack>;
}
