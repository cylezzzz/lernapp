'use client';
import { useState } from 'react';

export default function PlanPage() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/setupPlan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        exams: [
          { fach: 'Mathe', datum: '2025-07-10', level: 'umfangreich' },
          { fach: 'Deutsch', datum: '2025-07-15', level: 'mittel' },
          { fach: 'Englisch', datum: '2025-07-17', level: 'leicht' }
        ],
        maxTimePerDay: 2
      })
    });
    const data = await res.json();
    setResponse(data.plan || data.error);
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', color: '#1e40af' }}>🧠 Lernplan erstellen</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <button type="submit" disabled={loading} style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}>
          {loading ? 'Plane wird erstellt...' : 'Lernplan erzeugen'}
        </button>
      </form>
      {response && (
        <pre style={{ marginTop: '2rem', whiteSpace: 'pre-wrap', background: '#f1f5f9', padding: '1rem', borderRadius: '6px' }}>{response}</pre>
      )}
    </main>
  );
}