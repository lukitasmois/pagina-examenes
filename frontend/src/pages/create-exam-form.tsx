"use client"

import type React from "react"

import { useState } from "react"
import { Save, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { CreateExamHeader } from "../components/create-exam-header"
import { SubjectSelect } from "../components/subject-select"
import { DateTimePicker } from "../components/date-time-picker"
import { ToastContainer, toast } from 'react-toastify';

export default function CreateExamForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    dueDate: undefined as Date | undefined,
    instructions: "",
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBack = () => {
    console.log("Navigate back to exams list")
    // In a real app, you would use router.push() or similar
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error("Por favor seleccione ingrese un titulo para el examen.");
    }

    if (!formData.subject) {
      toast.error("Por favor seleccione una materia.");
    }

    if (!formData.dueDate) {
      toast.error("Por favor seleccione una fecha de entrega.");
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form submitted:", formData)

      // toast({
      //   title: "Exam Created",
      //   description: "The exam has been successfully created.",
      // })

      // Reset form or redirect
      handleBack()
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "There was a problem creating the exam. Please try again.",
      //   variant: "destructive",
      // })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <CreateExamHeader onBack={handleBack} />

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Exam Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Exam Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Exam Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g., Integration Quiz - Chapter 5"
                  className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject *
                </Label>
                <SubjectSelect value={formData.subject} onChange={(value) => handleChange("subject", value)} />
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
                  Due Date *
                </Label>
                <DateTimePicker value={formData.dueDate} onChange={(date) => handleChange("dueDate", date)} />
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <Label htmlFor="instructions" className="text-sm font-medium text-gray-700">
                  Instructions (Optional)
                </Label>
                <Textarea
                  id="instructions"
                  value={formData.instructions}
                  onChange={(e) => handleChange("instructions", e.target.value)}
                  placeholder="Add any special instructions or notes for students..."
                  rows={4}
                  className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 resize-none"
                />
                <p className="text-xs text-gray-500">
                  Brief instructions for students. This is not for uploading the full exam content.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Exam...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Create Exam
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={handleBack} disabled={isSubmitting} className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-blue-800 mb-2">About Creating Exams</h3>
            <p className="text-sm text-blue-700">
              This form creates a placeholder where students can upload their completed exams. Students will see this
              exam in their dashboard and can submit photos or scans of their work before the due date.
            </p>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </div>
  )
}
