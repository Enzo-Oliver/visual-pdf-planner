import { useCallback, useEffect, useState } from "react";

export const THEME_KEY = "chamaserv-theme";

export type Theme = "light" | "dark";

export function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "dark" || v === "light" ? v : null;
  } catch {
    return null;
  }
}

export function resolveTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = getStoredTheme();
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

/** Inline script injected in the document head to avoid a flash / mismatch. */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_KEY}");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

/**
 * Shared theme state. Renders "light" on the server and during the first
 * client render (matching SSR markup), then syncs to the real theme.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = resolveTheme();
    setTheme(current);
    applyTheme(current);
    setMounted(true);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (getStoredTheme()) return;
      const next: Theme = media.matches ? "dark" : "light";
      setTheme(next);
      applyTheme(next);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_KEY) return;
      const next = resolveTheme();
      setTheme(next);
      applyTheme(next);
    };
    media.addEventListener("change", onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setThemeAndPersist = useCallback((next: Theme) => {
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(
    (next?: boolean) => {
      setThemeAndPersist(
        (next ?? !(document.documentElement.classList.contains("dark"))) ? "dark" : "light",
      );
    },
    [setThemeAndPersist],
  );

  return { theme, isDark: theme === "dark", mounted, setTheme: setThemeAndPersist, toggleTheme };
}
