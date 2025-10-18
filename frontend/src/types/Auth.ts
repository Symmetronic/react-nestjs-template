import type { LoginRequestDto } from "@/types/generated";

export type AuthenticatedAuth = {
  isAuthenticated: true;
  isLoginError: false;
  login: (loginRequest: LoginRequestDto) => void;
  user: LoginRequestDto;
};

export type UnauthenticatedAuth = {
  isAuthenticated: false;
  isLoginError: boolean;
  login: (loginRequest: LoginRequestDto) => void;
  user: undefined;
};

export type Auth = AuthenticatedAuth | UnauthenticatedAuth;
