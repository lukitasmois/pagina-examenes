"use client"

import { useState } from "react"
import { Calendar, FileText, Upload, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CreateExamModalProps {
  isOpen: boolean
  onClose: () => void
  subjectName: string
  onCreateExam: (examData: any) => void
}

export function CreateExamModal({ isOpen, onClose, subjectName, onCreateExam }: CreateExamModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    dueDate: "",
    file: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateExam(formData)
    setFormData({ title: "", instructions: "", dueDate: "", file: null })
    onClose()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData({ ...formData, file })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Create New Exam - {subjectName}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Exam Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Exam Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Chapter 5 Quiz - Algebra"
              required
              className="border-gray-200 focus:border-green-400 focus:ring-green-400"
            />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-sm font-medium text-gray-700">
              Instructions
            </Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              placeholder="Provide detailed instructions for students..."
              rows={4}
              className="border-gray-200 focus:border-green-400 focus:ring-green-400"
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
              Due Date *
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="dueDate"
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
                className="pl-10 border-gray-200 focus:border-green-400 focus:ring-green-400"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file" className="text-sm font-medium text-gray-700">
              Exam File (Optional)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <div className="text-sm text-gray-600 mb-2">
                Upload exam file (PDF, DOC, etc.)
              </div>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
              />
              <Label
                htmlFor="file"
                className="cursor-pointer bg-green-50 text-green-600 px-4 py-2 rounded-md hover:bg-green-100 transition-colors"
              >
                Choose File
              </Label>
              {formData.file && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected: {formData.file.name}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              <FileText className="w-4 h-4 mr-2" />
              Create Exam
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
