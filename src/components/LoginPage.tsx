import { useState } from "react";
import { useApp } from "../context/AppContext";
import { translations, Language } from "../types";
import { registerWithEmail, loginWithEmail, loginWithGoogle } from "../auth";
import { Mail, Lock, User, Sun, Moon, Eye, EyeOff, ArrowRight, BookOpen, Sparkles, Globe, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { language, setLanguage, theme, toggleTheme, setAccount } = useApp();
  const t = translations[language];
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const isDark = theme === "dark";

  const langOptions: { code: Language; flag: string }[] = [
    { code: "nl", flag: "🇳🇱" },
    { code: "en", flag: "🇬🇧" },
    { code: "fr", flag: "🇫🇷" },
    { code: "es", flag: "🇪🇸" },
    { code: "de", flag: "🇩🇪" },
  ];

  const getErrorMessage = (code: string) => {
    const map: Record<string, Record<Language, string>> = {
      EMAIL_EXISTS: { nl: "Dit e-mailadres is al in gebruik.", en: "This email is already registered.", fr: "Cet e-mail est déjà utilisé.", es: "Este correo ya está registrado.", de: "Diese E-Mail ist bereits registriert." },
      USER_NOT_FOUND: { nl: "Geen account gevonden met dit e-mailadres.", en: "No account found with this email.", fr: "Aucun compte trouvé avec cet e-mail.", es: "No se encontró una cuenta con este correo.", de: "Kein Konto mit dieser E-Mail gefunden." },
      WRONG_PASSWORD: { nl: "Onjuist wachtwoord. Probeer opnieuw.", en: "Incorrect password. Please try again.", fr: "Mot de passe incorrect. Réessayez.", es: "Contraseña incorrecta. Inténtalo de nuevo.", de: "Falsches Passwort. Bitte erneut versuchen." },
      WEAK_PASSWORD: { nl: "Wachtwoord moet minimaal 6 tekens hebben.", en: "Password must be at least 6 characters.", fr: "Le mot de passe doit avoir au moins 6 caractères.", es: "La contraseña debe tener al menos 6 caracteres.", de: "Das Passwort muss mindestens 6 Zeichen haben." },
      EMPTY: { nl: "Vul alle velden in.", en: "Please fill in all fields.", fr: "Veuillez remplir tous les champs.", es: "Por favor completa todos los campos.", de: "Bitte alle Felder ausfüllen." },
      NAME_EMPTY: { nl: "Vul je naam in.", en: "Please enter your name.", fr: "Veuillez entrer votre nom.", es: "Por favor ingresa tu nombre.", de: "Bitte gib deinen Namen ein." },
    };
    return map[code]?.[language] || code;
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) { setError(getErrorMessage("EMPTY")); return; }
    if (isRegister && !name.trim()) { setError(getErrorMessage("NAME_EMPTY")); return; }

    setLoading(true);
    setTimeout(() => {
      try {
        let acc;
        if (isRegister) {
          acc = registerWithEmail(email.trim(), password, name.trim());
        } else {
          acc = loginWithEmail(email.trim(), password);
        }
        setAccount(acc);
      } catch (err: any) {
        setError(getErrorMessage(err.message));
        setLoading(false);
      }
    }, 600);
  };

  const handleGoogle = () => {
    setGoogleLoading(true);
    setError("");
    // Simulate Google OAuth with a demo Google account
    setTimeout(() => {
      try {
        const acc = loginWithGoogle(
          "demo.google@gmail.com",
          "Google Gebruiker",
          "https://ui-avatars.com/api/?name=G&background=4285F4&color=fff&bold=true&size=128"
        );
        setAccount(acc);
      } catch (err: any) {
        setError(getErrorMessage(err.message));
        setGoogleLoading(false);
      }
    }, 800);
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    setError("");
    setEmail("");
    setPassword("");
    setName("");
  };

  const features = [
    { emoji: "📚", label: { nl: "5 grammaticalessen", en: "5 grammar lessons", fr: "5 leçons de grammaire", es: "5 lecciones de gramática", de: "5 Grammatiklektionen" }[language] },
    { emoji: "📝", label: { nl: "Toetsen & oefeningen", en: "Tests & exercises", fr: "Tests & exercices", es: "Tests y ejercicios", de: "Tests & Übungen" }[language] },
    { emoji: "🤖", label: { nl: "AI-taaldocent (PRO)", en: "AI language tutor (PRO)", fr: "Tuteur IA (PRO)", es: "Tutor IA (PRO)", de: "KI-Sprachtutor (PRO)" }[language] },
    { emoji: "🌍", label: { nl: "5 talen beschikbaar", en: "5 languages available", fr: "5 langues disponibles", es: "5 idiomas disponibles", de: "5 Sprachen verfügbar" }[language] },
  ];

  return (
    <div className={`min-h-screen flex ${isDark ? "bg-gray-950" : "bg-slate-50"}`}>

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col justify-between w-[46%] relative overflow-hidden p-12"
        style={{ background: "linear-gradient(145deg,#0f0c29 0%,#302b63 45%,#24243e 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-80px] right-[-80px] w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/15 shadow-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-extrabold text-xl leading-none">LinguaLearn</p>
              <p className="text-indigo-300 text-xs mt-0.5">Language Learning Platform</p>
            </div>
          </div>
        </div>

        {/* Main text */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-5xl font-black text-white leading-tight">
              Leer talen<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                sneller & slimmer
              </span>
            </h2>
            <p className="text-indigo-200/80 text-base mt-4 leading-relaxed">
              Interactieve lessen, AI-gesprekken en echte oefeningen — alles op één plek.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur border border-white/8 rounded-2xl px-4 py-3.5 hover:bg-white/10 transition">
                <span className="text-xl">{f.emoji}</span>
                <span className="text-sm text-white/75 font-medium leading-tight">{f.label}</span>
              </div>
            ))}
          </div>

          {/* Flags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-indigo-400/70 text-xs font-medium">Beschikbaar in:</span>
            {["🇳🇱", "🇬🇧", "🇫🇷", "🇪🇸", "🇩🇪"].map((f, i) => (
              <span key={i} className="text-2xl cursor-default select-none hover:scale-110 transition-transform">{f}</span>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-10 border-l-2 border-indigo-500/40 pl-4">
          <div className="flex mb-2">
            {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-sm">★</span>)}
          </div>
          <p className="text-indigo-200/70 text-sm italic leading-relaxed">
            "The limits of my language mean the limits of my world."
          </p>
          <p className="text-indigo-400/50 text-xs mt-2">— Ludwig Wittgenstein</p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={`flex-1 flex flex-col ${isDark ? "bg-gray-950" : "bg-slate-50"}`}>

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">LinguaLearn</span>
          </div>
          <div className="lg:hidden flex-1" />

          <div className="flex items-center gap-2">
            {/* Language flags */}
            <div className={`flex items-center gap-0.5 p-1 rounded-xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <Globe className={`w-3.5 h-3.5 ml-1.5 mr-1 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
              {langOptions.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  title={l.code.toUpperCase()}
                  className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all ${
                    language === l.code
                      ? "bg-indigo-600 shadow-sm scale-105"
                      : isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  {l.flag}
                </button>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition border ${
                isDark ? "bg-gray-900 border-gray-800 text-yellow-400 hover:bg-gray-800" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-6">
          <div className="w-full max-w-[400px]">

            {/* Header */}
            <div className="mb-7">
              <h1 className={`text-3xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                {isRegister
                  ? ({ nl: "Account aanmaken", en: "Create account", fr: "Créer un compte", es: "Crear cuenta", de: "Konto erstellen" }[language])
                  : t.loginTitle}
              </h1>
              <p className={`text-sm mt-1.5 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                {t.loginSubtitle}
              </p>
            </div>

            {/* Google */}
            <button
              onClick={handleGoogle}
              disabled={loading || googleLoading}
              className={`w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border-2 font-semibold text-sm mb-5 transition-all duration-200 hover:scale-[1.015] active:scale-[0.985] disabled:opacity-60 disabled:cursor-not-allowed ${
                isDark
                  ? "bg-gray-900 border-gray-700 text-white hover:border-indigo-500/70 hover:bg-gray-800"
                  : "bg-white border-gray-200 text-gray-800 hover:border-indigo-400 hover:shadow-lg"
              }`}
            >
              {googleLoading ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-indigo-500 rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {t.googleLogin}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className={`flex-1 h-px ${isDark ? "bg-gray-800" : "bg-gray-200"}`} />
              <span className={`text-xs font-medium px-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>{t.orContinueWith}</span>
              <div className={`flex-1 h-px ${isDark ? "bg-gray-800" : "bg-gray-200"}`} />
            </div>

            {/* Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3">
              {isRegister && (
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
                  <input
                    type="text"
                    placeholder={t.nameLabel}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete="name"
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                      isDark ? "bg-gray-900 border-gray-800 text-white placeholder-gray-600 focus:border-indigo-600" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-400"
                    }`}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
                <input
                  type="email"
                  placeholder={t.emailLabel}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                    isDark ? "bg-gray-900 border-gray-800 text-white placeholder-gray-600 focus:border-indigo-600" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-400"
                  }`}
                />
              </div>

              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder={t.passwordLabel}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  className={`w-full pl-11 pr-12 py-3.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                    isDark ? "bg-gray-900 border-gray-800 text-white placeholder-gray-600 focus:border-indigo-600" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  tabIndex={-1}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition ${isDark ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600"}`}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className={`flex items-start gap-2.5 px-4 py-3 rounded-xl border ${isDark ? "bg-red-900/20 border-red-800/40 text-red-400" : "bg-red-50 border-red-200 text-red-600"}`}>
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all duration-200 hover:scale-[1.015] active:scale-[0.985] shadow-lg shadow-indigo-500/20 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isRegister ? t.registerBtn : t.loginBtn}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Switch */}
            <p className={`text-center text-sm mt-5 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
              {isRegister ? t.hasAccount : t.noAccount}{" "}
              <button
                onClick={switchMode}
                className="font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition"
              >
                {isRegister ? t.loginBtn : t.registerBtn}
              </button>
            </p>

            {/* Footer */}
            <div className={`mt-6 flex items-center justify-center gap-2 ${isDark ? "text-gray-700" : "text-gray-400"}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <p className="text-xs">
                {language === "nl" ? "Gratis: grammatica, toetsen & oefeningen" :
                 language === "de" ? "Kostenlos: Grammatik, Tests & Übungen" :
                 language === "fr" ? "Gratuit: grammaire, tests & exercices" :
                 language === "es" ? "Gratis: gramática, tests y ejercicios" :
                 "Free: grammar, tests & exercises"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
