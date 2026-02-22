"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  // const { resolvedTheme, setTheme } = useTheme();
  const { resolvedTheme, setTheme } = useTheme() as {
    resolvedTheme: "light" | "dark" | undefined
    setTheme: (theme: "light" | "dark") => void
  }

  if (!resolvedTheme) return null;
  const isDark = resolvedTheme === "dark";
  return (
    <Button
      variant="outline"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-lg hover:bg-border/50 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-indigo-500" />
      )}
    </Button>
  );
}
