"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react"

interface SubmissionViewerModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  studentName: string
  onDownload: () => void
}

export function SubmissionViewerModal({
  isOpen,
  onClose,
  imageUrl,
  studentName,
  onDownload,
}: SubmissionViewerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">{studentName}'s Submission</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-2 mb-4 flex justify-between">
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
            <Button variant="ghost" size="sm" onClick={onDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>

          {/* Image Container */}
          <div className="flex-1 overflow-auto bg-gray-50 rounded-md border border-gray-200">
            <div className="flex items-center justify-center h-full p-4">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={`${studentName}'s submission`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
