"use client";
import Image from "next/image";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Zap,
  Search,
  ArrowRightIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/catalog" },
  { name: "Collections", href: "/about" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: easeInOut,
        staggerChildren: 0.1,
      },
    },
  };
  const mobileItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.header
        className="fixed top-0 right-0 left-0 z-50 transition-all duration-500 border-white/20 border-b shadow-sm bg-black/5 backdrop-blur-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Container */}
            <div className="flex items-center space-x-6">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  prefetch={false}
                  href="/"
                  className="flex items-center space-x-3"
                >
                  <div className="p-2 bg-primary/20 rounded-xl">
                    <Image
                      src="/fav-icon.png"
                      alt="logo"
                      width={32}
                      height={32}
                    />
                  </div>

                  <div className="flex">
                    <span className="text-lg text-white font-semibold">
                      Kuroro
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Nav Links */}
              <nav className="hidden items-center space-x-1 lg:flex">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      prefetch={false}
                      href={item.href}
                      className="text-white hover:text-black relative rounded-lg px-4 py-2 text-sm  transition-colors duration-200"
                    >
                      {hoveredItem === item.name && (
                        <motion.div
                          className="bg-white absolute inset-0 rounded-lg"
                          layoutId="navbar-hover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Actions */}
            <motion.div
              className="hidden items-center space-x-3 lg:flex"
              variants={itemVariants}
            >
              {/* Search Input */}
              <div className="*:not-first:mt-2">
                <div className="relative text-white">
                  <Input
                    id="search"
                    className="peer ps-9 pe-9 bg-zinc-500/50 border-white/30 placeholder:text-white text-white"
                    placeholder="Search"
                    type="search"
                  />
                  <div className="text-white pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <SearchIcon size={16} />
                  </div>
                  <button
                    className="text-white hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Submit search"
                    type="submit"
                  >
                    <ArrowRightIcon size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
              <Link
                prefetch={false}
                href="/login"
                className="text-white hover:text-white/80 px-4 py-2 text-sm font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  prefetch={false}
                  href="/login"
                  className="bg-white text-black hover:bg-white/90 inline-flex items-center space-x-2 rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-200"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.button
              className="text-white hover:text-text hover:bg-muted rounded-lg p-2 transition-colors duration-200 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variants={itemVariants}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="border-border bg-background fixed top-16 right-4 z-50 w-80 overflow-hidden rounded-2xl border shadow-2xl lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="space-y-6 p-6">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <motion.div key={item.name} variants={mobileItemVariants}>
                      <Link
                        prefetch={false}
                        href={item.href}
                        className="text-foreground hover:bg-muted block rounded-lg px-4 py-3 font-medium transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="border-border space-y-3 border-t pt-6"
                  variants={mobileItemVariants}
                >
                  <Link
                    prefetch={false}
                    href="/login"
                    className="text-foreground hover:bg-muted block w-full rounded-lg py-3 text-center font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    prefetch={false}
                    href="/signup"
                    className="bg-foreground text-background hover:bg-foreground/90 block w-full rounded-lg py-3 text-center font-medium transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
