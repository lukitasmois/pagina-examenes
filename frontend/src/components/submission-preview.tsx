"use client"

import { Eye, Download } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"

interface SubmissionPreviewProps {
  imageUrl: string
  studentName: string
  submittedAt: string
  onViewFull: () => void
  onDownload: () => void
}

export function SubmissionPreview({
  imageUrl,
  studentName,
  submittedAt,
  onViewFull,
  onDownload,
}: SubmissionPreviewProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
              <img
                src={imageUrl || "/placeholder.svg?height=80&width=80"}
                alt={`${studentName}'s submission`}
                className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onViewFull}
              />
            </div>
          </div>

          {/* Submission Info */}
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">Submission</h3>
            <p className="text-sm text-gray-600">
              Submitted on {new Date(submittedAt).toLocaleDateString()} at {new Date(submittedAt).toLocaleTimeString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onViewFull}>
              <Eye className="h-4 w-4 mr-1" />
              View Full
            </Button>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
