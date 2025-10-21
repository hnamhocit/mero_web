"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ReactNode } from "react";
import { Theme } from "@radix-ui/themes";

import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <HeroUIProvider>
      <Theme>
        <ThemeProvider />
        <ToastProvider />

        <AuthProvider>{children}</AuthProvider>
      </Theme>
    </HeroUIProvider>
  );
};

export default Providers;
