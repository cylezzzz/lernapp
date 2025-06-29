// ===== app/page.tsx =====
'use client'
import { useRouter } from 'next/navigation'
import { BookOpen, Calendar, Target, Zap } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400 to-indigo-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl mb-8 shadow-2xl">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Lernsystem
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Erstelle intelligente Lernpläne, die dich optimal auf deine Prüfungen vorbereiten.
            KI-gestützt, personalisiert und effektiv.
          </p>
          <button
            onClick={() => router.push('/setup')}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Jetzt starten
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            { icon: Target, title: 'Zielfokussiert', desc: 'Automatische Planung basierend auf deinen Prüfungsterminen' },
            { icon: Calendar, title: 'Strukturiert', desc: 'Übersichtlicher Kalender mit täglichen Lernzielen' },
            { icon: Zap, title: 'Effizient', desc: 'KI-optimierte Lernpläne für maximalen Erfolg' }
          ].map((feature, i) => (
            <div key={i} className="text-center p-8 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}