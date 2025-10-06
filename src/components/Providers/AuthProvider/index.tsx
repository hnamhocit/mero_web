import Auth from "@/components/Auth";
import Loading from "@/components/Loading";
import { useUserStore } from "@/stores";
import { JwtUtils } from "@/utils";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, user, getProfile } = useUserStore();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem(JwtUtils.keys.at)
    ) {
      console.log("Called get profile");
      getProfile();
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Auth />;
  }

  return children;
};

export default AuthProvider;
