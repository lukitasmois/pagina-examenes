import { ArrowLeft, BookOpen, Calendar } from 'lucide-react'
import { Button } from "../components/ui/button"

interface SubmissionHeaderProps {
  exam: {
    title: string
    subject: string
    dueDate: string
  }
  onBack: () => void
}

export function SubmissionHeader({ exam, onBack }: SubmissionHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{exam.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center mt-2 text-sm text-gray-600 space-y-1 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>{exam.subject}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Due: {new Date(exam.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
