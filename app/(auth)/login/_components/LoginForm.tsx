"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, GithubIcon, Loader, Send } from "lucide-react";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";

import { motion } from "motion/react";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Github, redirecting...");
          },
          onError: (error) => {
            toast.error("Failed to sign in with Github");
            console.log(error.error.message);
          },
        },
      });
    });
  }

  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Google, redirecting...");
          },
          onError: (error) => {
            toast.error("Failed to sign in with Google");
          },
        },
      });
    });
  }

  function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email sent");
            router.push("/verify-request");
          },
          onError: (error) => {
            toast.error("Error send email");
          },
        },
      });
    });
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="p-2 bg-primary/20 rounded-xl">
              <Image src="/fav-icon.png" alt="logo" width={32} height={32} />
            </div>
          </div>
        </Link>
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className=""
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* <div className="space-y-2">
        <div className="*:not-first:mt-2">
          <Label htmlFor="Password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              className="pe-9"
              placeholder="Password"
              type={isVisible ? "text" : "password"}
            />
            <button
              className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={toggleVisibility}
              aria-label={isVisible ? "Hide password" : "Show password"}
              aria-pressed={isVisible}
              aria-controls="password"
            >
              {isVisible ? (
                <EyeOffIcon size={16} aria-hidden="true" />
              ) : (
                <EyeIcon size={16} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div> */}

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            className="w-full"
            onClick={signInWithEmail}
            disabled={emailPending}
          >
            {emailPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                {" "}
                <Send className="size-4" /> Continue
              </>
            )}
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full"
                disabled={googlePending}
                onClick={signInWithGoogle}
              >
                {googlePending ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      className="size-4"
                      alt="Google"
                    />
                    Google
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={githubPending}
                onClick={signInWithGithub}
              >
                {githubPending ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <GithubIcon className="size-4" />
                    GitHub
                  </>
                )}
              </Button>
            </div>

            <div className="mt-6 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
