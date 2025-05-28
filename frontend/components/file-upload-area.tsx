"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, FileText, ImageIcon, X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FileUploadAreaProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
}

export function FileUploadArea({ onFileSelect, selectedFile }: FileUploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]
  const maxFileSize = 10 * 1024 * 1024 // 10MB

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return "Please upload a JPG, PNG, or PDF file."
    }
    if (file.size > maxFileSize) {
      return "File size must be less than 10MB."
    }
    return null
  }

  const handleFileSelect = useCallback(
    (file: File) => {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }
      setError(null)
      onFileSelect(file)
    },
    [onFileSelect],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removeFile = () => {
    onFileSelect(null)
    setError(null)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />
    }
    return <FileText className="h-8 w-8 text-red-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (selectedFile) {
    return (
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getFileIcon(selectedFile)}
              <div>
                <p className="font-medium text-gray-800">{selectedFile.name}</p>
                <p className="text-sm text-gray-600">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={removeFile} className="text-gray-500 hover:text-red-500">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload className={`h-12 w-12 ${error ? "text-red-400" : "text-gray-400"}`} />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Upload Your Exam</h3>
              <p className="text-gray-600 mb-4">Drag and drop your file here, or click to browse</p>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <span className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </span>
                </Button>
              </label>
            </div>

            <div className="text-xs text-gray-500">
              <p>Supported formats: JPG, PNG, PDF</p>
              <p>Maximum file size: 10MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  )
}
