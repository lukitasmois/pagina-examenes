import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface SubmissionFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  submission: {
    id: string
    student: {
      name: string
    }
    feedback?: string
    grade?: string
  }
  onSaveFeedback: (feedback: string, grade: string) => void
}

export function SubmissionFeedbackModal({
  isOpen,
  onClose,
  submission,
  onSaveFeedback,
}: SubmissionFeedbackModalProps) {
  const [feedback, setFeedback] = useState(submission.feedback || "")
  const [grade, setGrade] = useState(submission.grade || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSaveFeedback(feedback, grade)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Feedback for {submission.student.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="grade" className="text-sm font-medium text-gray-700">
              Grade
            </Label>
            <Input
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="e.g., A, B+, 95%, etc."
              className="border-gray-200 focus:border-green-400 focus:ring-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-sm font-medium text-gray-700">
              Feedback
            </Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide feedback on the student's work..."
              rows={6}
              className="border-gray-200 focus:border-green-400 focus:ring-green-400"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Save Feedback
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
