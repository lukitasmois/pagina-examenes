"use client"

import { useState } from "react"
import { SubmissionHeader } from "@src/components/submission-header"
import { SubmissionStats } from "@src/components/submission-stats"
import { SubmissionFilters } from "@src/components/submission-filters"
import { SubmissionTable } from "@src/components/submission-table"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { title } from "process"
import axios from "axios"
// Sample data
const examData = {
  id: "1",
  title: "Calculus Integration Quiz",
  subject: "Advanced Mathematics",
  dueDate: "2025-01-15",
}

const submissionsData = [
  {
    id: "1",
    student: {
      id: "s1",
      name: "Emma Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2025-01-14T14:30:00",
    status: "corrected" as const,
    imageUrl: "/placeholder.svg?height=800&width=600",
    feedback: "Good work on the integration problems. Your step-by-step approach is clear and methodical. Pay attention to the substitution method in problem 3.",
    grade: "A-",
  },
  //#region Funciones viejas
  /*{
    id: "2",
    student: {
      id: "s2",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2025-01-14T10:15:00",
    status: "submitted" as const,
    imageUrl: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "3",
    student: {
      id: "s3",
      name: "Sophia Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2025-01-13T16:45:00",
    status: "corrected" as const,
    imageUrl: "/placeholder.svg?height=800&width=600",
    feedback: "Excellent work! Your solutions are elegant and your explanations are thorough.",
    grade: "A+",
  },
  {
    id: "4",
    student: {
      id: "s4",
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: null,
    status: "not_submitted" as const,
  },
  {
    id: "5",
    student: {
      id: "s5",
      name: "Olivia Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2025-01-14T09:20:00",
    status: "submitted" as const,
    imageUrl: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "6",
    student: {
      id: "s6",
      name: "Noah Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2025-01-13T11:05:00",
    status: "submitted" as const,
    imageUrl: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "7",
    student: {
      id: "s7",
      name: "Ava Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: null,
    status: "not_submitted" as const,
  },*/
  //#endregion
]

export default function ExamSubmissions() {
  const [submissions, setSubmissions] = useState(submissionsData)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const assignmentId = searchParams.get('assignmentId')
  const [examData, setExamData] = useState({
    id: '',
    title: '---',
    subject: '---',
    dueDate: ''
  })

  useEffect(()=>{
    console.log(assignmentId);
    getAssignment()
    getSubmissions()
  }, [])
  // Calculate statistics
  const stats = {
    totalStudents: submissions.length,
    submissionsReceived: submissions.filter(s => s.status !== "not_submitted").length,
    pendingReview: submissions.filter(s => s.status === "submitted").length,
    corrected: submissions.filter(s => s.status === "corrected").length,
  }

  // Filter submissions based on active tab and search query
  const filteredSubmissions = submissions.filter(submission => {
    // Filter by tab
    if (activeTab !== "all" && submission.status !== activeTab) {
      return false
    }
    
    // Filter by search query
    if (searchQuery && !submission.student.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    return true
  })

  async function getAssignment() {
    const {data} = await axios.get(`http://localhost:3000/api/assignments/getAssignmentById/${assignmentId}`)
    setExamData({
      id: data.assignment._id,
      title: data.assignment.title,
      dueDate: data.assignment.dueDate,
      subject: 'a'
    })
    
  }

  async function getSubmissions() {
    const {data} = await axios.get(`http://localhost:3000/api/submissions/getSubmissionsByAssignment/${assignmentId}`)
    console.log('submissions', data.submissios);
    setSubmissions(data.submissios)
  }

  const handleStatusChange = (submissionId: string, newStatus: string) => {
    setSubmissions(submissions.map(submission => 
      submission.id === submissionId 
        ? { ...submission, status: newStatus as any } 
        : submission
    ))
  }

  const handleBack = () => {
    console.log("Navigate back to exam list")
    // In a real app, you would use router.push() or similar to navigate back
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SubmissionHeader exam={examData} onBack={handleBack} />
        
        {/* Statistics */}
        <SubmissionStats stats={stats} />
        
        {/* Filters */}
        <SubmissionFilters 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onSearch={setSearchQuery} 
        />
        
        {/* Submissions Table */}
        <SubmissionTable 
          submissions={filteredSubmissions} 
          onStatusChange={handleStatusChange} 
        />
      </div>
    </div>
  )
}
