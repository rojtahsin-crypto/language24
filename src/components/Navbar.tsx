import { useState } from "react";
import { useApp } from "../context/AppContext";
import { translations, Language, Section } from "../types";
import { BookOpen, Globe, Moon, Sun, LogOut, ChevronDown, Menu, X, Home } from "lucide-react";

interface NavbarProps {
  activeSection: Section | null;
  setActiveSection: (s: Section | null) => void;
  onLogout: () => void;
  onHome: () => void;
}

export default function Navbar({ activeSection, setActiveSection, onLogout, onHome }: NavbarProps) {
  const { language, setLanguage, theme, toggleTheme, account } = useApp();
  const t = translations[language];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const isDark = theme === "dark";

  const langOptions: { code: Language; label: string; flag: string }[] = [
    { code: "nl", label: "Nederlands", flag: "🇳🇱" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
  ];
  const currentLang = langOptions.find(l => l.code === language)!;

  const sections: { id: Section; label: string; emoji: string }[] = [
    { id: "grammar", label: t.grammar, emoji: "📚" },
    { id: "toets", label: t.toets, emoji: "📝" },
    { id: "oefening", label: t.oefening, emoji: "✏️" },
    { id: "ai", label: t.aiSpeak, emoji: "🤖" },
  ];

  const navBg = isDark ? "bg-gray-950/95 border-gray-800/70" : "bg-white/95 border-gray-200";
  const btnActive = "bg-indigo-600 text-white shadow-md shadow-indigo-500/25";
  const btnIdle = isDark ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100";

  return (
    <nav className={`sticky top-0 z-50 border-b backdrop-blur-xl ${navBg}`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-2">

        {/* Logo */}
        <button onClick={onHome} className="flex items-center gap-2 shrink-0 group mr-1">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-base hidden sm:block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            LinguaLearn
          </span>
        </button>

        {/* Home shortcut */}
        <button
          onClick={onHome}
          title="Home"
          className={`hidden sm:flex p-2 rounded-lg transition-colors ${isDark ? "text-gray-600 hover:text-gray-300 hover:bg-gray-800" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
        >
          <Home className="w-4 h-4" />
        </button>

        {/* Section tabs */}
        <div className="hidden md:flex items-center gap-1 ml-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeSection === s.id ? btnActive : btnIdle
              }`}
            >
              <span>{s.emoji}</span>
              {s.label}
              {s.id === "ai" && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  account?.isPremium ? "bg-yellow-400 text-yellow-900" : "bg-gray-600 text-gray-300"
                }`}>
                  {account?.isPremium ? "PRO ✓" : "PRO"}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Right controls */}
        <div className="flex items-center gap-1.5">

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-all border ${
                isDark ? "bg-gray-900 border-gray-800 text-white hover:bg-gray-800" : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Globe className="w-3.5 h-3.5 opacity-60" />
              <span className="hidden sm:block">{currentLang.flag} {currentLang.label}</span>
              <span className="block sm:hidden">{currentLang.flag}</span>
              <ChevronDown className={`w-3 h-3 opacity-50 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className={`absolute right-0 top-full mt-2 w-44 rounded-2xl shadow-2xl border z-50 overflow-hidden ${
                  isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
                }`}>
                  {langOptions.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                        language === l.code
                          ? "bg-indigo-600 text-white"
                          : isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.label}</span>
                      {language === l.code && <span className="ml-auto text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border ${
              isDark ? "bg-gray-900 border-gray-800 text-yellow-400 hover:bg-gray-800" : "bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User + Logout */}
          {account && (
            <div className="hidden sm:flex items-center gap-1.5">
              <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"}`}>
                <div className="w-6 h-6 rounded-lg overflow-hidden flex items-center justify-center bg-indigo-600 text-white text-xs font-bold shrink-0">
                  {account.photoURL
                    ? <img src={account.photoURL} alt="" className="w-full h-full object-cover" />
                    : account.displayName[0]?.toUpperCase()
                  }
                </div>
                <span className={`text-xs font-medium max-w-[72px] truncate ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {account.displayName.split(" ")[0]}
                </span>
                {account.isPremium && <span className="text-yellow-400 text-xs">⭐</span>}
              </div>
              <button
                onClick={onLogout}
                title={t.logout}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border ${
                  isDark ? "bg-gray-900 border-gray-800 text-gray-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-800" : "bg-gray-100 border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200"
                }`}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all border ${
              isDark ? "bg-gray-900 border-gray-800 text-white" : "bg-gray-100 border-gray-200 text-gray-700"
            }`}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`md:hidden border-t px-4 py-3 space-y-1 ${isDark ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"}`}>
          <button
            onClick={() => { onHome(); setMobileOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${btnIdle}`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => { setActiveSection(s.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeSection === s.id ? btnActive : btnIdle
              }`}
            >
              <span>{s.emoji}</span>
              {s.label}
              {s.id === "ai" && !account?.isPremium && (
                <span className="ml-auto text-[10px] bg-yellow-400/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full font-bold">PRO</span>
              )}
            </button>
          ))}
          <div className={`my-2 h-px ${isDark ? "bg-gray-800" : "bg-gray-200"}`} />
          <button
            onClick={() => { onLogout(); setMobileOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {t.logout}
          </button>
        </div>
      )}
    </nav>
  );
}
