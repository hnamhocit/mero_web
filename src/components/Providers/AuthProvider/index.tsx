import Auth from "@/components/Auth";
import ConfirmEmail from "@/components/ConfirmEmail";
import Loading from "@/components/Loading";
import { useUserStore } from "@/stores";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, user, bootstrapApp } = useUserStore();

  useEffect(() => {
    bootstrapApp();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Auth />;
  }

  if (!user.isEmailVerified) {
    return <ConfirmEmail />;
  }

  return children;
};

export default AuthProvider;
