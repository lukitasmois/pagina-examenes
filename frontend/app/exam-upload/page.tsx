"use client"

import { useState } from "react"
import { Send, MessageSquare } from "lucide-react"
import { Button } from "@src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card"
import { Textarea } from "@src/components/ui/textarea"
import { Label } from "@src/components/ui/label"
import { UploadHeader } from "@src/components/upload-header"
import { FileUploadArea } from "@src/components/file-upload-area"
import { FilePreview } from "@src/components/file-preview"
import { SuccessModal } from "@src/components/success-modal"

// Sample data
const uploadData = {
  student: {
    name: "Alex Chen",
  },
  exam: {
    id: "e1",
    title: "Calculus Integration Quiz - Chapter 5",
    subject: "Advanced Mathematics",
    dueDate: "2025-01-15T23:59:00",
  },
}

export default function ExamUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!selectedFile) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Submitting:", {
      file: selectedFile,
      comment,
      examId: uploadData.exam.id,
    })

    setIsSubmitting(false)
    setShowSuccess(true)
  }

  const handleBack = () => {
    console.log("Navigate back to dashboard")
    // In a real app, you would use router.push() or similar
  }

  const handleBackToDashboard = () => {
    setShowSuccess(false)
    handleBack()
  }

  const canSubmit = selectedFile && !isSubmitting

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <UploadHeader student={uploadData.student} exam={uploadData.exam} onBack={handleBack} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Upload Your Exam</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUploadArea onFileSelect={setSelectedFile} selectedFile={selectedFile} />
              </CardContent>
            </Card>

            {/* Optional Comment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Add a Note (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="comment" className="text-sm font-medium text-gray-700">
                    Message to your teacher
                  </Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add any notes or questions for your teacher..."
                    rows={4}
                    className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                  <p className="text-xs text-gray-500">{comment.length} characters</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Exam
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleBack} disabled={isSubmitting} className="flex-1">
                Cancel
              </Button>
            </div>

            {!selectedFile && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  📝 <strong>Tip:</strong> Make sure your handwriting is clear and the image is well-lit for the best
                  review experience.
                </p>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">{selectedFile && <FilePreview file={selectedFile} />}</div>
        </div>

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          examTitle={uploadData.exam.title}
          onBackToDashboard={handleBackToDashboard}
        />
      </div>
    </div>
  )
}
