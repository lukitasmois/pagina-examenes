"use client"

import { useState } from "react"
import { ZoomIn, ZoomOut, RotateCw, Download, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

interface SubmissionViewerProps {
  imageUrl: string
  examTitle: string
}

export function SubmissionViewer({ imageUrl, examTitle }: SubmissionViewerProps) {
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 300))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 25))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleReset = () => {
    setZoom(100)
    setRotation(0)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = `${examTitle.replace(/\s+/g, "_")}_submission.jpg`
    link.click()
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800">Your Submission</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-60px)]">
        {/* Toolbar */}
        <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 25}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-gray-600 min-w-[60px] text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 300}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleRotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 overflow-auto bg-gray-100 h-full">
          <div className="flex items-center justify-center min-h-full p-4">
            <div
              className="transition-transform duration-200 ease-in-out"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: "center center",
              }}
            >
              <img
                src={imageUrl || "/placeholder.svg?height=800&width=600"}
                alt="Your exam submission"
                className="max-w-none shadow-lg rounded-lg"
                style={{
                  maxHeight: isFullscreen ? "90vh" : "70vh",
                  width: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
