import { useState } from "react";
import { useApp } from "../context/AppContext";
import { exerciseData } from "../data/exerciseData";
import { CheckCircle, XCircle, RefreshCw, HelpCircle, ChevronRight } from "lucide-react";

export default function OefeningSection() {
  const { language, theme } = useApp();
  const exercises = exerciseData[language];
  const isDark = theme === "dark";

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);

  const exercise = exercises[currentIdx];
  const userAnswer = answers[currentIdx] || "";
  const isChecked = checked[currentIdx];

  const langLabels: Record<string, string> = {
    en: "English Exercises", nl: "Nederlandse Oefeningen",
    fr: "Exercices de Français", es: "Ejercicios de Español",
  };

  const handleCheck = () => {
    if (!userAnswer.trim()) return;
    setChecked({ ...checked, [currentIdx]: true });
  };

  const isCorrect = () => {
    const ua = userAnswer.trim().toLowerCase().replace(/[.,!?]/g, "");
    const ca = exercise.answer.trim().toLowerCase().replace(/[.,!?]/g, "");
    return ua === ca;
  };

  const handleNext = () => {
    if (currentIdx < exercises.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setAnswers({});
    setChecked({});
    setShowHints({});
    setFinished(false);
  };

  const score = exercises.filter((ex, i) => {
    const ua = (answers[i] || "").trim().toLowerCase().replace(/[.,!?]/g, "");
    const ca = ex.answer.trim().toLowerCase().replace(/[.,!?]/g, "");
    return checked[i] && ua === ca;
  }).length;

  if (finished) {
    const pct = Math.round((score / exercises.length) * 100);
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className={`rounded-3xl p-10 ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-lg"}`}>
          <div className="text-6xl mb-4">✏️</div>
          <h2 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            Exercises Complete!
          </h2>
          <p className={`text-lg mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {score}/{exercises.length} correct ({pct}%)
          </p>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
          >
            <RefreshCw className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const typeLabel: Record<string, string> = {
    fill: "Fill in the blank",
    translate: "Translation",
    order: "Word Order",
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          ✏️ {langLabels[language]}
        </h2>
        <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Exercise {currentIdx + 1} of {exercises.length}
        </p>
      </div>

      {/* Progress */}
      <div className={`h-2 rounded-full mb-8 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
        <div
          className="h-full rounded-full bg-purple-600 transition-all duration-500"
          style={{ width: `${((currentIdx + 1) / exercises.length) * 100}%` }}
        />
      </div>

      <div className={`rounded-2xl p-6 mb-6 ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"}`}>
        {/* Type badge */}
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
          exercise.type === "fill" ? "bg-blue-500/20 text-blue-400"
          : exercise.type === "translate" ? "bg-purple-500/20 text-purple-400"
          : "bg-orange-500/20 text-orange-400"
        }`}>
          {typeLabel[exercise.type]}
        </span>

        {/* Instruction */}
        <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {exercise.instruction}
        </p>

        {/* Question */}
        <p className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
          {exercise.question}
        </p>

        {/* Word bank for order exercises */}
        {exercise.type === "order" && exercise.words && (
          <div className="mb-4">
            <p className={`text-xs mb-2 font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              WORD BANK:
            </p>
            <div className="flex flex-wrap gap-2">
              {exercise.words.map((word, i) => (
                <span
                  key={i}
                  onClick={() => {
                    if (!isChecked) {
                      const current = answers[currentIdx] || "";
                      const words = current ? current + " " + word : word;
                      setAnswers({ ...answers, [currentIdx]: words });
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer select-none transition ${
                    isDark
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Fill-in options */}
        {exercise.type === "fill" && exercise.blanks && (
          <div className="mb-4 flex flex-wrap gap-2">
            {exercise.blanks.map((b, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isChecked) setAnswers({ ...answers, [currentIdx]: b });
                }}
                disabled={isChecked}
                className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition ${
                  answers[currentIdx] === b
                    ? isChecked
                      ? b === exercise.answer
                        ? "border-green-500 bg-green-500/20 text-green-400"
                        : "border-red-500 bg-red-500/20 text-red-400"
                      : "border-indigo-500 bg-indigo-500/20 text-indigo-400"
                    : isChecked && b === exercise.answer
                    ? "border-green-500 bg-green-500/10 text-green-400"
                    : isDark
                    ? "border-gray-700 text-gray-300 hover:border-indigo-500 hover:bg-indigo-900/10"
                    : "border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        )}

        {/* Text input for translate and order */}
        {(exercise.type === "translate" || exercise.type === "order") && (
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => {
                  if (!isChecked) setAnswers({ ...answers, [currentIdx]: e.target.value });
                }}
                placeholder="Type your answer..."
                disabled={isChecked}
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm transition focus:outline-none ${
                  isChecked
                    ? isCorrect()
                      ? "border-green-500 bg-green-500/10 text-green-400"
                      : "border-red-500 bg-red-500/10 text-red-400"
                    : isDark
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-400"
                }`}
              />
              {exercise.type === "order" && !isChecked && userAnswer && (
                <button
                  onClick={() => setAnswers({ ...answers, [currentIdx]: "" })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Feedback */}
        {isChecked && (
          <div className={`p-4 rounded-xl mb-4 ${
            isCorrect()
              ? isDark ? "bg-green-900/20 border border-green-800/40" : "bg-green-50 border border-green-200"
              : isDark ? "bg-red-900/20 border border-red-800/40" : "bg-red-50 border border-red-200"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect()
                ? <CheckCircle className="w-5 h-5 text-green-500" />
                : <XCircle className="w-5 h-5 text-red-500" />
              }
              <span className={`font-semibold ${isCorrect() ? "text-green-400" : "text-red-400"}`}>
                {isCorrect() ? "Correct! 🎉" : "Not quite right"}
              </span>
            </div>
            {!isCorrect() && (
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                ✅ Correct answer: <strong>{exercise.answer}</strong>
              </p>
            )}
          </div>
        )}

        {/* Hint */}
        {exercise.hint && !isChecked && (
          <button
            onClick={() => setShowHints({ ...showHints, [currentIdx]: !showHints[currentIdx] })}
            className={`flex items-center gap-1.5 text-xs mb-4 ${isDark ? "text-gray-500 hover:text-yellow-400" : "text-gray-400 hover:text-yellow-600"} transition`}
          >
            <HelpCircle className="w-4 h-4" />
            {showHints[currentIdx] ? exercise.hint : "Show hint"}
          </button>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">
          {!isChecked ? (
            <button
              onClick={handleCheck}
              disabled={!userAnswer.trim()}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition disabled:opacity-40"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition text-white ${
                currentIdx === exercises.length - 1 ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {currentIdx === exercises.length - 1 ? "Finish 🏁" : "Next"}
              {currentIdx < exercises.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          )}

          <button
            onClick={handleReset}
            className={`flex items-center gap-1.5 text-sm transition ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}
          >
            <RefreshCw className="w-4 h-4" />
            Restart
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5">
        {exercises.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIdx ? "bg-purple-600 w-4"
              : checked[i]
                ? (() => {
                    const ua = (answers[i] || "").trim().toLowerCase().replace(/[.,!?]/g, "");
                    const ca = exercises[i].answer.trim().toLowerCase().replace(/[.,!?]/g, "");
                    return ua === ca ? "bg-green-500" : "bg-red-500";
                  })()
                : isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
