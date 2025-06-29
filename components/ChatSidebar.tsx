'use client';
import { useRef, useEffect, useState } from 'react';

export default function ChatSidebar({ onClose }: { onClose: () => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ from: 'user' | 'torben'; text: string }[]>([
        { from: 'torben', text: 'Hallo! Ich bin Torben, dein Lernhelfer. Was möchtest du wissen?' }
    ]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages((prev) => [
            ...prev,
            { from: 'user', text: input.trim() },
            { from: 'torben', text: 'Das ist eine Beispielantwort von Torben 😊' }
        ]);
        setInput('');
    };

    return (
        <div className="fixed top-0 right-0 w-80 max-w-full h-full bg-white text-indigo-900 shadow-2xl z-50 flex flex-col transition-transform">
            <div className="p-4 border-b flex justify-between items-center">
                <span className="font-bold text-lg">Torben hilft dir!</span>
                <button onClick={onClose} className="text-2xl px-2" aria-label="Chat schließen">&times;</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-3 py-2 rounded-xl max-w-[80%] ${msg.from === 'user' ? 'bg-indigo-200 text-indigo-900' : 'bg-yellow-100 text-yellow-900'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3 border-t flex items-center gap-2">
                <input
                    ref={inputRef}
                    className="flex-grow border rounded px-2 py-1"
                    placeholder="Frag Torben etwas..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="bg-indigo-600 text-white px-4 py-1 rounded font-semibold"
                >
                    Senden
                </button>
            </div>
        </div>
    );
}
