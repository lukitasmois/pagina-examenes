import { Calendar, Users, Eye, Plus, Clock, CheckCircle } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

interface ExamCardProps {
  exam: {
    id: string
    title: string
    createdDate: string
    dueDate: string
    submissionsPending: number
    submissionsCorrected: number
    totalStudents: number
  }
  onViewSubmissions: (examId: string) => void
}

export function AssignmentExamCard({ exam, onViewSubmissions }: ExamCardProps) {
  const totalSubmissions = exam.submissionsPending + exam.submissionsCorrected
  const isOverdue = new Date(exam.dueDate) < new Date()
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">{exam.title}</CardTitle>
          {isOverdue && (
            <Badge variant="destructive" className="ml-2">
              <Clock className="w-3 h-3 mr-1" />
              Overdue
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Created: {new Date(exam.createdDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Due: {new Date(exam.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>{totalSubmissions} of {exam.totalStudents} submitted</span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex space-x-2">
          {exam.submissionsPending > 0 && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Clock className="w-3 h-3 mr-1" />
              {exam.submissionsPending} pending
            </Badge>
          )}
          {exam.submissionsCorrected > 0 && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              {exam.submissionsCorrected} corrected
            </Badge>
          )}
        </div>

        <Button
          onClick={() => onViewSubmissions(exam.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Submissions
        </Button>
      </CardContent>
    </Card>
  )
}
