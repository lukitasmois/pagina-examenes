import { GraduationCap, Home, FileText, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  studentName: string
}

export function DashboardHeader({ studentName }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xl font-bold text-gray-800">MySchool App</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Button variant="ghost" className="text-blue-600 bg-blue-50">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              <FileText className="w-4 h-4 mr-2" />
              My Submissions
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  )
}
