"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"

interface CreateExamHeaderProps {
  onBack: () => void
}

export function CreateExamHeader({ onBack }: CreateExamHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4 md:p-6 rounded-lg shadow-sm mb-6">
      {/* Back Button */}
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Exams
        </Button>
      </div>

      {/* Header Content */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Create New Exam</h1>
        <p className="text-gray-600 mt-1">Create an exam entry where students can upload their completed work.</p>
      </div>
    </div>
  )
}
