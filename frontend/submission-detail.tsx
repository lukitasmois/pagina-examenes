"use client"

import { useState } from "react"
import { SubmissionDetailHeader } from "./components/submission-detail-header"
import { ImageViewer } from "./components/image-viewer"
import { FeedbackPanel } from "./components/feedback-panel"

// Sample data
const submissionData = {
  id: "1",
  student: {
    id: "s1",
    name: "Emma Johnson",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  exam: {
    id: "e1",
    title: "Calculus Integration Quiz - Chapter 5",
    subject: "Advanced Mathematics",
  },
  submittedAt: "2025-01-14T14:30:00",
  status: "submitted",
  imageUrl: "/placeholder.svg?height=1000&width=800",
  feedback: "",
  grade: "",
}

export default function SubmissionDetail() {
  const [submission, setSubmission] = useState(submissionData)

  const handleBack = () => {
    console.log("Navigate back to submissions list")
    // In a real app, you would use router.push() or similar to navigate back
  }

  const handleDownload = () => {
    console.log("Download submission")
    // In a real app, you would trigger the download
    const link = document.createElement('a')
    link.href = submission.imageUrl || "/placeholder.svg"
    link.download = `${submission.student.name}_${submission.exam.title}_submission.jpg`
    link.click()
  }

  const handleSaveFeedback = (feedback: string, grade: string) => {
    setSubmission(prev => ({
      ...prev,
      feedback,
      grade,
      status: "corrected"
    }))
    console.log("Feedback saved:", { feedback, grade })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <SubmissionDetailHeader
        student={submission.student}
        exam={submission.exam}
        submission={submission}
        onBack={handleBack}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Image Viewer - Takes up 2/3 of the space on large screens */}
          <div className="lg:col-span-2 h-full">
            <ImageViewer
              imageUrl={submission.imageUrl || "/placeholder.svg"}
              studentName={submission.student.name}
              onDownload={handleDownload}
            />
          </div>

          {/* Feedback Panel - Takes up 1/3 of the space on large screens */}
          <div className="lg:col-span-1 h-full">
            <FeedbackPanel
              initialFeedback={submission.feedback}
              initialGrade={submission.grade}
              studentName={submission.student.name}
              isReviewed={submission.status === "corrected"}
              onSaveFeedback={handleSaveFeedback}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
