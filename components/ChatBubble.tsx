
'use client';
import { useState } from 'react';

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! Ich bin Torben. Wie kann ich dir helfen?' }]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      const assistantMsg = { role: 'assistant', content: data.message || 'Keine Antwort.' };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Fehler bei der Antwort.' }]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-16 h-16 text-3xl shadow-lg"
        title="Chat öffnen"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 left-6 z-50 w-96 h-[26rem] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-purple-300">
          <div className="bg-purple-600 text-white px-4 py-2 font-semibold">Torben – Lernhilfe</div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm text-gray-800">
            {messages.map((m, i) => (
              <div key={i} className={\`p-2 rounded \${m.role === 'user' ? 'bg-indigo-100 self-end' : 'bg-gray-200'}\`}>
                <strong>{m.role === 'user' ? 'Du' : 'Torben'}:</strong> {m.content}
              </div>
            ))}
          </div>
          <div className="flex p-2 border-t gap-2">
            <input
              className="flex-1 border rounded px-2"
              placeholder="Frage stellen..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className="bg-purple-600 text-white px-4 rounded">
              Senden
            </button>
          </div>
        </div>
      )}
    </>
  );
}
