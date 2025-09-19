"use client"
//feedback-view
import { useState } from "react"
import { FeedbackHeader } from "@src/components/feedback-header"
import { SubmissionViewer } from "@src/components/submission-viewer"
import { TeacherFeedback } from "@src/components/teacher-feedback"
import { DiscussionThread } from "@src/components/discussion-thread"

// Sample data
const feedbackData = {
  student: {
    id: "s1",
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  exam: {
    id: "e1",
    title: "Calculus Integration Quiz - Chapter 5",
    subject: "Advanced Mathematics",
    dueDate: "2025-01-15",
  },
  submission: {
    id: "sub1",
    submittedAt: "2025-01-14T14:30:00",
    imageUrl: "/placeholder.svg?height=800&width=600",
    status: "reviewed" as const,
    grade: "A-",
  },
  feedback: {
    text: "Great work on this integration quiz, Alex! You demonstrated a strong understanding of the fundamental concepts.\n\nStrengths:\n- Your step-by-step work on problems 1-3 was excellent and clearly showed your thought process\n- Creative approach to the substitution problem (#4)\n\nAreas for improvement:\n- Be careful with the signs when applying the chain rule (problem #5)\n- Remember to include the constant of integration in your final answers\n\nOverall, you're showing excellent progress in calculus. Keep up the good work!",
    grade: "A-",
    teacherName: "Dr. Sarah Johnson",
    reviewedAt: "2025-01-16T10:45:00",
    tags: ["Excellent", "Good", "Needs Improvement"],
  },
  messages: [
    {
      id: "m1",
      sender: {
        id: "t1",
        name: "Dr. Sarah Johnson",
        role: "teacher" as const,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "I've reviewed your quiz, Alex. Let me know if you have any questions about the feedback.",
      timestamp: "2025-01-16T10:50:00",
    },
    {
      id: "m2",
      sender: {
        id: "s1",
        name: "Alex Chen",
        role: "student" as const,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content:
        "Thank you for the feedback! I'm a bit confused about problem #5. Could you explain where I went wrong with the chain rule?",
      timestamp: "2025-01-16T14:20:00",
    },
    {
      id: "m3",
      sender: {
        id: "t1",
        name: "Dr. Sarah Johnson",
        role: "teacher" as const,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content:
        "Of course! In problem #5, when you differentiated sin(3x²), you correctly used the chain rule but missed a negative sign. The derivative should be 6x·cos(3x²) instead of -6x·cos(3x²).\n\nRemember that the derivative of sin(u) is cos(u)·u' (not -cos(u)·u').",
      timestamp: "2025-01-16T15:05:00",
    },
    {
      id: "m4",
      sender: {
        id: "s1",
        name: "Alex Chen",
        role: "student" as const,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content:
        "Ah, I see! I was confusing it with the derivative of cos(u). That makes sense now. Thank you for clarifying!",
      timestamp: "2025-01-17T09:15:00",
    },
  ],
}

export default function FeedbackView() {
  const [messages, setMessages] = useState(feedbackData.messages)

  const handleBack = () => {
    console.log("Navigate back to dashboard")
    // In a real app, you would use router.push() or similar
  }

  const handleSendMessage = async (content: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newMessage = {
      id: `m${messages.length + 1}`,
      sender: {
        id: feedbackData.student.id,
        name: feedbackData.student.name,
        role: "student" as const,
        avatar: feedbackData.student.avatar,
      },
      content,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newMessage])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FeedbackHeader
          student={feedbackData.student}
          exam={feedbackData.exam}
          submission={feedbackData.submission}
          onBack={handleBack}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Submission Viewer */}
          <div className="h-[calc(100vh-250px)]">
            <SubmissionViewer imageUrl={feedbackData.submission.imageUrl} examTitle={feedbackData.exam.title} />
          </div>

          {/* Right Column - Feedback and Discussion */}
          <div className="space-y-6">
            {/* Teacher Feedback */}
            <TeacherFeedback feedback={feedbackData.feedback} />

            {/* Discussion Thread */}
              <div className="flex-grow overflow-y-auto p-4">
                <DiscussionThread
                  messages={messages}
                  studentId={feedbackData.student.id}
                  onSendMessage={handleSendMessage}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
