import { usePostLogin } from "@/api/generated/auth/auth";
import { AuthContext } from "@/hooks/useAuth";
import type { Auth } from "@/types/Auth";
import type { LoginRequestDto } from "@/types/generated";
import { useState, type PropsWithChildren } from "react";

function useProvideAuth(): Auth {
  const postLogin = usePostLogin({
    mutation: {
      onSuccess: (_response, { data: newUser }) => {
        setUser(newUser);
      },
      onError: () => {
        setUser(undefined);
      },
    },
  });
  const [user, setUser] = useState<LoginRequestDto | undefined>(undefined);

  const login = async (loginRequest: LoginRequestDto) => {
    postLogin.mutate({ data: loginRequest });
  };

  if (user) {
    return {
      isAuthenticated: true,
      isLoginError: false,
      login,
      user,
    };
  }

  return {
    isAuthenticated: false,
    isLoginError: postLogin.isError,
    login,
    user: undefined,
  };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
