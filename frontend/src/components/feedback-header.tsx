"use client"

import { ArrowLeft, BookOpen, Calendar, Clock } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"

interface FeedbackHeaderProps {
  student: {
    name: string
  }
  exam: {
    title: string
    subject: string
    dueDate: string
  }
  submission: {
    submittedAt: string
    status: "reviewed" | "follow-up" | "pending"
    grade?: string
  }
  onBack: () => void
}

export function FeedbackHeader({ student, exam, submission, onBack }: FeedbackHeaderProps) {
  const getStatusBadge = () => {
    switch (submission.status) {
      case "reviewed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Reviewed</Badge>
      case "follow-up":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Follow-up in Progress</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Review</Badge>
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 p-4 md:p-6 rounded-lg shadow-sm mb-6">
      {/* Back Button */}
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Exam Details */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{exam.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 space-y-1 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>{exam.subject}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Due: {new Date(exam.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>Submitted: {new Date(submission.submittedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          {submission.grade && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-sm px-3 py-1">
              Grade: {submission.grade}
            </Badge>
          )}
          {getStatusBadge()}
        </div>
      </div>
    </div>
  )
}
