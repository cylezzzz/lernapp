'use client';
import { useState } from 'react';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files?.[0] || null);
    setMessage('');
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Bitte eine Datei auswählen.');
      return;
    }
    setMessage(`✅ ${selectedFile.name} wurde vorbereitet.`);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', color: '#1e40af' }}>📤 Lernmaterial hochladen</h1>
      <form onSubmit={handleUpload} style={{ marginTop: '1rem' }}>
        <input type="file" onChange={handleFileChange} style={{ marginBottom: '1rem' }} />
        <br />
        <button type="submit" style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}>Datei hochladen</button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </main>
  );
}