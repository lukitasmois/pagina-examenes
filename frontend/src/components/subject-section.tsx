import { BookOpen, Plus } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { AssignmentExamCard } from './assignment-exam-card'

interface SubjectSectionProps {
  subject: {
    id: string
    name: string
    code: string
    exams: Array<{
      id: string
      title: string
      createdDate: string
      dueDate: string
      submissionsPending: number
      submissionsCorrected: number
      totalStudents: number
    }>
  }
  onCreateExam: (subjectId: string) => void
  onViewSubmissions: (examId: string) => void
}

export function SubjectSection({ subject, onCreateExam, onViewSubmissions }: SubjectSectionProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">{subject.name}</CardTitle>
              <p className="text-sm text-gray-600">{subject.code}</p>
            </div>
          </div>
          <Button
            onClick={() => onCreateExam(subject.id)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Exam
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {subject.exams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subject.exams.map((exam) => (
              <AssignmentExamCard
                key={exam.id}
                exam={exam}
                onViewSubmissions={onViewSubmissions}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No exams yet</h3>
            <p className="text-gray-600 mb-4">Create your first exam for this subject.</p>
            <Button
              onClick={() => onCreateExam(subject.id)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Exam
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
