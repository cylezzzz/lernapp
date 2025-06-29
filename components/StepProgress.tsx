// Dateiinhalt kommt hier rein// components/StepProgress.tsx
'use client'
import React from 'react'
import { Check } from 'lucide-react'

interface Step {
  id: number
  title: string
  icon: React.ComponentType<any>
}

interface StepProgressProps {
  steps: Step[]
  currentStep: number
}

export default function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index + 1 < currentStep
            const isCurrent = index + 1 === currentStep
            const Icon = step.icon

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`
                    w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-200' 
                      : isCurrent 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200 animate-pulse' 
                        : 'bg-gray-100 border-2 border-gray-300'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-8 h-8 text-white" />
                  ) : (
                    <Icon className={`w-8 h-8 ${isCurrent ? 'text-white' : 'text-gray-400'}`} />
                  )}
                </div>
                <span 
                  className={`
                    mt-3 text-sm font-medium
                    ${isCurrent ? 'text-indigo-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}
                  `}
                >
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}