// frontend/src/AskTheWeb.jsx
import { useState } from "react";
import { Loader2, Send } from "lucide-react";   // comes with shadcn/lucide

export default function AskTheWeb() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!query.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("⚠️  Something went wrong. Check the backend logs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl rounded-2xl p-8 space-y-6">
        <header className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Ask-the-Web
          </h1>
          <p className="text-slate-500">
            Type a question &amp; let the agent answer in real-time.
          </p>
        </header>

        <div className="flex gap-2">
          <input
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400 shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Ask me anything…"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="flex items-center gap-1 px-5 py-3 rounded-xl font-medium text-white bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Ask
          </button>
        </div>

        <section
          className="h-64 overflow-auto rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-800 shadow-inner"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {loading && !answer && (
            <span className="animate-pulse text-slate-400">Thinking…</span>
          )}
          {answer}
        </section>
      </div>
    </div>
  );
}
