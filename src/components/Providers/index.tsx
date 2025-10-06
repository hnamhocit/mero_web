"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ReactNode } from "react";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <HeroUIProvider>
      <ThemeProvider />
      <ToastProvider />

      <AuthProvider>{children}</AuthProvider>
    </HeroUIProvider>
  );
};

export default Providers;
