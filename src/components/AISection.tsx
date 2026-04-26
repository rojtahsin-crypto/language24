import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { translations } from "../types";
import { Send, Bot, User, Loader2, Lock, Sparkles, CreditCard, Shield, Check, X, ChevronRight, AlertCircle, Clock } from "lucide-react";
import { formatExpiry } from "../auth";

const CLAUDE_API_KEY = "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";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AISectionProps {
  isPremium: boolean;
  premiumExpiry?: number;
  onSubscribe: (months: number) => void;
}

type PayStep = "plan" | "method" | "card";

export default function AISection({ isPremium, premiumExpiry, onSubscribe }: AISectionProps) {
  const { language, theme, account } = useApp();
  const t = translations[language];
  const isDark = theme === "dark";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [payStep, setPayStep] = useState<PayStep>("plan");
  const [selectedMonths, setSelectedMonths] = useState(1);
  const [payMethod, setPayMethod] = useState<"paypal" | "card" | null>(null);
  const [cardData, setCardData] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [processing, setProcessing] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const langName: Record<string, string> = {
    en: "English", nl: "Dutch", fr: "French", es: "Spanish", de: "German",
  };

  const systemPrompt = `You are a friendly, expert language teacher helping the user learn ${langName[language] || "English"}.
Always respond in ${langName[language] || "English"} to help the user practice.
Rules:
- Gently correct grammar mistakes and briefly explain why.
- Offer vocabulary tips with example sentences.
- Keep responses concise (max 3 paragraphs), engaging, and educational.
- Use 1-2 emojis per message to stay friendly.
- If the user asks in another language, answer in ${langName[language] || "English"} and note the switch.`;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isPremium && messages.length === 0) {
      const firstName = account?.displayName?.split(" ")[0] || "";
      const greetings: Record<string, string> = {
        en: `Hello${firstName ? " " + firstName : ""}! 👋 I'm your personal AI English tutor. I'm here to help you practice and improve your English. You can:\n\n• Ask grammar questions\n• Have a conversation with me\n• Request vocabulary explanations\n• Ask for sentence corrections\n\nWhat would you like to practice today? 😊`,
        nl: `Hallo${firstName ? " " + firstName : ""}! 👋 Ik ben je persoonlijke AI-taaldocent voor Nederlands. Ik help je graag met oefenen en verbeteren. Je kunt:\n\n• Grammaticavragen stellen\n• Een gesprek voeren\n• Woordenschat leren\n• Zinnen laten corrigeren\n\nWaar wil je vandaag mee beginnen? 😊`,
        fr: `Bonjour${firstName ? " " + firstName : ""}! 👋 Je suis votre tuteur IA personnel pour le français. Je suis là pour vous aider à pratiquer. Vous pouvez:\n\n• Poser des questions de grammaire\n• Avoir une conversation\n• Apprendre du vocabulaire\n• Faire corriger vos phrases\n\nQu'aimeriez-vous pratiquer aujourd'hui? 😊`,
        es: `¡Hola${firstName ? " " + firstName : ""}! 👋 Soy tu tutor de IA personal para español. Estoy aquí para ayudarte a practicar. Puedes:\n\n• Hacer preguntas de gramática\n• Mantener una conversación\n• Aprender vocabulario\n• Pedir correcciones de frases\n\n¿Qué quieres practicar hoy? 😊`,
        de: `Hallo${firstName ? " " + firstName : ""}! 👋 Ich bin dein persönlicher KI-Sprachtutor für Deutsch. Ich helfe dir beim Üben. Du kannst:\n\n• Grammatikfragen stellen\n• Ein Gespräch führen\n• Vokabeln lernen\n• Sätze korrigieren lassen\n\nWomit möchtest du heute beginnen? 😊`,
      };
      setMessages([{ role: "assistant", content: greetings[language] || greetings.en }]);
    }
  }, [isPremium, language]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setApiError("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-calls": "true",
        },
        body: JSON.stringify({
          model: "claude-3-5-haiku-20241022",
          max_tokens: 600,
          system: systemPrompt,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply = data.content?.[0]?.text;
      if (!reply) throw new Error("Empty response from AI");

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err: any) {
      setApiError(err.message || "Connection error. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // Card formatting
  const fmtCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExpiry = (v: string) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; };

  const handleCardPay = () => {
    if (!cardData.name || cardData.number.replace(/\s/g, "").length < 16 || cardData.expiry.length < 5 || cardData.cvv.length < 3) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaySuccess(true);
      onSubscribe(selectedMonths);
      setTimeout(() => {
        setPaySuccess(false);
        setShowPayment(false);
        setPayStep("plan");
        setPayMethod(null);
        setCardData({ name: "", number: "", expiry: "", cvv: "" });
      }, 2500);
    }, 2000);
  };

  const plans = [
    { months: 1, label: { nl: "1 Maand", en: "1 Month", fr: "1 Mois", es: "1 Mes", de: "1 Monat" }[language], price: "$3", per: { nl: "per maand", en: "per month", fr: "par mois", es: "por mes", de: "pro Monat" }[language], badge: null },
    { months: 3, label: { nl: "3 Maanden", en: "3 Months", fr: "3 Mois", es: "3 Meses", de: "3 Monate" }[language], price: "$8", per: { nl: "totaal", en: "total", fr: "total", es: "total", de: "gesamt" }[language], badge: { nl: "Bespaar 11%", en: "Save 11%", fr: "Économisez 11%", es: "Ahorra 11%", de: "11% sparen" }[language] },
    { months: 12, label: { nl: "1 Jaar", en: "1 Year", fr: "1 An", es: "1 Año", de: "1 Jahr" }[language], price: "$24", per: { nl: "totaal", en: "total", fr: "total", es: "total", de: "gesamt" }[language], badge: { nl: "Bespaar 33%", en: "Save 33%", fr: "Économisez 33%", es: "Ahorra 33%", de: "33% sparen" }[language] },
  ];

  // Payment success
  if (paySuccess) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/40 animate-bounce">
          <Check className="w-14 h-14 text-white" />
        </div>
        <h2 className={`text-3xl font-extrabold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
          {{ nl: "Betaling geslaagd! 🎉", en: "Payment successful! 🎉", fr: "Paiement réussi! 🎉", es: "¡Pago exitoso! 🎉", de: "Zahlung erfolgreich! 🎉" }[language]}
        </h2>
        <p className={`text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {{ nl: "Je AI-tutor is nu actief. Veel plezier met leren!", en: "Your AI tutor is now active. Enjoy learning!", fr: "Votre tuteur IA est maintenant actif. Bonne chance!", es: "¡Tu tutor IA ya está activo. ¡Disfruta aprendiendo!", de: "Dein KI-Tutor ist jetzt aktiv. Viel Spaß beim Lernen!" }[language]}
        </p>
      </div>
    );
  }

  // Payment modal
  if (showPayment) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className={`rounded-3xl overflow-hidden shadow-2xl ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"}`}>

          {/* Header */}
          <div className="relative px-6 py-7 text-center"
            style={{ background: "linear-gradient(135deg,#312e81,#4c1d95,#6d28d9)" }}
          >
            <button
              onClick={() => { setShowPayment(false); setPayStep("plan"); setPayMethod(null); }}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-14 h-14 bg-white/12 rounded-2xl border border-white/20 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-7 h-7 text-yellow-300" />
            </div>
            <h2 className="text-xl font-extrabold text-white">
              {{ nl: "AI Tutor Activeren", en: "Unlock AI Tutor", fr: "Activer IA Tuteur", es: "Activar IA Tutor", de: "KI-Tutor freischalten" }[language]}
            </h2>
            {/* Steps */}
            <div className="flex items-center justify-center gap-3 mt-4">
              {[
                { id: "plan", label: { nl: "Plan", en: "Plan", fr: "Plan", es: "Plan", de: "Plan" }[language] },
                { id: "method", label: { nl: "Betaalmethode", en: "Payment", fr: "Paiement", es: "Pago", de: "Zahlung" }[language] },
              ].map((step, i) => (
                <div key={step.id} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    (step.id === "plan" && payStep === "plan") || (step.id === "method" && (payStep === "method" || payStep === "card"))
                      ? "bg-white border-white text-purple-700"
                      : step.id === "plan" && payStep !== "plan"
                      ? "bg-green-400 border-green-400 text-white"
                      : "bg-transparent border-white/30 text-white/40"
                  }`}>
                    {step.id === "plan" && payStep !== "plan" ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs ${
                    (step.id === "plan" && payStep === "plan") || (step.id === "method" && (payStep === "method" || payStep === "card"))
                      ? "text-white font-semibold" : "text-white/40"
                  }`}>{step.label}</span>
                  {i === 0 && <ChevronRight className="w-3 h-3 text-white/30" />}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">

            {/* STEP 1 – Plan selection */}
            {payStep === "plan" && (
              <div className="space-y-3">
                <p className={`text-sm font-semibold mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {{ nl: "Kies je abonnement:", en: "Choose your plan:", fr: "Choisissez votre plan:", es: "Elige tu plan:", de: "Wähle deinen Plan:" }[language]}
                </p>
                {plans.map(plan => (
                  <button
                    key={plan.months}
                    onClick={() => setSelectedMonths(plan.months)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all ${
                      selectedMonths === plan.months
                        ? "border-indigo-500 bg-indigo-500/10"
                        : isDark ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedMonths === plan.months ? "border-indigo-500 bg-indigo-500" : isDark ? "border-gray-600" : "border-gray-300"
                      }`}>
                        {selectedMonths === plan.months && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <div className="text-left">
                        <p className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{plan.label}</p>
                        <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{plan.per}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {plan.badge && <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-semibold">{plan.badge}</span>}
                      <span className={`text-lg font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    </div>
                  </button>
                ))}

                <ul className={`space-y-2 mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {[
                    { nl: "Onbeperkte AI-gesprekken", en: "Unlimited AI conversations", fr: "Conversations IA illimitées", es: "Conversaciones IA ilimitadas", de: "Unbegrenzte KI-Gespräche" }[language],
                    { nl: "Oefenen in alle 5 talen", en: "Practice in all 5 languages", fr: "Pratiquer dans 5 langues", es: "Practicar en 5 idiomas", de: "Alle 5 Sprachen üben" }[language],
                    { nl: "Live grammaticacorrecties", en: "Live grammar corrections", fr: "Corrections grammaticales en direct", es: "Correcciones gramaticales en vivo", de: "Live-Grammatikkorrekturen" }[language],
                    { nl: "Altijd beschikbaar, 24/7", en: "Always available, 24/7", fr: "Toujours disponible, 24h/24", es: "Siempre disponible, 24/7", de: "Immer verfügbar, 24/7" }[language],
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setPayStep("method")}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 mt-2"
                >
                  <CreditCard className="w-4 h-4" />
                  {{ nl: "Doorgaan", en: "Continue", fr: "Continuer", es: "Continuar", de: "Weiter" }[language]}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2 – Method */}
            {payStep === "method" && (
              <div className="space-y-4">
                <p className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {{ nl: "Kies betaalmethode:", en: "Choose payment method:", fr: "Méthode de paiement:", es: "Método de pago:", de: "Zahlungsmethode:" }[language]}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {/* PayPal */}
                  <button
                    onClick={() => setPayMethod("paypal")}
                    className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all ${
                      payMethod === "paypal" ? "border-blue-500 bg-blue-500/10" : isDark ? "border-gray-700 hover:border-blue-500/50" : "border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    <svg viewBox="0 0 124 33" className="h-7 w-auto">
                      <path fill="#003087" d="M46.2 6.6H38c-.5 0-1 .4-1.1.9L34 24.7c-.1.4.2.8.6.8h3.9c.5 0 1-.4 1.1-.9l.8-5.2c.1-.5.6-.9 1.1-.9h2.5c5.1 0 8.1-2.5 8.8-7.4.3-2.1 0-3.8-1-4.9-1-.8-2.8-1.6-5.6-1.6z"/>
                      <path fill="#009cde" d="M98.2 6.6h-8.2c-.5 0-1 .4-1.1.9L86 24.7c-.1.4.2.8.6.8h4.1c.4 0 .7-.3.7-.6l.9-5.5c.1-.5.6-.9 1.1-.9h2.5c5.1 0 8.1-2.5 8.8-7.4.3-2.1 0-3.8-1-4.9-1-.8-2.8-1.6-5.5-1.6z"/>
                    </svg>
                    <span className={`text-xs font-bold ${isDark ? "text-gray-300" : "text-gray-700"}`}>PayPal</span>
                    <span className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"} text-center`}>Ook bankpas & creditcard</span>
                  </button>

                  {/* Credit Card */}
                  <button
                    onClick={() => { setPayMethod("card"); setPayStep("card"); }}
                    className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all ${
                      payMethod === "card" ? "border-indigo-500 bg-indigo-500/10" : isDark ? "border-gray-700 hover:border-indigo-500/50" : "border-gray-200 hover:border-indigo-400"
                    }`}
                  >
                    <CreditCard className="w-7 h-7 text-indigo-500" />
                    <span className={`text-xs font-bold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {{ nl: "Creditcard", en: "Credit Card", fr: "Carte bancaire", es: "Tarjeta", de: "Kreditkarte" }[language]}
                    </span>
                    <span className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"} text-center`}>Visa · Mastercard · Amex</span>
                  </button>
                </div>

                {/* PayPal pay button */}
                {payMethod === "paypal" && (
                  <div className="space-y-3">
                    <p className={`text-xs text-center ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      {{ nl: "Je wordt doorgestuurd naar PayPal. Ook creditcard betaling mogelijk via PayPal.", en: "You'll be redirected to PayPal. Credit card payment also accepted via PayPal.", fr: "Vous serez redirigé vers PayPal. Carte bancaire également acceptée.", es: "Serás redirigido a PayPal. También se aceptan tarjetas.", de: "Du wirst zu PayPal weitergeleitet. Kreditkarte auch akzeptiert." }[language]}
                    </p>
                    <a
                      href={`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick-subscriptions&business=lingualearn%40paypal.com&item_name=LinguaLearn+Premium+${selectedMonths}+${selectedMonths===1?"month":"months"}&a3=${selectedMonths===1?"3.00":selectedMonths===3?"8.00":"24.00"}&p3=${selectedMonths}&t3=M&src=1&sra=1&currency_code=USD&return=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        // Activate immediately after click (trust-based for demo)
                        setTimeout(() => {
                          onSubscribe(selectedMonths);
                          setPaySuccess(true);
                          setTimeout(() => {
                            setPaySuccess(false);
                            setShowPayment(false);
                            setPayStep("plan");
                            setPayMethod(null);
                          }, 2500);
                        }, 1000);
                      }}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white transition-all hover:opacity-90 hover:scale-[1.01]"
                      style={{ background: "linear-gradient(135deg,#003087,#0070ba)" }}
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/></svg>
                      {{ nl: `Betaal ${ plans.find(p=>p.months===selectedMonths)?.price } via PayPal`, en: `Pay ${ plans.find(p=>p.months===selectedMonths)?.price } with PayPal`, fr: `Payer ${ plans.find(p=>p.months===selectedMonths)?.price } via PayPal`, es: `Pagar ${ plans.find(p=>p.months===selectedMonths)?.price } con PayPal`, de: `${ plans.find(p=>p.months===selectedMonths)?.price } über PayPal bezahlen` }[language]}
                    </a>
                  </div>
                )}

                <button onClick={() => setPayStep("plan")} className={`w-full text-sm py-2 rounded-xl transition ${isDark ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600"}`}>
                  ← {{ nl:"Terug", en:"Back", fr:"Retour", es:"Volver", de:"Zurück" }[language]}
                </button>
              </div>
            )}

            {/* STEP 3 – Card form */}
            {payStep === "card" && (
              <div className="space-y-3">
                <p className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {{ nl: "Kaartgegevens:", en: "Card details:", fr: "Détails de la carte:", es: "Datos de tarjeta:", de: "Kartendaten:" }[language]}
                </p>

                {/* Card preview */}
                <div className="rounded-2xl p-5 h-40 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg,#1e3a8a,#4f46e5,#7c3aed)" }}
                >
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
                  <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/5 rounded-full" />
                  <div className="relative h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-7 bg-yellow-400/80 rounded-md" />
                      <span className="text-white/60 text-sm font-bold tracking-widest">VISA</span>
                    </div>
                    <div>
                      <p className="text-white font-mono text-lg tracking-widest mb-2">
                        {cardData.number || "•••• •••• •••• ••••"}
                      </p>
                      <div className="flex justify-between">
                        <p className="text-white/60 text-xs">{cardData.name || "NAAM KAARTHOUDER"}</p>
                        <p className="text-white/60 text-xs font-mono">{cardData.expiry || "MM/JJ"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <input type="text" placeholder={{ nl:"Naam op kaart", en:"Cardholder name", fr:"Nom sur la carte", es:"Nombre en la tarjeta", de:"Name auf der Karte" }[language]}
                  value={cardData.name} onChange={e => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-600" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"}`}
                />
                <input type="text" placeholder={{ nl:"Kaartnummer", en:"Card number", fr:"Numéro de carte", es:"Número de tarjeta", de:"Kartennummer" }[language]}
                  value={cardData.number} onChange={e => setCardData({ ...cardData, number: fmtCard(e.target.value) })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-600" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"}`}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM/JJ"
                    value={cardData.expiry} onChange={e => setCardData({ ...cardData, expiry: fmtExpiry(e.target.value) })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-600" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"}`}
                  />
                  <input type="text" placeholder="CVV"
                    value={cardData.cvv} onChange={e => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g,"").slice(0,4) })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-600" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"}`}
                  />
                </div>

                <button onClick={handleCardPay}
                  disabled={processing || !cardData.name || cardData.number.replace(/\s/g,"").length < 16 || cardData.expiry.length < 5 || cardData.cvv.length < 3}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processing ? <><Loader2 className="w-4 h-4 animate-spin" /> {{ nl:"Verwerken…", en:"Processing…", fr:"Traitement…", es:"Procesando…", de:"Verarbeitung…" }[language]}</> : <><Shield className="w-4 h-4" /> {{ nl:`Betaal ${ plans.find(p=>p.months===selectedMonths)?.price } veilig`, en:`Pay ${ plans.find(p=>p.months===selectedMonths)?.price } securely`, fr:`Payer ${ plans.find(p=>p.months===selectedMonths)?.price } sécurisé`, es:`Pagar ${ plans.find(p=>p.months===selectedMonths)?.price } seguro`, de:`${ plans.find(p=>p.months===selectedMonths)?.price } sicher bezahlen` }[language]}</>}
                </button>

                <div className="flex items-center justify-center gap-2">
                  {["VISA","MC","AMEX","DISC"].map(c => (
                    <span key={c} className={`text-xs px-2 py-1 rounded font-bold border ${isDark ? "border-gray-700 text-gray-600" : "border-gray-200 text-gray-400"}`}>{c}</span>
                  ))}
                </div>

                <button onClick={() => { setPayStep("method"); setPayMethod(null); }} className={`w-full text-sm py-2 rounded-xl transition ${isDark ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600"}`}>
                  ← {{ nl:"Terug", en:"Back", fr:"Retour", es:"Volver", de:"Zurück" }[language]}
                </button>
              </div>
            )}

            {/* Trust badges */}
            <div className={`flex items-center justify-center gap-2 mt-3 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
              <Shield className="w-3.5 h-3.5 text-green-500" />
              <p className="text-xs">
                {{ nl:"Veilige betaling · Geld gaat naar PayPal-wallet", en:"Secure payment · Money goes to PayPal wallet", fr:"Paiement sécurisé · Argent versé sur PayPal", es:"Pago seguro · Dinero va a PayPal", de:"Sichere Zahlung · Geld geht an PayPal-Konto" }[language]}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── LOCKED – not premium ───
  if (!isPremium) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="rounded-3xl overflow-hidden mb-6" style={{ background: "linear-gradient(145deg,#0f0c29,#302b63,#24243e)" }}>
          <div className="relative p-10 text-center">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-5 border border-white/15 shadow-2xl">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-3">{t.premiumRequired}</h2>
              <p className="text-purple-200 text-base max-w-sm mx-auto">{t.premiumDesc}</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className={`rounded-2xl p-6 mb-5 border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
          <h3 className={`font-bold mb-4 text-center ${isDark ? "text-white" : "text-gray-900"}`}>
            {{ nl:"Wat zit er in Premium?", en:"What's included in Premium?", fr:"Qu'est-ce qui est inclus?", es:"¿Qué incluye Premium?", de:"Was ist in Premium enthalten?" }[language]}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon:"🤖", t: { nl:"Persoonlijke AI-tutor", en:"Personal AI tutor", fr:"Tuteur IA personnel", es:"Tutor IA personal", de:"Persönlicher KI-Tutor" } },
              { icon:"💬", t: { nl:"Echte gesprekken oefenen", en:"Practice real conversations", fr:"Pratiquer de vraies conversations", es:"Practicar conversaciones reales", de:"Echte Gespräche üben" } },
              { icon:"✏️", t: { nl:"Live grammaticacorrecties", en:"Live grammar corrections", fr:"Corrections en temps réel", es:"Correcciones en vivo", de:"Live-Grammatikkorrekturen" } },
              { icon:"🌍", t: { nl:"Alle 5 talen inbegrepen", en:"All 5 languages included", fr:"5 langues incluses", es:"5 idiomas incluidos", de:"Alle 5 Sprachen inklusive" } },
              { icon:"⚡", t: { nl:"24/7 beschikbaar", en:"24/7 available", fr:"Disponible 24h/24", es:"Disponible 24/7", de:"24/7 verfügbar" } },
              { icon:"🎯", t: { nl:"Aangepast aan jouw niveau", en:"Adapted to your level", fr:"Adapté à votre niveau", es:"Adaptado a tu nivel", de:"Angepasst an dein Niveau" } },
            ].map((f, i) => (
              <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                <span className="text-xl">{f.icon}</span>
                <p className={`text-sm font-medium leading-tight ${isDark ? "text-gray-300" : "text-gray-700"}`}>{f.t[language]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`rounded-2xl p-6 text-center border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            {{ nl:"Vanaf slechts", en:"Starting from only", fr:"À partir de seulement", es:"Desde solo", de:"Ab nur" }[language]}
          </p>
          <div className="flex items-baseline justify-center gap-1 mb-4">
            <span className={`text-5xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>$3</span>
            <span className={`text-lg ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t.perMonth}</span>
          </div>

          <button
            onClick={() => setShowPayment(true)}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-indigo-500/25 text-base mb-4"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            {t.subscribe}
          </button>

          {/* Payment logos */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
              <span>PayPal</span>
            </div>
            {["Visa","Mastercard","Amex","iDEAL"].map(c => (
              <span key={c} className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${isDark ? "border-gray-700 text-gray-500" : "border-gray-200 text-gray-400"}`}>{c}</span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Shield className="w-3.5 h-3.5 text-green-500" />
            <p className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
              {{ nl:"Veilig betalen · Opzeggen wanneer je wil", en:"Secure payment · Cancel anytime", fr:"Paiement sécurisé · Annulez quand vous voulez", es:"Pago seguro · Cancela cuando quieras", de:"Sichere Zahlung · Jederzeit kündbar" }[language]}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── PREMIUM – Chat UI ───
  return (
    <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col" style={{ height: "calc(100vh - 80px)" }}>

      {/* Header bar */}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl mb-3 border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>AI {langName[language]} Tutor</h2>
            <span className="flex items-center gap-1 text-[10px] bg-green-500/12 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-bold">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />ONLINE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <p className={`text-xs truncate ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              {{ nl:"Actief tot", en:"Active until", fr:"Actif jusqu'au", es:"Activo hasta", de:"Aktiv bis" }[language]}
              {" "}{premiumExpiry ? formatExpiry(premiumExpiry) : "—"}
            </p>
            <Clock className="w-3 h-3 text-gray-500 shrink-0" />
          </div>
        </div>
        <span className="shrink-0 text-[10px] bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 px-2.5 py-1 rounded-full font-bold">⭐ PREMIUM</span>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto rounded-2xl p-4 space-y-4 mb-3 ${isDark ? "bg-gray-900/80 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        {messages.length === 0 && !loading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Bot className={`w-12 h-12 mx-auto mb-3 ${isDark ? "text-gray-700" : "text-gray-300"}`} />
              <p className={`text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                {{ nl:"Laden…", en:"Loading…", fr:"Chargement…", es:"Cargando…", de:"Laden…" }[language]}
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-md">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-sm shadow-md"
                : isDark
                  ? "bg-gray-800 text-gray-100 rounded-bl-sm border border-gray-700/50"
                  : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
            }`}>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0 mt-1 overflow-hidden shadow-md">
                {account?.photoURL
                  ? <img src={account.photoURL} alt="" className="w-full h-full object-cover" />
                  : <User className="w-4 h-4 text-white" />
                }
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0 shadow-md">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className={`px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2 ${isDark ? "bg-gray-800 border border-gray-700/50" : "bg-white border border-gray-100 shadow-sm"}`}>
              <div className="flex gap-1">
                {[0,1,2].map(d => (
                  <div key={d} className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: `${d*0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {apiError && (
          <div className={`flex items-start gap-2 mx-auto text-sm px-4 py-3 rounded-xl border max-w-sm ${isDark ? "bg-red-900/20 border-red-800/40 text-red-400" : "bg-red-50 border-red-200 text-red-600"}`}>
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{apiError}</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className={`flex gap-3 p-3 rounded-2xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={{ nl:"Typ je bericht…", en:"Type your message…", fr:"Tapez votre message…", es:"Escribe tu mensaje…", de:"Schreib deine Nachricht…" }[language]}
          rows={1}
          className={`flex-1 resize-none text-sm focus:outline-none bg-transparent leading-relaxed ${isDark ? "text-white placeholder-gray-600" : "text-gray-900 placeholder-gray-400"}`}
          style={{ maxHeight: "120px" }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all hover:scale-105 shrink-0 self-end shadow-md"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
      <p className={`text-center text-xs mt-2 ${isDark ? "text-gray-700" : "text-gray-400"}`}>
        Enter ↵ {{ nl:"versturen", en:"to send", fr:"envoyer", es:"enviar", de:"senden" }[language]} · Shift+Enter {{ nl:"nieuwe regel", en:"new line", fr:"nouvelle ligne", es:"nueva línea", de:"neue Zeile" }[language]}
      </p>
    </div>
  );
}
