import { useState } from "react";
import { useApp } from "../context/AppContext";
import { translations, Language } from "../types";
import { Globe2, ChevronRight, Bot, Sparkles, BookOpen, ClipboardList, PenLine, Zap } from "lucide-react";

interface DashboardProps {
  onSelectLanguage: (lang: Language) => void;
  onGoToAI: () => void;
}

export default function Dashboard({ onSelectLanguage, onGoToAI }: DashboardProps) {
  const { language, theme, account } = useApp();
  const t = translations[language];
  const isDark = theme === "dark";
  const [hovered, setHovered] = useState<string | null>(null);

  const languages = [
    { code: "en" as Language, name: "English", native: "English", flag: "🇬🇧", speakers: "1.5B speakers", grad: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/20" },
    { code: "nl" as Language, name: "Nederlands", native: "Dutch", flag: "🇳🇱", speakers: "24M speakers", grad: "from-orange-400 to-red-500", shadow: "shadow-orange-500/20" },
    { code: "fr" as Language, name: "Français", native: "French", flag: "🇫🇷", speakers: "280M speakers", grad: "from-red-400 to-pink-600", shadow: "shadow-red-500/20" },
    { code: "es" as Language, name: "Español", native: "Spanish", flag: "🇪🇸", speakers: "500M speakers", grad: "from-yellow-400 to-red-500", shadow: "shadow-yellow-500/20" },
    { code: "de" as Language, name: "Deutsch", native: "German", flag: "🇩🇪", speakers: "130M speakers", grad: "from-zinc-600 to-yellow-600", shadow: "shadow-yellow-600/20" },
  ];

  const greet = () => {
    const h = new Date().getHours();
    const idx = h < 12 ? 0 : h < 18 ? 1 : 2;
    return { en: ["Good morning","Good afternoon","Good evening"], nl: ["Goedemorgen","Goedemiddag","Goedenavond"], fr: ["Bonjour","Bonjour","Bonsoir"], es: ["Buenos días","Buenas tardes","Buenas noches"], de: ["Guten Morgen","Guten Tag","Guten Abend"] }[language][idx];
  };

  const featureLabel = (key: "grammar" | "test" | "exercise") => {
    return { grammar: { en:"Grammar", nl:"Grammatica", fr:"Grammaire", es:"Gramática", de:"Grammatik" }, test: { en:"Test", nl:"Toets", fr:"Test", es:"Prueba", de:"Test" }, exercise: { en:"Exercise", nl:"Oefening", fr:"Exercice", es:"Ejercicio", de:"Übung" } }[key][language];
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Greeting */}
      <div className="mb-10">
        <p className={`text-sm font-semibold mb-1 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
          {greet()}, {account?.displayName?.split(" ")[0] || "there"} 👋
        </p>
        <h1 className={`text-4xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>{t.chooseLanguage}</h1>
        <p className={`mt-2 text-base ${isDark ? "text-gray-500" : "text-gray-500"}`}>
          {{ en:"Select a language and start learning right away", nl:"Selecteer een taal en begin direct met leren", fr:"Sélectionnez une langue et commencez", es:"Selecciona un idioma y empieza", de:"Wähle eine Sprache und fang an" }[language]}
        </p>
      </div>

      {/* AI Banner – prominent at top */}
      <div
        onClick={onGoToAI}
        className="relative mb-10 cursor-pointer rounded-3xl overflow-hidden group transition-all hover:scale-[1.012] active:scale-[0.99] select-none"
        style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 35%, #4c1d95 65%, #6d28d9 100%)" }}
      >
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex items-center justify-between px-7 py-6 gap-4">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition shadow-xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-extrabold text-lg">{t.aiSpeak}</span>
                {account?.isPremium
                  ? <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">PRO ✓ ACTIEF</span>
                  : <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">PRO</span>
                }
              </div>
              <p className="text-purple-200 text-sm">{t.aiSubtitle}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                {["💬 Gesprekken", "✏️ Correcties", "🌍 Alle 5 talen"].map((f, i) => (
                  <span key={i} className="text-xs text-purple-300 font-medium">{f}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2 bg-white/12 backdrop-blur border border-white/20 rounded-2xl px-4 py-2.5 group-hover:bg-white/20 transition">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white font-bold text-sm">{account?.isPremium ? "Open AI" : t.tryAI}</span>
              <ChevronRight className="w-4 h-4 text-white/60 group-hover:translate-x-0.5 transition-transform" />
            </div>
            {!account?.isPremium && (
              <span className="text-purple-300 text-xs">$3{t.perMonth} · PayPal & Creditcard</span>
            )}
          </div>
        </div>
      </div>

      {/* Language cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => onSelectLanguage(lang.code)}
            onMouseEnter={() => setHovered(lang.code)}
            onMouseLeave={() => setHovered(null)}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 group ${
              isDark
                ? "bg-gray-900/80 border-gray-800 hover:border-indigo-600/50 hover:bg-gray-800/70"
                : "bg-white border-gray-200 hover:border-indigo-400/60 hover:shadow-xl"
            } hover:scale-[1.025] active:scale-[0.98]`}
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${lang.grad} flex items-center justify-center text-2xl shadow-lg ${lang.shadow} shrink-0`}>
              {lang.flag}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-base ${isDark ? "text-white" : "text-gray-900"}`}>{lang.name}</p>
              <p className={`text-xs mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{lang.native}</p>
              <p className={`text-xs mt-1.5 flex items-center gap-1 font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <Zap className="w-3 h-3 text-yellow-400" />{lang.speakers}
              </p>
            </div>
            <ChevronRight className={`w-5 h-5 shrink-0 transition-all ${hovered === lang.code ? "translate-x-0.5 opacity-80" : "opacity-25"} ${isDark ? "text-white" : "text-gray-600"}`} />
          </button>
        ))}
      </div>

      {/* What you get */}
      <div className={`rounded-2xl p-6 border ${isDark ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
        <div className="flex items-center gap-2 mb-4">
          <Globe2 className="w-5 h-5 text-indigo-500" />
          <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {{ en:"What do you get per language?", nl:"Wat krijg je per taal?", fr:"Qu'obtenez-vous?", es:"¿Qué obtienes?", de:"Was bekommst du?" }[language]}
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {([
            { icon: BookOpen, label: featureLabel("grammar"), color: "text-blue-400", bg: isDark ? "bg-blue-500/10" : "bg-blue-50" },
            { icon: ClipboardList, label: featureLabel("test"), color: "text-green-400", bg: isDark ? "bg-green-500/10" : "bg-green-50" },
            { icon: PenLine, label: featureLabel("exercise"), color: "text-purple-400", bg: isDark ? "bg-purple-500/10" : "bg-purple-50" },
          ] as const).map((f, i) => (
            <div key={i} className={`flex flex-col items-center gap-2 p-4 rounded-xl ${f.bg}`}>
              <f.icon className={`w-6 h-6 ${f.color}`} />
              <span className={`text-sm font-semibold text-center ${isDark ? "text-gray-300" : "text-gray-700"}`}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
