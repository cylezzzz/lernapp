// components/CalendarView.tsx
'use client'
import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarViewProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  lernplan: Record<string, any[]>
  fachColors: Record<string, string>
}

export default function CalendarView({ selectedDate, onDateSelect, lernplan, fachColors }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = React.useState(selectedDate)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    // Leere Tage am Anfang
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    // Tage des Monats
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
  const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']

  const days = getDaysInMonth(currentMonth)

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Wochentage */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Kalendertage */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="h-24"></div>
          }

          const dateStr = formatDate(date)
          const hasLernplan = lernplan[dateStr] && lernplan[dateStr].length > 0

          return (
            <button
              key={date.toISOString()}
              onClick={() => onDateSelect(date)}
              className={`
                h-24 p-2 rounded-lg border transition-all duration-200
                ${isSelected(date) 
                  ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
                ${isToday(date) ? 'ring-2 ring-offset-2 ring-indigo-300' : ''}
              `}
            >
              <div className="text-sm font-medium text-gray-900 mb-1">
                {date.getDate()}
              </div>
              {hasLernplan && (
                <div className="space-y-1">
                  {lernplan[dateStr].slice(0, 2).map((item, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full ${fachColors[item.fach] || 'bg-gray-400'}`}
                    />
                  ))}
                  {lernplan[dateStr].length > 2 && (
                    <div className="text-xs text-gray-500">+{lernplan[dateStr].length - 2}</div>
                  )}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}