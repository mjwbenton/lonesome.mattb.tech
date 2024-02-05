import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "react-feather";
import { Button } from "@ariakit/react";

export default function ThemeChanger() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure that we don't render this server side
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const toggleTheme = () => {
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      className="absolute right-0 bottom-0 py-11 px-8 md:static text-light-2 dark:text-dark-2"
      onClick={() => toggleTheme()}
      aria-pressed={isDark}
      aria-label="Dark Mode"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
