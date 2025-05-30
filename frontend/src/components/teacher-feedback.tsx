"use client"

import { MessageSquare, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

interface TeacherFeedbackProps {
  feedback: {
    text: string
    grade: string
    teacherName: string
    reviewedAt: string
    tags?: string[]
  }
}

export function TeacherFeedback({ feedback }: TeacherFeedbackProps) {
  const getTagBadge = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800 border-green-200">{tag}</Badge>
      case "good":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{tag}</Badge>
      case "needs improvement":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{tag}</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{tag}</Badge>
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Teacher Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Grade */}
        <div className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-gray-800">Grade: {feedback.grade}</span>
        </div>

        {/* Tags */}
        {feedback.tags && feedback.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {feedback.tags.map((tag, index) => (
              <div key={index}>{getTagBadge(tag)}</div>
            ))}
          </div>
        )}

        {/* Feedback Text */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-gray-800 whitespace-pre-wrap">{feedback.text}</p>
        </div>

        {/* Teacher Info */}
        <div className="text-sm text-gray-600">
          <p>
            Reviewed by {feedback.teacherName} on {new Date(feedback.reviewedAt).toLocaleDateString()} at{" "}
            {new Date(feedback.reviewedAt).toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
