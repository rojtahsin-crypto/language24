export type Language = "en" | "nl" | "fr" | "es" | "de";
export type Section = "grammar" | "toets" | "oefening" | "ai";
export type Theme = "dark" | "light";

export interface Translation {
  chooseLanguage: string;
  grammar: string;
  toets: string;
  oefening: string;
  aiSpeak: string;
  aiSubtitle: string;
  premiumRequired: string;
  premiumDesc: string;
  subscribe: string;
  perMonth: string;
  logout: string;
  welcome: string;
  darkMode: string;
  lightMode: string;
  loginTitle: string;
  loginSubtitle: string;
  emailLabel: string;
  passwordLabel: string;
  loginBtn: string;
  registerBtn: string;
  orContinueWith: string;
  googleLogin: string;
  noAccount: string;
  hasAccount: string;
  nameLabel: string;
  startLearning: string;
  tryAI: string;
  aiTagline: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    chooseLanguage: "Choose a Language",
    grammar: "Grammar",
    toets: "Test",
    oefening: "Exercise",
    aiSpeak: "AI Tutor",
    aiSubtitle: "Chat with your personal AI language tutor",
    premiumRequired: "Premium Required",
    premiumDesc: "Unlock unlimited AI conversations for only $3/month. Pay with PayPal or credit card.",
    subscribe: "Unlock Premium",
    perMonth: "/month",
    logout: "Logout",
    welcome: "Welcome",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    loginTitle: "Welcome back",
    loginSubtitle: "Sign in to continue learning",
    emailLabel: "Email address",
    passwordLabel: "Password",
    loginBtn: "Sign In",
    registerBtn: "Create Account",
    orContinueWith: "or continue with",
    googleLogin: "Continue with Google",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    nameLabel: "Full Name",
    startLearning: "Start Learning",
    tryAI: "Try AI Tutor",
    aiTagline: "Practice conversations with AI",
  },
  nl: {
    chooseLanguage: "Kies een Taal",
    grammar: "Grammatica",
    toets: "Toets",
    oefening: "Oefening",
    aiSpeak: "AI Tutor",
    aiSubtitle: "Chat met je persoonlijke AI-taaldocent",
    premiumRequired: "Premium Vereist",
    premiumDesc: "Ontgrendel onbeperkte AI-gesprekken voor slechts $3/maand. Betaal met PayPal of creditcard.",
    subscribe: "Premium Activeren",
    perMonth: "/maand",
    logout: "Uitloggen",
    welcome: "Welkom",
    darkMode: "Donkere Modus",
    lightMode: "Lichte Modus",
    loginTitle: "Welkom terug",
    loginSubtitle: "Log in om verder te leren",
    emailLabel: "E-mailadres",
    passwordLabel: "Wachtwoord",
    loginBtn: "Inloggen",
    registerBtn: "Account Aanmaken",
    orContinueWith: "of ga verder met",
    googleLogin: "Doorgaan met Google",
    noAccount: "Nog geen account?",
    hasAccount: "Al een account?",
    nameLabel: "Volledige Naam",
    startLearning: "Begin te Leren",
    tryAI: "Probeer AI Tutor",
    aiTagline: "Oefen gesprekken met AI",
  },
  fr: {
    chooseLanguage: "Choisir une Langue",
    grammar: "Grammaire",
    toets: "Test",
    oefening: "Exercice",
    aiSpeak: "IA Tuteur",
    aiSubtitle: "Discutez avec votre tuteur IA personnel",
    premiumRequired: "Premium Requis",
    premiumDesc: "Débloquez des conversations IA illimitées pour seulement 3$/mois.",
    subscribe: "Activer Premium",
    perMonth: "/mois",
    logout: "Déconnexion",
    welcome: "Bienvenue",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    loginTitle: "Bon retour",
    loginSubtitle: "Connectez-vous pour continuer",
    emailLabel: "Adresse e-mail",
    passwordLabel: "Mot de passe",
    loginBtn: "Se Connecter",
    registerBtn: "Créer un Compte",
    orContinueWith: "ou continuer avec",
    googleLogin: "Continuer avec Google",
    noAccount: "Pas encore de compte?",
    hasAccount: "Déjà un compte?",
    nameLabel: "Nom Complet",
    startLearning: "Commencer",
    tryAI: "Essayer l'IA",
    aiTagline: "Pratiquez avec l'IA",
  },
  es: {
    chooseLanguage: "Elegir un Idioma",
    grammar: "Gramática",
    toets: "Prueba",
    oefening: "Ejercicio",
    aiSpeak: "IA Tutor",
    aiSubtitle: "Habla con tu tutor de IA personal",
    premiumRequired: "Se Requiere Premium",
    premiumDesc: "Desbloquea conversaciones IA ilimitadas por solo $3/mes.",
    subscribe: "Activar Premium",
    perMonth: "/mes",
    logout: "Cerrar Sesión",
    welcome: "Bienvenido",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    loginTitle: "Bienvenido de nuevo",
    loginSubtitle: "Inicia sesión para continuar",
    emailLabel: "Correo electrónico",
    passwordLabel: "Contraseña",
    loginBtn: "Iniciar Sesión",
    registerBtn: "Crear Cuenta",
    orContinueWith: "o continuar con",
    googleLogin: "Continuar con Google",
    noAccount: "¿No tienes cuenta?",
    hasAccount: "¿Ya tienes cuenta?",
    nameLabel: "Nombre Completo",
    startLearning: "Empezar",
    tryAI: "Probar IA",
    aiTagline: "Practica conversaciones con IA",
  },
  de: {
    chooseLanguage: "Sprache wählen",
    grammar: "Grammatik",
    toets: "Test",
    oefening: "Übung",
    aiSpeak: "KI-Tutor",
    aiSubtitle: "Chatte mit deinem persönlichen KI-Sprachtutor",
    premiumRequired: "Premium Erforderlich",
    premiumDesc: "Schalte unbegrenzte KI-Gespräche für nur 3$/Monat frei.",
    subscribe: "Premium Aktivieren",
    perMonth: "/Monat",
    logout: "Abmelden",
    welcome: "Willkommen",
    darkMode: "Dunkelmodus",
    lightMode: "Hellmodus",
    loginTitle: "Willkommen zurück",
    loginSubtitle: "Melde dich an, um weiterzulernen",
    emailLabel: "E-Mail-Adresse",
    passwordLabel: "Passwort",
    loginBtn: "Anmelden",
    registerBtn: "Konto erstellen",
    orContinueWith: "oder weiter mit",
    googleLogin: "Mit Google fortfahren",
    noAccount: "Noch kein Konto?",
    hasAccount: "Bereits ein Konto?",
    nameLabel: "Vollständiger Name",
    startLearning: "Lernen starten",
    tryAI: "KI ausprobieren",
    aiTagline: "Gespräche mit KI üben",
  },
};
