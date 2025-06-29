
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
const CalendarView = dynamic(() => import('@/components/CalendarView'), { ssr: false })

export default function DeskPage() {
  const [today, setToday] = useState(new Date().toLocaleDateString('de-DE'))
  const [exams, setExams] = useState([
    { subject: 'Mathe', date: '2025-07-10', level: 'umfangreich' },
    { subject: 'Deutsch', date: '2025-07-15', level: 'mittel' },
  ])

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">🗂 Schreibtisch</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">📅 Kalender</h2>
        <CalendarView />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">📚 Heute:</h2>
        <p>Heute ist der: {today}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">📝 Prüfungen</h2>
        <ul className="list-disc pl-5">
          {exams.map((exam, index) => (
            <li key={index} className="text-gray-700">
              {exam.subject} am {exam.date} ({exam.level})
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <button className="bg-blue-600 text-white py-2 px-4 rounded">🔁 Lernplan für heute</button>
      </div>
    </main>
  )
}
