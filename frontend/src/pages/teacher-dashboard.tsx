"use client"

import { useState } from "react"
import { TeacherHeader } from "../components/teacher-header"
import { SubjectSection } from "../components/subject-section"
import { CreateExamModal } from "../components/create-exam-modal"
import { DashboardFilters } from "../components/dashboard-filters"
import { BarChart3, Users, FileText, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

// Sample data
const sampleSubjects = [
  {
    id: "1",
    name: "Advanced Mathematics",
    code: "MATH-401",
    exams: [
      {
        id: "1",
        title: "Calculus Integration Quiz",
        createdDate: "2025-01-05",
        dueDate: "2025-01-15",
        submissionsPending: 8,
        submissionsCorrected: 12,
        totalStudents: 25,
      },
      {
        id: "2",
        title: "Linear Algebra Test",
        createdDate: "2025-01-10",
        dueDate: "2025-01-20",
        submissionsPending: 15,
        submissionsCorrected: 0,
        totalStudents: 25,
      },
    ],
  },
  {
    id: "2",
    name: "Physics Laboratory",
    code: "PHYS-301",
    exams: [
      {
        id: "3",
        title: "Mechanics Lab Report",
        createdDate: "2025-01-08",
        dueDate: "2025-01-18",
        submissionsPending: 5,
        submissionsCorrected: 8,
        totalStudents: 18,
      },
    ],
  },
  {
    id: "3",
    name: "Computer Science Fundamentals",
    code: "CS-101",
    exams: [],
  },
]

export default function TeacherDashboard() {
  const [subjects, setSubjects] = useState(sampleSubjects)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const teacherName = "Dr. Sarah Johnson"

  // Calculate statistics
  const totalExams = subjects.reduce((acc, subject) => acc + subject.exams.length, 0)
  const totalPending = subjects.reduce(
    (acc, subject) => acc + subject.exams.reduce((examAcc, exam) => examAcc + exam.submissionsPending, 0),
    0,
  )
  const totalStudents = subjects.reduce(
    (acc, subject) => acc + (subject.exams[0]?.totalStudents || 0),
    0,
  )

  const handleCreateExam = (subjectId: string) => {
    setSelectedSubject(subjectId)
    setIsCreateModalOpen(true)
  }

  const handleViewSubmissions = (examId: string) => {
    console.log("View submissions for exam:", examId)
    // Navigate to submissions view
  }

  const handleExamCreated = (examData: any) => {
    console.log("New exam created:", examData)
    // Add exam to the selected subject
  }

  const selectedSubjectData = subjects.find((s) => s.id === selectedSubject)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <TeacherHeader teacherName={teacherName} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Professor {teacherName.split(' ')[1]}! 👨‍🏫</h1>
          <p className="text-gray-600">Manage your courses and track student progress.</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subjects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalExams}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{totalPending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <DashboardFilters
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSearch={setSearchQuery}
          />
        </div>

        {/* Subjects */}
        <div className="space-y-8">
          {subjects.map((subject) => (
            <SubjectSection
              key={subject.id}
              subject={subject}
              onCreateExam={handleCreateExam}
              onViewSubmissions={handleViewSubmissions}
            />
          ))}
        </div>

        {/* Create Exam Modal */}
        <CreateExamModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          subjectName={selectedSubjectData?.name || ""}
          onCreateExam={handleExamCreated}
        />
      </main>
    </div>
  )
}
