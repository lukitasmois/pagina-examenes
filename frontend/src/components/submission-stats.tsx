import { Users, CheckCircle, Clock, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

interface SubmissionStatsProps {
  stats: {
    totalStudents: number
    submissionsReceived: number
    pendingReview: number
    corrected: number
  }
}

export function SubmissionStats({ stats }: SubmissionStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalStudents}</div>
          <p className="text-xs text-muted-foreground">
            Assigned to this exam
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Submissions</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.submissionsReceived}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((stats.submissionsReceived / stats.totalStudents) * 100)}% of students
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{stats.pendingReview}</div>
          <p className="text-xs text-muted-foreground">
            Awaiting your feedback
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Corrected</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.corrected}</div>
          <p className="text-xs text-muted-foreground">
            Reviewed and graded
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
