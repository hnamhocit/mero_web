"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { addToast } from "@heroui/react";
import clsx from "clsx";

import { useUserStore } from "@/stores";
import Input from "./Input";

const password = z
  .string()
  .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    "Must be 8+ chars, include upper, lower, number & symbol",
  );

const loginSchema = z.object({
  email: z.email(),
  password: password,
});

const registerSchema = loginSchema.extend({
  displayName: z.string().min(3, "Display name must be at least 3 chars"),
  email: z.email(),
  password: password,
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register: _register } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues | RegisterValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  const onSubmit = async (data: any) => {
    try {
      isLogin ? await login(data) : await _register(data);
    } catch (error) {
      addToast({
        title: "Auth failed",
        description: JSON.stringify(error),
        color: "danger",
      });
    }
  };

  return (
    <div className="w-4/5 flex flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">
          {isLogin ? "Sign in" : "Sign up"}
        </h2>
        <p className="text-sm text-white/70">
          {isLogin
            ? "Enter your credentials to continue"
            : "Create your account below"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {!isLogin && (
          <Input
            placeholder="Your name"
            {...register("displayName")}
            error={errors.displayName?.message}
          />
        )}

        <Input
          placeholder="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          placeholder="Password"
          type={"password"}
          {...register("password")}
          error={errors.password?.message}
        />

        <button
          type="submit"
          className={clsx(
            "block bg-primary hover:bg-primary/90 transition-colors py-2 px-3 font-medium",
            isSubmitting && "opacity-50 cursor-not-allowed",
          )}
        >
          {isSubmitting ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
        </button>
      </form>

      <div className="text-center text-sm">Forgot your password?</div>

      <div className="h-[2px] w-full bg-white/10"></div>

      <div className="flex items-center justify-between">
        <div className="text-white/50">
          {isLogin ? "Don't" : "Already"} have an account?
        </div>

        <button
          onClick={toggleIsLogin}
          className="block transition-colors hover:bg-semilight/90 font-medium bg-semilight py-3 px-6"
        >
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
