"use client";

import { ChevronLeft, Github, GithubIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, resolvedTheme } = useTheme();

  // Determine background image based on theme
  const backgroundImage =
    resolvedTheme === "dark" ? "/bg-auth-dark.gif" : "/bg-auth-light.gif";

  // Prevent hydration mismatch by not rendering until theme is resolved
  if (!resolvedTheme) {
    return null;
  }
  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center p-4">
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-2"
      >
        <ChevronLeft className="size-5 mr-2" />
        Back to Home
      </Link>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-6xl"
      >
        <div className="bg-transparent lg:bg-secondary/50 overflow-hidden rounded-[40px] shadow-4xl">
          <div className="grid min-h-[700px] lg:grid-cols-2">
            {/* Left Side */}
            <div
              className="brand-side relative m-4 rounded-3xl bg-cover p-12 hidden lg:block"
              style={{ backgroundImage: `url('${backgroundImage}')` }}
            />

            {/* Right Side */}
            <div className="flex flex-col justify-center p-12">{children}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
