import { ThemeToggle } from "@/components/ui/theme-toggle";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-foreground">Kuroro.to</span>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Terms of Service
          </span>
          <span className="text-xs text-muted-foreground">Privacy Policy</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          Copyright © 2025 Kuroro.to. All rights reserved.
        </span>
        <ThemeToggle />
      </div>
    </footer>
  );
};
