import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'

interface SubmissionViewModalProps {
  isOpen: boolean
  onClose: () => void
  submission: {
    id: string
    student: {
      name: string
    }
    imageUrl?: string
    feedback?: string
    grade?: string
    status: string
  }
}

export function SubmissionViewModal({ isOpen, onClose, submission }: SubmissionViewModalProps) {
  // In a real app, you would use the actual image URL
  const imageUrl = submission.imageUrl || "/placeholder.svg?height=800&width=600"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {submission.student.name}'s Submission
            {submission.grade && (
              <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                Grade: {submission.grade}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row h-full gap-4 overflow-hidden">
          {/* Image Viewer */}
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="bg-gray-100 rounded-md p-2 mb-2 flex justify-between">
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" title="Zoom In">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Zoom Out">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Rotate">
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" title="Download">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
            <div className="flex-1 overflow-auto bg-gray-50 rounded-md border border-gray-200">
              <div className="flex items-center justify-center h-full">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt={`${submission.student.name}'s submission`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Feedback Panel */}
          {submission.feedback && (
            <div className="w-full md:w-64 flex-shrink-0 overflow-auto">
              <div className="bg-gray-50 rounded-md p-4 border border-gray-200 h-full">
                <h3 className="font-medium text-gray-800 mb-2">Teacher Feedback</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{submission.feedback}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
