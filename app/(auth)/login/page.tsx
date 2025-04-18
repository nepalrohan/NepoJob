"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, User } from "lucide-react";
import { useAppDispatch,useAppSelector  } from "@/lib/hooks";
import { loginUser } from "@/lib/features/authSlice";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(["EMPLOYER", "JOBSEEKER"], {
    required_error: "Please select a role",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;


export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "JOBSEEKER",
    },
  });

  async function onSubmit(data: LoginFormValues) {
 
    dispatch(loginUser(data));
  }

  useEffect(() => {
    if (user) {
      router.push(user.role === "EMPLOYER" ? "/employer/dashboard" : "/jobseeker/dashboard")
    }
  }, [user, router])
  return (
    <div className="flex min-h-screen items-center justify-center bg-mycolor px-4 py-12 mt-14">
      <Card className="w-full max-w-md border-2 border-custom shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-custom">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Log in to your NepoJob account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-custom font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="border-2 border-custom focus:ring-hoverColor"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-custom font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="border-2 border-custom focus:ring-hoverColor"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-custom font-medium">I am a</Label>
              <Controller
                control={form.control}
                name="role"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="JOBSEEKER" id="jobseeker" />
                      <Label
                        htmlFor="jobseeker"
                        className="flex items-center gap-1 cursor-pointer"
                      >
                        <User size={16} className="text-custom" />
                        Job Seeker
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="EMPLOYER" id="employer" />
                      <Label
                        htmlFor="employer"
                        className="flex items-center gap-1 cursor-pointer"
                      >
                        <Briefcase size={16} className="text-custom" />
                        Employer
                      </Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {form.formState.errors.role && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.role.message}
                </p>
              )}
            </div>

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-custom hover:text-hoverColor"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-custom hover:bg-custom/90 hover:text-hoverColor transition-colors"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Log In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-custom font-medium hover:text-hoverColor"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
