// app/setup/page.tsx
'use client'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Calendar, BookOpen, School, Users, ChevronRight, Check, FileText, Image, ArrowLeft } from 'lucide-react'
import UploadSection from '@/components/UploadSection'
import StepProgress from '@/components/StepProgress'

export default function SetupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    klasse: '',
    schule: '',
    fach: '',
    pruefungstermine: [],
    uploadedFiles: []
  })

  const steps = [
    { id: 1, title: 'Grunddaten', icon: School },
    { id: 2, title: 'Prüfungstermine', icon: Calendar },
    { id: 3, title: 'Material Upload', icon: Upload }
  ]

  const klassen = ['5. Klasse', '6. Klasse', '7. Klasse', '8. Klasse', '9. Klasse', '10. Klasse', '11. Klasse', '12. Klasse', '13. Klasse']
  const faecher = ['Mathematik', 'Deutsch', 'Englisch', 'Physik', 'Chemie', 'Biologie', 'Geschichte', 'Geographie', 'Kunst', 'Musik']

  const addPruefungstermin = () => {
    setFormData(prev => ({
      ...prev,
      pruefungstermine: [...prev.pruefungstermine, { fach: '', datum: '', typ: 'Klausur' }]
    }))
  }

  const updatePruefungstermin = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      pruefungstermine: prev.pruefungstermine.map((termin, i) => 
        i === index ? { ...termin, [field]: value } : termin
      )
    }))
  }

  const handleFilesUploaded = (files) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files]
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.klasse && formData.schule && formData.fach
      case 2:
        return formData.pruefungstermine.length > 0 && formData.pruefungstermine.every(t => t.fach && t.datum)
      case 3:
        return formData.uploadedFiles.length > 0
      default:
        return false
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const finishSetup = () => {
    // Hier würde man die Daten speichern
    router.push('/calendar')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Navigation */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => router.push('/')}
          className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-lg hover:bg-white/90 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück</span>
        </button>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400 to-indigo-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Lernplan Setup
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Erstelle deinen personalisierten Lernplan in nur wenigen Schritten
          </p>
        </div>

        {/* Progress Steps */}
        <StepProgress steps={steps} currentStep={currentStep} />

        {/* Main Content Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            {/* Step 1: Grunddaten */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Grunddaten eingeben</h2>
                  <p className="text-gray-600">Erzähle uns etwas über dich und deine Schule</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Klasse</label>
                    <select 
                      value={formData.klasse}
                      onChange={(e) => setFormData(prev => ({ ...prev, klasse: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    >
                      <option value="">Klasse wählen</option>
                      {klassen.map(klasse => (
                        <option key={klasse} value={klasse}>{klasse}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Fach</label>
                    <select 
                      value={formData.fach}
                      onChange={(e) => setFormData(prev => ({ ...prev, fach: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    >
                      <option value="">Fach wählen</option>
                      {faecher.map(fach => (
                        <option key={fach} value={fach}>{fach}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Schule</label>
                  <input
                    type="text"
                    value={formData.schule}
                    onChange={(e) => setFormData(prev => ({ ...prev, schule: e.target.value }))}
                    placeholder="Name deiner Schule"
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Prüfungstermine */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Prüfungstermine</h2>
                  <p className="text-gray-600">Wann stehen deine Prüfungen an?</p>
                </div>

                <div className="space-y-4">
                  {formData.pruefungstermine.map((termin, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                          value={termin.fach}
                          onChange={(e) => updatePruefungstermin(index, 'fach', e.target.value)}
                          className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="">Fach wählen</option>
                          {faecher.map(fach => (
                            <option key={fach} value={fach}>{fach}</option>
                          ))}
                        </select>
                        <input
                          type="date"
                          value={termin.datum}
                          onChange={(e) => updatePruefungstermin(index, 'datum', e.target.value)}
                          className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <select
                          value={termin.typ}
                          onChange={(e) => updatePruefungstermin(index, 'typ', e.target.value)}
                          className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="Klausur">Klausur</option>
                          <option value="Test">Test</option>
                          <option value="Mündliche Prüfung">Mündliche Prüfung</option>
                          <option value="Abschlussprüfung">Abschlussprüfung</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addPruefungstermin}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  + Prüfungstermin hinzufügen
                </button>
              </div>
            )}

            {/* Step 3: Material Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Lernmaterial hochladen</h2>
                  <p className="text-gray-600">Lade deine Unterlagen, PDFs oder Screenshots hoch</p>
                </div>

                <UploadSection 
                  onFilesUploaded={handleFilesUploaded}
                  uploadedFiles={formData.uploadedFiles}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Zurück
              </button>
              
              <button
                onClick={currentStep === 3 ? finishSetup : nextStep}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentStep === 3 ? 'Lernplan erstellen' : 'Weiter'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}