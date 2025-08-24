import { Calendar, User, Eye, Plus, Clock, CheckCircle, Upload } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

interface ExamCardProps {
  exam: {
    id: string
    title: string
    subject: string
    teacher: string
    dueDate: string
    status: "No Entregado" | "Entregado"
  }
}

export function SubmissionExamCard({ exam }: ExamCardProps) {
  const isSubmitted = exam.status === "Entregado"
  const isOverdue = new Date(exam.dueDate) < new Date() && !isSubmitted

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">{exam.title}</CardTitle>
          <Badge
            variant={isSubmitted ? "default" : isOverdue ? "destructive" : "secondary"}
            className={`ml-2 ${
              isSubmitted
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : isOverdue
                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
            }`}
          >
            {isSubmitted ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Submitted
              </>
            ) : isOverdue ? (
              <>
                <Clock className="w-3 h-3 mr-1" />
                Overdue
              </>
            ) : (
              <>
                <Clock className="w-3 h-3 mr-1" />
                Not Submitted
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{exam.subject}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Due: {new Date(exam.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        <Button
          className={`w-full ${
            isSubmitted ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={isSubmitted}
        >
          <Upload className="w-4 h-4 mr-2" />
          {isSubmitted ? "Already Submitted" : "Upload Exam"}
        </Button>
      </CardContent>
    </Card>
  )
}
