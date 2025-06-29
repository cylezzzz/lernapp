// ===== app/calendar/page.tsx =====
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, ChevronLeft, ChevronRight, Plus, BookOpen, Clock, Target, ArrowLeft } from 'lucide-react'
import CalendarView from '@/components/CalendarView'
import MaterialPreview from '@/components/MaterialPreview'

export default function CalendarPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('month') // 'month', 'week', 'day'

  // Mock data - in real app würde das von der API kommen
  const lernplan = {
    '2024-01-15': [
      { fach: 'Mathematik', thema: 'Quadratische Funktionen', dauer: '2h', status: 'pending' },
      { fach: 'Physik', thema: 'Mechanik Grundlagen', dauer: '1.5h', status: 'completed' }
    ],
    '2024-01-16': [
      { fach: 'Deutsch', thema: 'Gedichtanalyse', dauer: '1h', status: 'pending' }
    ]
  }

  const fachColors = {
    'Mathematik': 'bg-blue-500',
    'Physik': 'bg-green-500',
    'Deutsch': 'bg-purple-500',
    'Englisch': 'bg-red-500',
    'Chemie': 'bg-yellow-500',
    'Biologie': 'bg-emerald-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Lernplan</h1>
                  <p className="text-sm text-gray-600">Deine personalisierte Übersicht</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kalender */}
          <div className="lg:col-span-2">
            <CalendarView 
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              lernplan={lernplan}
              fachColors={fachColors}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tagesübersicht */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-indigo-500" />
                Heute lernen
              </h3>
              <div className="space-y-3">
                {lernplan[selectedDate.toISOString().split('T')[0]]?.map((item, i) => (
                  <div key={i} className="p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className={w-3 h-3 rounded-full ${fachColors[item.fach]}}></div>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.dauer}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900">{item.fach}</h4>
                    <p className="text-sm text-gray-600">{item.thema}</p>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">Keine Einträge für heute</p>
                )}
              </div>
            </div>

            {/* Materialien */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-500" />
                Materialien
              </h3>
              <MaterialPreview />
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Schnellaktionen</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all">
                  Wiederholung einplanen
                </button>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all">
                  Material hinzufügen
                </button>
                <button 
                  onClick={() => router.push('/results')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
                >
                  Ergebnisse hochladen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}