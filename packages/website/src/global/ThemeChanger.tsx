import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "react-feather";

export default function ThemeChanger() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure that we don't render this server side
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      role="presentation"
      className="md:static absolute right-0 top-0 p-12 text-light-2 dark:text-dark-2"
    >
      {theme === "dark" ? (
        <button onClick={() => setTheme("light")}>
          <Sun />
        </button>
      ) : null}
      {theme === "light" ? (
        <button onClick={() => setTheme("dark")}>
          <Moon />
        </button>
      ) : null}
    </div>
  );
}
