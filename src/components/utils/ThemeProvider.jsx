import React, { useEffect } from "react";
import { base44 } from "@/api/base44Client";

let themeCache = null;

async function loadTheme() {
  if (themeCache) return themeCache;
  
  try {
    const themes = await base44.entities.Theme.filter({ is_active: true }, null, 1);
    themeCache = themes?.[0];
    return themeCache;
  } catch (error) {
    console.error("Theme load error:", error);
    return null;
  }
}

function applyTheme(theme) {
  if (!theme) return;
  
  const root = document.documentElement;
  
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([k, v]) => {
      root.style.setProperty(`--color-${k}`, v);
    });
  }
  
  if (theme.typography) {
    Object.entries(theme.typography).forEach(([k, v]) => {
      root.style.setProperty(`--${k.replace(/_/g, '-')}`, v);
    });
  }
}

export function ThemeProvider({ children }) {
  useEffect(() => {
    loadTheme().then(applyTheme);
  }, []);

  return <>{children}</>;
}