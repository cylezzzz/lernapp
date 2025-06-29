// components/UploadSection.tsx
'use client'
import React, { useState, useRef } from 'react'
import { Upload, FileText, Image, X, CheckCircle } from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
}

interface UploadSectionProps {
  onFilesUploaded: (files: UploadedFile[]) => void
  uploadedFiles: UploadedFile[]
}

export default function UploadSection({ onFilesUploaded, uploadedFiles }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      processFiles(files)
    }
  }

  const processFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type
    }))
    onFilesUploaded(newFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  }

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return Image
    return FileText
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative p-12 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-300
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-50 scale-102' 
            : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        />
        
        <div className="flex flex-col items-center">
          <div className={`
            w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300
            ${isDragging 
              ? 'bg-indigo-200 scale-110' 
              : 'bg-gradient-to-r from-blue-100 to-indigo-100'
            }
          `}>
            <Upload className={`w-10 h-10 ${isDragging ? 'text-indigo-600' : 'text-indigo-500'}`} />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isDragging ? 'Loslassen zum Hochladen' : 'Dateien hier ablegen'}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            oder klicken zum Auswählen
          </p>
          <p className="text-xs text-gray-500">
            Unterstützt: PDF, Bilder (PNG, JPG), Word-Dokumente
          </p>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            Hochgeladene Dateien ({uploadedFiles.length})
          </h4>
          {uploadedFiles.map((file) => {
            const FileIcon = getFileIcon(file.type)
            return (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}