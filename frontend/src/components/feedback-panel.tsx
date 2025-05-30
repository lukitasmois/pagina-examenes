"use client"

import { useState } from "react"
import { Save, CheckCircle, MessageSquare } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Textarea } from "../components/ui/textarea"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Badge } from "../components/ui/badge"

interface FeedbackPanelProps {
  initialFeedback?: string
  initialGrade?: string
  studentName: string
  isReviewed: boolean
  onSaveFeedback: (feedback: string, grade: string) => void
}

export function FeedbackPanel({ 
  initialFeedback = "", 
  initialGrade = "", 
  studentName, 
  isReviewed,
  onSaveFeedback 
}: FeedbackPanelProps) {
  const [feedback, setFeedback] = useState(initialFeedback)
  const [grade, setGrade] = useState(initialGrade)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    onSaveFeedback(feedback, grade)
    setIsSaving(false)
  }

  const hasChanges = feedback !== initialFeedback || grade !== initialGrade

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Teacher Feedback
          </CardTitle>
          {isReviewed && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Reviewed
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Grade Input */}
        <div className="space-y-2">
          <Label htmlFor="grade" className="text-sm font-medium text-gray-700">
            Grade
          </Label>
          <Input
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Enter grade (e.g., A, B+, 95%, etc.)"
            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        {/* Feedback Textarea */}
        <div className="space-y-2">
          <Label htmlFor="feedback" className="text-sm font-medium text-gray-700">
            Feedback for {studentName}
          </Label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Provide detailed feedback on the student's work..."
            rows={12}
            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 resize-none"
          />
          <p className="text-xs text-gray-500">
            {feedback.length} characters
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleSave}
            disabled={isSaving || (!hasChanges && !feedback && !grade)}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isReviewed ? "Update Feedback" : "Save Feedback & Mark as Reviewed"}
              </>
            )}
          </Button>
          
          {hasChanges && (
            <p className="text-xs text-orange-600 text-center">
              You have unsaved changes
            </p>
          )}
        </div>

        {/* Feedback Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Feedback Guidelines</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Be specific about what the student did well</li>
            <li>• Provide constructive suggestions for improvement</li>
            <li>• Reference specific parts of their work</li>
            <li>• Encourage continued learning and growth</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
