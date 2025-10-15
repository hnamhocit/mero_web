"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ReactNode } from "react";
import { Theme } from "@radix-ui/themes";

import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Theme>
      <HeroUIProvider>
        <ThemeProvider />
        <ToastProvider />

        <AuthProvider>{children}</AuthProvider>
      </HeroUIProvider>
    </Theme>
  );
};

export default Providers;
