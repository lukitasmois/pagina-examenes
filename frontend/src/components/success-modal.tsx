"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  examTitle: string
  onBackToDashboard: () => void
}

export function SuccessModal({ isOpen, onClose, examTitle, onBackToDashboard }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-xl font-bold text-gray-800">Submission Successful!</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Your exam "<span className="font-medium">{examTitle}</span>" has been submitted successfully.
          </p>
          <p className="text-sm text-gray-500">Your teacher will review your submission and provide feedback soon.</p>

          <Button onClick={onBackToDashboard} className="w-full bg-green-600 hover:bg-green-700 text-white">
            Back to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
