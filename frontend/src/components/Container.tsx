import {
  Container as MuiContainer,
  type ContainerTypeMap,
} from "@mui/material";
import type { PropsWithChildren } from "react";

export interface ContainerProps {
  maxWidth?: ContainerTypeMap["props"]["maxWidth"];
}

export function Container({
  children,
  maxWidth = false,
}: PropsWithChildren<ContainerProps>) {
  return <MuiContainer maxWidth={maxWidth}>{children}</MuiContainer>;
}
