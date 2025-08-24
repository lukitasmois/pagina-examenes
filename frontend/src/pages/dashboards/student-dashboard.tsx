"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "../../components/dashboard-header"
import { SubmissionExamCard } from "@/src/components/submission-exam-card"
import { ExamFilters } from "../../components/exam-filters"
import { FileText } from "lucide-react"
import { useAuthContext } from "@/src/components/context/AuthContext"
import axios from "axios"

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
  const {userLogged} = useAuthContext()
  const studentName = userLogged.user.name + ' ' + userLogged.user.lastName

  useEffect(() =>{
    fetchExamns()
  }, [userLogged?.user?._id])

  async function fetchExamns() {
    try {
      const {data} = await axios.get(
          `http://localhost:3000/api/submissions/getSubmissions/${userLogged.user._id}`
        );
        const exams = data.submissions.map((exam) =>{
          return{
            id: exam._id,
            title: exam.title,
            subject: exam.subject.name,
            status: exam.status,
            dueDate: exam.dueDate
          }
        })
        console.log(exams);
        
        setExams(exams)
        setFilteredExams(exams)
        
    } catch (err) {
    console.error(err);
  }
}
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
            <SubmissionExamCard key={exam.id} exam={exam} />
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
