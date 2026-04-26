import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, Theme } from "../types";
import { Account, getCurrentSession, checkPremiumExpiry } from "../auth";

interface AppContextType {
  language: Language;
  setLanguage: (l: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  account: Account | null;
  setAccount: (a: Account | null) => void;
  refreshAccount: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("lingua_lang") as Language) || "nl";
  });
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("lingua_theme") as Theme) || "dark";
  });
  const [account, setAccount] = useState<Account | null>(() => {
    const session = getCurrentSession();
    if (session) {
      try {
        return checkPremiumExpiry(session.uid);
      } catch {
        return session;
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem("lingua_lang", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("lingua_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const refreshAccount = () => {
    if (account) {
      try {
        const updated = checkPremiumExpiry(account.uid);
        setAccount(updated);
      } catch {}
    }
  };

  // Initial dark mode
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, toggleTheme, account, setAccount, refreshAccount }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
};
