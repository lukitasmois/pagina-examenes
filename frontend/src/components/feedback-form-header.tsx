"use client"

import { ArrowLeft, BookOpen, Calendar } from "lucide-react"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

interface FeedbackFormHeaderProps {
  student: {
    id: string
    name: string
    avatar?: string
  }
  exam: {
    title: string
    subject: string
    dueDate: string
  }
  onBack: () => void
}

export function FeedbackFormHeader({ student, exam, onBack }: FeedbackFormHeaderProps) {
  return (
    <div className="mb-6">
      {/* Back Button */}
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Submissions
        </Button>
      </div>

      {/* Student and Exam Info */}
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
          <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mt-1 space-y-1 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{exam.subject}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Due: {new Date(exam.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
          <h2 className="text-lg font-medium text-gray-700 mt-2">{exam.title}</h2>
        </div>
      </div>
    </div>
  )
}
