// ===== app/dashboard/page.tsx =====
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Download, BarChart3, Calendar, Trophy, BookOpen, ArrowLeft, Zap } from 'lucide-react'
import DownloadButton from '@/components/DownloadButton'

export default function DashboardPage() {
  const router = useRouter()

  const stats = [
    { label: 'Abgeschlossene Themen', value: '12', icon: Trophy, color: 'from-green-500 to-emerald-600' },
    { label: 'Lernstunden diese Woche', value: '8.5h', icon: BarChart3, color: 'from-blue-500 to-indigo-600' },
    { label: 'Nächste Prüfung', value: '5 Tage', icon: Calendar, color: 'from-purple-500 to-pink-600' },
    { label: 'Lernstreak', value: '12 Tage', icon: Zap, color: 'from-orange-500 to-red-600' }
  ]

  const recentActivity = [
    { date: '2024-01-15', activity: 'Quadratische Funktionen abgeschlossen', fach: 'Mathematik' },
    { date: '2024-01-14', activity: 'Mechanik Grundlagen wiederholt', fach: 'Physik' },
    { date: '2024-01-13', activity: 'Gedichtanalyse geübt', fach: 'Deutsch' }
  ]

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
                <span>Kalender</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-sm text-gray-600">Dein Lernfortschritt im Überblick</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const Icon =