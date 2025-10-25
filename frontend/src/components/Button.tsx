import { Button as MuiButton } from "@mui/material";
import type { PropsWithChildren } from "react";

export interface ButtonProps {
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  disabled = false,
  fullWidth = false,
  type = "button",
}: PropsWithChildren<ButtonProps>) {
  return (
    <MuiButton
      disabled={disabled}
      fullWidth={fullWidth}
      type={type}
      variant="contained"
    >
      {children}
    </MuiButton>
  );
}
