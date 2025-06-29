import React from 'react';

export default function Footer() {
  return (
    <footer className="p-6 bg-indigo-900 text-sm text-center text-indigo-300 opacity-80 space-y-2">
      <div className="flex justify-center space-x-6">
        <a href="/datenschutz" className="hover:underline">
          Datenschutz
        </a>
        <a href="/impressum" className="hover:underline">
          Impressum
        </a>
        <a href="/kontakt" className="hover:underline">
          Kontakt
        </a>
      </div>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
          🐦
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
          📘
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
          📸
        </a>
      </div>
      <div>© 2025 Writora</div>
    </footer>
  );
}
