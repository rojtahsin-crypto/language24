import { useState } from "react";
import { useApp } from "../context/AppContext";
import { quizData } from "../data/quizData";
import { CheckCircle, XCircle, RefreshCw, Trophy, ChevronRight } from "lucide-react";

export default function ToetsSection() {
  const { language, theme } = useApp();
  const questions = quizData[language];
  const isDark = theme === "dark";

  const [currentQ, setCurrentQ] = useState(0);
  const [, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const langLabels: Record<string, string> = {
    en: "English Test", nl: "Nederlandse Toets",
    fr: "Test de Français", es: "Prueba de Español",
  };

  const question = questions[currentQ];
  const userAnswer = answers[currentQ];

  const handleSelect = (idx: number) => {
    if (userAnswer !== null) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
    setSelected(idx);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(answers[currentQ + 1]);
      setShowResult(answers[currentQ + 1] !== null);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setSelected(answers[currentQ - 1]);
      setShowResult(answers[currentQ - 1] !== null);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswers(new Array(questions.length).fill(null));
    setShowResult(false);
    setFinished(false);
  };

  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const pct = Math.round((score / questions.length) * 100);

  if (finished) {
    const grade = pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📖";
    const msgMap: Record<string, Record<string, string>> = {
      great: { en: "Excellent!", nl: "Uitstekend!", fr: "Excellent!", es: "¡Excelente!", de: "Ausgezeichnet!" },
      good: { en: "Good job!", nl: "Goed gedaan!", fr: "Bien joué!", es: "¡Buen trabajo!", de: "Gut gemacht!" },
      keep: { en: "Keep practicing!", nl: "Blijf oefenen!", fr: "Continuez à pratiquer!", es: "¡Sigue practicando!", de: "Weiter üben!" },
    };
    const msg = pct >= 80 ? msgMap.great[language] : pct >= 60 ? msgMap.good[language] : msgMap.keep[language];

    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className={`rounded-3xl p-10 ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-lg"}`}>
          <div className="text-6xl mb-4">{grade}</div>
          <h2 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{msg}</h2>
          <p className={`text-lg mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {score}/{questions.length} correct ({pct}%)
          </p>

          {/* Score circle */}
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke={isDark ? "#1f2937" : "#e5e7eb"} strokeWidth="10" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke={pct >= 80 ? "#22c55e" : pct >= 60 ? "#f59e0b" : "#ef4444"}
                strokeWidth="10"
                strokeDasharray={`${(pct / 100) * 251.2} 251.2`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{pct}%</span>
            </div>
          </div>

          {/* Answer review */}
          <div className="space-y-2 mb-8 text-left">
            {questions.map((q, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${
                answers[i] === q.correct
                  ? isDark ? "bg-green-900/20" : "bg-green-50"
                  : isDark ? "bg-red-900/20" : "bg-red-50"
              }`}>
                {answers[i] === q.correct
                  ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  : <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                }
                <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Q{i + 1}: {q.question.slice(0, 50)}...
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          📝 {langLabels[language]}
        </h2>
        <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Question {currentQ + 1} of {questions.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className={`h-2 rounded-full mb-8 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className={`rounded-2xl p-6 mb-6 ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"}`}>
        {/* Question */}
        <div className="flex items-start gap-3 mb-6">
          <Trophy className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
          <h3 className={`text-lg font-semibold leading-snug ${isDark ? "text-white" : "text-gray-900"}`}>
            {question.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            const isSelected = userAnswer === idx;
            const isCorrect = idx === question.correct;
            const showFeedback = userAnswer !== null;

            let btnClass = "";
            if (showFeedback) {
              if (isCorrect) btnClass = "border-green-500 bg-green-500/10 text-green-400";
              else if (isSelected && !isCorrect) btnClass = "border-red-500 bg-red-500/10 text-red-400";
              else btnClass = isDark ? "border-gray-700 text-gray-500" : "border-gray-200 text-gray-400";
            } else {
              btnClass = isDark
                ? "border-gray-700 text-gray-300 hover:border-indigo-500 hover:bg-indigo-900/20 hover:text-white"
                : "border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={userAnswer !== null}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl border-2 text-left transition-all font-medium text-sm ${btnClass}`}
              >
                <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                  showFeedback && isCorrect ? "border-green-500 bg-green-500 text-white"
                  : showFeedback && isSelected ? "border-red-500 bg-red-500 text-white"
                  : isDark ? "border-gray-600" : "border-gray-300"
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
                {showFeedback && isCorrect && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                {showFeedback && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 ml-auto" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`mt-5 p-4 rounded-xl ${
            userAnswer === question.correct
              ? isDark ? "bg-green-900/20 border border-green-800/40" : "bg-green-50 border border-green-200"
              : isDark ? "bg-red-900/20 border border-red-800/40" : "bg-red-50 border border-red-200"
          }`}>
            <p className={`text-sm font-medium mb-1 ${userAnswer === question.correct ? "text-green-400" : "text-red-400"}`}>
              {userAnswer === question.correct ? "✓ Correct!" : "✗ Incorrect"}
            </p>
            <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentQ === 0}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition disabled:opacity-40 ${
            isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          ← Previous
        </button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentQ ? "bg-indigo-600 w-4"
                : answers[i] !== null
                  ? answers[i] === questions[i].correct ? "bg-green-500" : "bg-red-500"
                  : isDark ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={userAnswer === null}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition disabled:opacity-40 ${
            currentQ === questions.length - 1
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {currentQ === questions.length - 1 ? "Finish 🏁" : "Next"}
          {currentQ < questions.length - 1 && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
