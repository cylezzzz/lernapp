"use client";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hi! Ich bin Torben. Was brauchst du für deine Prüfungen?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const reply = {
        role: "assistant",
        content: data.message || "Keine Antwort erhalten.",
      };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Fehler bei der GPT-Abfrage" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">💬 Torben hilft dir beim Lernen</h1>

        <div className="w-full max-w-2xl bg-white p-4 rounded shadow flex-1 overflow-y-auto mb-4">
          {messages.map((msg, i) => (
              <div key={i} className="mb-2">
                <strong>{msg.role === "user" ? "Du" : "Torben"}:</strong> {msg.content}
              </div>
          ))}
          {loading && <div className="text-sm text-gray-500">Torben schreibt …</div>}
        </div>

        <div className="w-full max-w-2xl flex gap-2">
          <input
              type="text"
              className="flex-1 p-2 border rounded"
              placeholder="Frage etwas zum Lernplan…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
              onClick={sendMessage}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Senden
          </button>
        </div>
      </div>
  );
}
