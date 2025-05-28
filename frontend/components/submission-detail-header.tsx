import { ArrowLeft, Calendar, BookOpen, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface SubmissionDetailHeaderProps {
  student: {
    id: string
    name: string
    avatar?: string
  }
  exam: {
    title: string
    subject: string
  }
  submission: {
    submittedAt: string
    status: string
    grade?: string
  }
  onBack: () => void
}

export function SubmissionDetailHeader({ student, exam, submission, onBack }: SubmissionDetailHeaderProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "corrected":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Corrected
          </Badge>
        )
      case "submitted":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending Review
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Submissions
          </Button>
        </div>

        {/* Header Content */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Student Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                {student.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{exam.subject}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{new Date(submission.submittedAt).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status and Grade */}
          <div className="flex items-center space-x-3">
            {submission.grade && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-sm px-3 py-1">
                Grade: {submission.grade}
              </Badge>
            )}
            {getStatusBadge(submission.status)}
          </div>
        </div>

        {/* Exam Title */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">{exam.title}</h2>
        </div>
      </div>
    </div>
  )
}
