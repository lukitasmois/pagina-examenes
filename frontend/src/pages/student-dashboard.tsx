"use client"

import { useState } from "react"
import { DashboardHeader } from "../components/dashboard-header"
import { ExamCard } from "../components/exam-card"
import { ExamFilters } from "../components/exam-filters"
import { FileText } from "lucide-react"

// Sample data
const sampleExams = [
  {
    id: "1",
    title: "Algebra Quiz - Chapter 5",
    subject: "Mathematics",
    teacher: "Ms. Johnson",
    dueDate: "2025-01-15",
    status: "not_submitted" as const,
  },
  {
    id: "2",
    title: "Cell Biology Test",
    subject: "Science",
    teacher: "Mr. Davis",
    dueDate: "2025-01-12",
    status: "submitted" as const,
  },
  {
    id: "3",
    title: "Essay: Romeo and Juliet",
    subject: "English",
    teacher: "Mrs. Smith",
    dueDate: "2025-01-20",
    status: "not_submitted" as const,
  },
  {
    id: "4",
    title: "World War II Timeline",
    subject: "History",
    teacher: "Mr. Brown",
    dueDate: "2025-01-08",
    status: "not_submitted" as const,
  },
  {
    id: "5",
    title: "Geometry Proofs",
    subject: "Mathematics",
    teacher: "Ms. Johnson",
    dueDate: "2025-01-25",
    status: "not_submitted" as const,
  },
  {
    id: "6",
    title: "Chemistry Lab Report",
    subject: "Science",
    teacher: "Dr. Wilson",
    dueDate: "2025-01-18",
    status: "submitted" as const,
  },
]

export default function StudentDashboard() {
  const [exams, setExams] = useState(sampleExams)
  const [filteredExams, setFilteredExams] = useState(sampleExams)
  const studentName = "Alex Chen"

  const handleSubjectFilter = (subject: string) => {
    if (subject === "all") {
      setFilteredExams(exams)
    } else {
      setFilteredExams(exams.filter((exam) => exam.subject === subject))
    }
  }

  const handleStatusFilter = (status: string) => {
    if (status === "all") {
      setFilteredExams(exams)
    } else {
      setFilteredExams(exams.filter((exam) => exam.status === status))
    }
  }

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredExams(exams)
    } else {
      setFilteredExams(
        exams.filter(
          (exam) =>
            exam.title.toLowerCase().includes(query.toLowerCase()) ||
            exam.subject.toLowerCase().includes(query.toLowerCase()) ||
            exam.teacher.toLowerCase().includes(query.toLowerCase()),
        ),
      )
    }
  }

  const pendingExams = filteredExams.filter((exam) => exam.status === "not_submitted").length
  const submittedExams = filteredExams.filter((exam) => exam.status === "submitted").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <DashboardHeader studentName={studentName} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {studentName}! 👋</h1>
          <p className="text-gray-600">
            You have {pendingExams} pending exam{pendingExams !== 1 ? "s" : ""} and {submittedExams} submitted exam
            {submittedExams !== 1 ? "s" : ""}.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <ExamFilters
            onSubjectFilter={handleSubjectFilter}
            onStatusFilter={handleStatusFilter}
            onSearch={handleSearch}
          />
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>

        {/* Empty State */}
        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No exams found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </main>
    </div>
  )
}
