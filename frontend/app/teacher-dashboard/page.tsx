"use client"

import { useEffect, useState } from "react"
import { TeacherHeader } from "@src/components/teacher-header"
import { SubjectSection } from "@src/components/subject-section"
import { CreateExamModal } from "@src/components/create-exam-modal"
import { DashboardFilters } from "@src/components/dashboard-filters"
import { BarChart3, Users, FileText, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card"
import { useAuthContext } from "@src/components/context/AuthContext"
import axios from "axios"
import { useRouter } from "next/navigation"

// Sample data
// const sampleSubjects = [
//   {
//     id: "1",
//     name: "Advanced Mathematics",
//     code: "MATH-401",
//     exams: [
//       {
//         id: "1",
//         title: "Calculus Integration Quiz",
//         createdDate: "2025-01-05",
//         dueDate: "2025-01-15",
//         submissionsPending: 8,
//         submissionsCorrected: 12,
//         totalStudents: 25,
//       },
//     ],
//   },
// ]

export default function TeacherDashboard() {
  const sampleSubjects = []
  const [subjects, setSubjects] = useState(sampleSubjects)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const {userLogged} = useAuthContext()
  const router = useRouter();

  useEffect(()=>{
    fetchExams()
  }, [userLogged?.user?._id])

async function fetchExams() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    // 1) Traer materias del profe
    const { data } = await axios.get(
      `${API_URL}/api/subjects/get-subjets/${userLogged.user._id}`
    );
    const subjects = data.subjects ?? [];
    console.log('subjects',subjects);
    

    // 2) Traer consignas (assignments) de cada materia en paralelo
    const subjectsWithExams = await Promise.all(
      subjects.map(async (subject: any) => {
        const { data: dataExams } = await axios.get(
          `${API_URL}/api/assignments/getAssignments/${subject._id}`
        );
        return {
          id: subject._id,
          name: subject.name,
          code: subject.code_subject,
          exams: dataExams?.assignments ?? [],
        };
      })
    );

    // 3) Un solo setState
    setSubjects(subjectsWithExams);
  } catch (err) {
    console.error(err);
  }
}



  const teacherName = userLogged.user.name + ' ' + userLogged.user.lastName 

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

  const handleViewSubmissions = (assignmentId: string) => {
    console.log("View submissions for exam:", assignmentId)
    router.push(`/exam-submissions?assignmentId=${assignmentId}`)
  }

  const handleExamCreated = async (examData: any) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const examAssigment = {
        title: examData.title,
        id_subject: examData.subjectId,
        dueDate: examData.dueDate,
        id_teacher: userLogged.user._id,
      }
      console.log('envio', examAssigment);
      
      const response = await axios.post(`${API_URL}/api/assignments/create`, examAssigment)
      console.log("New exam created:", response.data)
      
    } catch (error) {
      console.log(error);
      //toast.error("Error al crear un examen, intentelo nuevamente.");
    }
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
          subjectId={selectedSubjectData?.id || ""}
        />
      </main>
    </div>
  )
}
