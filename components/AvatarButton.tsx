
'use client';
import { useState } from 'react';

export default function AvatarButton() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => setVisible(!visible)}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-16 h-16 text-3xl shadow-lg transition"
        title="Torben"
      >
        🧠
      </button>

      {visible && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-64 bg-white rounded-xl shadow-2xl overflow-hidden border border-indigo-300">
          <video src="/torben.mp4" autoPlay loop muted className="w-full h-full object-cover" />
        </div>
      )}
    </>
  );
}
