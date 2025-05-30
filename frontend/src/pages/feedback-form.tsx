"use client"

import { useState } from "react"
import { Save, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Textarea } from "../components/ui/textarea"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { FeedbackFormHeader } from "../components/feedback-form-header"
import { SubmissionPreview } from "../components/submission-preview"
import { FeedbackTags } from "../components/feedback-tags"
import { SubmissionViewerModal } from "../components/submission-viewer-modal"

// Sample data
const feedbackData = {
  student: {
    id: "s1",
    name: "Emma Johnson",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  exam: {
    id: "e1",
    title: "Calculus Integration Quiz - Chapter 5",
    subject: "Advanced Mathematics",
    dueDate: "2025-01-15",
  },
  submission: {
    id: "sub1",
    imageUrl: "/placeholder.svg?height=800&width=600",
    submittedAt: "2025-01-14T14:30:00",
  },
  existingFeedback: {
    text: "",
    grade: "",
    tags: [] as string[],
  },
}

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState(feedbackData.existingFeedback.text)
  const [grade, setGrade] = useState(feedbackData.existingFeedback.grade)
  const [selectedTags, setSelectedTags] = useState<string[]>(feedbackData.existingFeedback.tags)
  const [isSaving, setIsSaving] = useState(false)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Saving feedback:", { feedback, grade, tags: selectedTags })
    setIsSaving(false)
    // Navigate back to submissions list
    handleBack()
  }

  const handleBack = () => {
    console.log("Navigate back to submissions list")
    // In a real app, you would use router.push() or similar
  }

  const handleDownload = () => {
    console.log("Download submission")
    const link = document.createElement("a")
    link.href = feedbackData.submission.imageUrl
    link.download = `${feedbackData.student.name}_submission.jpg`
    link.click()
  }

  const hasContent = feedback.trim() || grade.trim() || selectedTags.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <FeedbackFormHeader student={feedbackData.student} exam={feedbackData.exam} onBack={handleBack} />

        {/* Submission Preview */}
        <SubmissionPreview
          imageUrl={feedbackData.submission.imageUrl}
          studentName={feedbackData.student.name}
          submittedAt={feedbackData.submission.submittedAt}
          onViewFull={() => setIsViewerOpen(true)}
          onDownload={handleDownload}
        />

        {/* Feedback Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Provide Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Grade Input */}
            <div className="space-y-2">
              <Label htmlFor="grade" className="text-sm font-medium text-gray-700">
                Grade (Optional)
              </Label>
              <Input
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Enter grade (e.g., A, B+, 95%, 8/10, etc.)"
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {/* Feedback Text */}
            <div className="space-y-2">
              <Label htmlFor="feedback" className="text-sm font-medium text-gray-700">
                Written Feedback
              </Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide detailed feedback on the student's work. Be specific about what they did well and areas for improvement..."
                rows={8}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 resize-none"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{feedback.length} characters</span>
                <span>Be specific and constructive</span>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Quick Tags (Optional)</Label>
              <FeedbackTags selectedTags={selectedTags} onTagsChange={setSelectedTags} />
            </div>

            {/* Feedback Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Effective Feedback Tips</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Start with what the student did well</li>
                <li>• Be specific about areas for improvement</li>
                <li>• Provide actionable suggestions</li>
                <li>• Reference specific parts of their work</li>
                <li>• Encourage continued learning</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleSave}
                disabled={isSaving || !hasContent}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving Feedback...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Feedback
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleBack} disabled={isSaving} className="flex-1">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>

            {!hasContent && (
              <p className="text-sm text-gray-500 text-center">
                Please provide a grade, written feedback, or select tags to save.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Submission Viewer Modal */}
        <SubmissionViewerModal
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          imageUrl={feedbackData.submission.imageUrl}
          studentName={feedbackData.student.name}
          onDownload={handleDownload}
        />
      </div>
    </div>
  )
}
