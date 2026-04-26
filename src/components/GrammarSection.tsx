import { useState } from "react";
import { useApp } from "../context/AppContext";
import { grammarData } from "../data/grammarData";
import { ChevronDown, ChevronUp, BookOpen, Lightbulb } from "lucide-react";

export default function GrammarSection() {
  const { language, theme } = useApp();
  const lessons = grammarData[language];
  const [openId, setOpenId] = useState<string>(lessons[0]?.id || "");

  const isDark = theme === "dark";

  const langLabels: Record<string, string> = {
    en: "English Grammar", nl: "Nederlandse Grammatica",
    fr: "Grammaire Française", es: "Gramática Española",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          📚 {langLabels[language]}
        </h2>
        <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {lessons.length} grammar lessons available
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson, index) => {
          const isOpen = openId === lesson.id;
          return (
            <div
              key={lesson.id}
              className={`rounded-2xl border overflow-hidden transition-all ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              {/* Header */}
              <button
                onClick={() => setOpenId(isOpen ? "" : lesson.id)}
                className={`w-full flex items-center justify-between px-6 py-5 text-left transition hover:opacity-90 ${
                  isOpen
                    ? isDark ? "bg-indigo-900/40" : "bg-indigo-50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    isOpen ? "bg-indigo-600 text-white" : isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`font-semibold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                    {lesson.title}
                  </span>
                </div>
                {isOpen
                  ? <ChevronUp className={`w-5 h-5 ${isDark ? "text-indigo-400" : "text-indigo-500"}`} />
                  : <ChevronDown className={`w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                }
              </button>

              {/* Content */}
              {isOpen && (
                <div className="px-6 pb-6 space-y-6">
                  {/* Explanation */}
                  <div className={`flex gap-3 p-4 rounded-xl ${isDark ? "bg-blue-900/20 border border-blue-800/30" : "bg-blue-50 border border-blue-100"}`}>
                    <BookOpen className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className={`text-sm leading-relaxed ${isDark ? "text-blue-200" : "text-blue-800"}`}>
                      {lesson.explanation}
                    </p>
                  </div>

                  {/* Rules */}
                  <div>
                    <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      Rules
                    </h4>
                    <ul className="space-y-2">
                      {lesson.rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                            {i + 1}
                          </span>
                          <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                      💬 Examples
                    </h4>
                    <div className="space-y-3">
                      {lesson.examples.map((ex, i) => (
                        <div key={i} className={`rounded-xl p-4 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                          <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                            {ex.sentence}
                          </p>
                          <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"} italic`}>
                            {ex.translation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
