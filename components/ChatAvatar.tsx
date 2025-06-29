// components/ChatAvatar.tsx
'use client';

export default function ChatAvatar({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-yellow-300 text-black shadow-xl flex items-center justify-center text-3xl hover:scale-110 transition z-50"
      title="Torben – dein Lernbegleiter"
    >
      🧠
    </button>
  );
}
