"use client"

import { ArrowLeft, BookOpen, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface UploadHeaderProps {
  student: {
    name: string
  }
  exam: {
    title: string
    subject: string
    dueDate: string
  }
  onBack: () => void
}

export function UploadHeader({ student, exam, onBack }: UploadHeaderProps) {
  const dueDate = new Date(exam.dueDate)
  const now = new Date()
  const isOverdue = dueDate < now
  const timeUntilDue = dueDate.getTime() - now.getTime()
  const daysUntilDue = Math.ceil(timeUntilDue / (1000 * 60 * 60 * 24))

  return (
    <div className="bg-white border-b border-gray-200 p-4 md:p-6 rounded-lg shadow-sm mb-6">
      {/* Back Button */}
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Welcome Message */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Hi {student.name}! 👋</h1>
        <p className="text-gray-600">Upload your completed exam below.</p>
      </div>

      {/* Exam Details */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">{exam.title}</h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>{exam.subject}</span>
          </div>

          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Due: {dueDate.toLocaleDateString()}</span>
          </div>

          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{dueDate.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Due Date Status */}
        <div className="flex items-center">
          {isOverdue ? (
            <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
              <Clock className="h-3 w-3 mr-1" />
              Overdue
            </Badge>
          ) : daysUntilDue <= 1 ? (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
              <Clock className="h-3 w-3 mr-1" />
              Due {daysUntilDue === 0 ? "today" : "tomorrow"}
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <Clock className="h-3 w-3 mr-1" />
              {daysUntilDue} days remaining
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
