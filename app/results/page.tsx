// app/results/page.tsx
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, CheckCircle, Trophy, TrendingUp, ArrowLeft, FileText } from 'lucide-react'

export default function ResultsPage() {
  const router = useRouter()
  const [uploadedResults, setUploadedResults] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || [])
    setIsUploading(true)
    
    // Simuliere Upload
    setTimeout(() => {
      const newResults = files.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        fach: 'Mathematik', // würde aus Datei extrahiert werden
        punkte: Math.floor(Math.random() * 30) + 70,
        datum: new Date().toLocaleDateString('de-DE')
      }))
      setUploadedResults([...uploadedResults, ...newResults])
      setIsUploading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/calendar')}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück zum Kalender</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>