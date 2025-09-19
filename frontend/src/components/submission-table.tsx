"use client"

import { useState } from "react"
import { Eye, CheckCircle, Clock, AlertCircle, MessageSquare } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { SubmissionViewModal } from "./submission-view-modal"
import { SubmissionFeedbackModal } from "./submission-feedback-modal"

interface Submission {
  id: string
  student: {
    id: string
    name: string
    avatar?: string
  }
  submittedAt: string | null
  status: "no_entregado" | "submitted" | "corrected"
  imageUrl?: string
  feedback?: string
  grade?: string
}

interface SubmissionTableProps {
  submissions: Submission[]
  onStatusChange: (submissionId: string, newStatus: string) => void
}

export function SubmissionTable({ submissions, onStatusChange }: SubmissionTableProps) {
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

  const handleViewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission)
    setViewModalOpen(true)
  }

  const handleAddFeedback = (submission: Submission) => {
    setSelectedSubmission(submission)
    setFeedbackModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "corregido":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Corrected
          </Badge>
        )
      case "entregado":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Not Submitted
          </Badge>
        )
    }
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Student</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={submission.student.avatar || "/placeholder.svg"} alt={submission.student.name} />
                      <AvatarFallback>
                        {submission.student.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{submission.student.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {submission.submittedAt ? (
                    <span>{new Date(submission.submittedAt).toLocaleString()}</span>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(submission.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewSubmission(submission)}
                      disabled={submission.status === "no_entregado"}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddFeedback(submission)}
                      disabled={submission.status === "no_entregado"}
                      className={
                        submission.status === "corrected"
                          ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                          : ""
                      }
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {submission.status === "corrected" ? "Edit Feedback" : "Add Feedback"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedSubmission && (
        <>
          <SubmissionViewModal
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            submission={selectedSubmission}
          />
          <SubmissionFeedbackModal
            isOpen={feedbackModalOpen}
            onClose={() => setFeedbackModalOpen(false)}
            submission={selectedSubmission}
            onSaveFeedback={(feedback, grade) => {
              onStatusChange(selectedSubmission.id, "corrected")
              setFeedbackModalOpen(false)
            }}
          />
        </>
      )}
    </>
  )
}
