"use client"

import { useState } from "react"
import { Eye, Download } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"

interface FilePreviewProps {
  file: File
}

export function FilePreview({ file }: FilePreviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const generatePreview = () => {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return url
    }
    return null
  }

  const handlePreview = () => {
    generatePreview()
    setIsModalOpen(true)
  }

  const handleDownload = () => {
    const url = URL.createObjectURL(file)
    const a = document.createElement("a")
    a.href = url
    a.download = file.name
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">File Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {file.type.startsWith("image/") ? (
            <div className="space-y-3">
              <div className="w-full h-48 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                <img
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handlePreview} className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View Full Size
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 font-bold text-lg">PDF</span>
              </div>
              <p className="text-gray-600 mb-4">PDF preview not available</p>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Download to View
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Full Size Preview Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>File Preview - {file.name}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto bg-gray-50 rounded-md border border-gray-200">
            <div className="flex items-center justify-center h-full p-4">
              {previewUrl && (
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Full size preview"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
