import React, { createContext, useContext, useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const ContentContext = createContext();

let contentCache = null;
let cacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000;

async function loadContent() {
  if (contentCache && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
    return contentCache;
  }
  
  try {
    const contents = await base44.entities.Content.filter({ is_active: true });
    contentCache = {};
    contents.forEach(c => { contentCache[c.key] = c; });
    cacheTime = Date.now();
    return contentCache;
  } catch (error) {
    console.error("Content load error:", error);
    return {};
  }
}

function replaceVars(text, vars) {
  if (!text || !vars) return text;
  return text.replace(/\{\{(\w+)\}\}/g, (m, k) => vars[k] || m);
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState({});
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    loadContent().then(setContent);
  }, []);

  const t = (key, vars) => {
    const item = content[key];
    if (!item?.translations?.[language]) {
      console.warn(`Missing: ${key} (${language})`);
      return key;
    }
    return replaceVars(item.translations[language], vars);
  };

  return (
    <ContentContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}