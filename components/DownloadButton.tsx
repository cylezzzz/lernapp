// components/DownloadButton.tsx
'use client'
import React, { useState } from 'react'
import { Download, Package, CheckCircle, Loader } from 'lucide-react'

export default function DownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const handleDownload = async () => {
    setIsGenerating(true)
    
    // Simuliere Paket-Erstellung (in Produktion würde das eine API-Anfrage sein)
    try {
      const response = await fetch('/api/generateOfflinePackage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studyPlan: 'Aktueller Lernplan',
          materials: ['Material 1', 'Material 2']
        })
      })

      if (response.ok) {
        setIsReady(true)
        setTimeout(() => {
          // Simuliere Download
          alert('Download wird gestartet...')
          setIsReady(false)
        }, 1000)
      }
    } catch (error) {
      console.error('Fehler beim Generieren:', error)
      alert('Fehler beim Erstellen des Offline-Pakets')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Offline-Paket</h3>
          <p className="text-purple-100">
            Lade deinen kompletten Lernplan als ZIP herunter
          </p>
        </div>
        <Package className="w-12 h-12 text-purple-200" />
      </div>

      <div className="space-y-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <h4 className="font-semibold mb-2">Enthält:</h4>
          <ul className="space-y-1 text-sm text-purple-100">
            <li>✓ Kalenderübersicht als PDF</li>
            <li>✓ Tägliche Lernblätter</li>
            <li>✓ Alle hochgeladenen Materialien</li>
            <li>✓ Übungsaufgaben & Lösungen</li>
          </ul>
        </div>

        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className={`
            w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3
            ${isGenerating 
              ? 'bg-white/30 cursor-not-allowed' 
              : isReady
                ? 'bg-green-500 hover:bg-green-600 transform scale-105'
                : 'bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 shadow-lg'
            }
          `}
        >
          {isGenerating ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Paket wird erstellt...</span>
            </>
          ) : isReady ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Bereit zum Download!</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Offline-Paket generieren</span>
            </>
          )}
        </button>

        <p className="text-xs text-center text-purple-200">
          ZIP-Datei • Geschätzte Größe: 15-20 MB
        </p>
      </div>
    </div>
  )
}