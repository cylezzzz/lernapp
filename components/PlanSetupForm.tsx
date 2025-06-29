'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function PlanSetupForm() {
  const [exams, setExams] = useState([{ subject: '', date: '', level: 'mittel' }])
  const [maxTime, setMaxTime] = useState('2')
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)

  const addExam = () => {
    if (exams.length < 3) {
      setExams([...exams, { subject: '', date: '', level: 'mittel' }])
    }
  }

  const handleChange = (i: number, field: string, value: string) => {
    const updated = [...exams]
    updated[i][field] = value
    setExams(updated)
  }

  const submit = async () => {
    setLoading(true)
    const res = await fetch('/api/setupPlan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        today: new Date().toLocaleDateString('de-DE'),
        maxTimePerDay: maxTime,
        exams,
      }),
    })
    const data = await res.json()
    setPlan(data.plan)
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">🧠 Lernplan Setup</h2>
      {exams.map((exam, i) => (
        <div key={i} className="mb-2 space-y-1">
          <input
            type="text"
            placeholder="Fach z. B. Mathe"
            className="border px-2 py-1 w-full"
            value={exam.subject}
            onChange={(e) => handleChange(i, 'subject', e.target.value)}
          />
          <input
            type="date"
            className="border px-2 py-1 w-full"
            value={exam.date}
            onChange={(e) => handleChange(i, 'date', e.target.value)}
          />
          <select
            className="border px-2 py-1 w-full"
            value={exam.level}
            onChange={(e) => handleChange(i, 'level', e.target.value)}
          >
            <option value="umfangreich">umfangreich</option>
            <option value="mittel">mittel</option>
            <option value="leicht">leicht</option>
          </select>
        </div>
      ))}
      <button onClick={addExam} className="text-blue-600 underline mb-4">+ Prüfung hinzufügen</button>
      <div className="mb-4">
        <label>⏱️ Max. Lernzeit pro Tag (h):</label>
        <input
          type="number"
          className="border px-2 py-1 ml-2 w-20"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
        />
      </div>
      <Button onClick={submit} disabled={loading}>{loading ? 'Plane...' : 'Lernplan erstellen'}</Button>
      {plan && <pre className="mt-4 whitespace-pre-wrap bg-gray-100 p-4 rounded text-sm">{plan}</pre>}
    </div>
  )
}
