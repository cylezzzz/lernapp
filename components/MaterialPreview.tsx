// components/MaterialPreview.tsx
'use client'
import React from 'react'
import { FileText, Video, Link, Download } from 'lucide-react'

export default function MaterialPreview() {
  // Mock-Daten - würde normalerweise von API kommen
  const materials = [
    {
      id: 1,
      type: 'pdf',
      title: 'Quadratische Funktionen - Übungsblatt',
      size: '2.4 MB',
      icon: FileText
    },
    {
      id: 2,
      type: 'video',
      title: 'Erklärung: Scheitelpunktform',
      duration: '12:34',
      icon: Video
    },
    {
      id: 3,
      type: 'link',
      title: 'Interaktive Übungen',
      source: 'mathebibel.de',
      icon: Link
    }
  ]

  return (
    <div className="space-y-3">
      {materials.map((material) => (
        <div
          key={material.id}
          className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
              <material.icon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{material.title}</h4>
              <p className="text-xs text-gray-500">
                {material.type === 'pdf' && material.size}
                {material.type === 'video' && material.duration}
                {material.type === 'link' && material.source}
              </p>
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Download className="w-4 h-4 text-gray-500 hover:text-indigo-600" />
          </button>
        </div>
      ))}
    </div>
  )
}