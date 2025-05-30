import { GraduationCap, LayoutDashboard, FileText, User, Bell } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"

interface TeacherHeaderProps {
  teacherName: string
}

export function TeacherHeader({ teacherName }: TeacherHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xl font-bold text-gray-800">MySchool Teacher</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Button variant="ghost" className="text-green-600 bg-green-50">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-green-600">
              <FileText className="w-4 h-4 mr-2" />
              Submissions
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-green-600">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </nav>

          {/* Notifications */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                3
              </Badge>
            </Button>
            <div className="hidden md:block text-sm text-gray-600">
              Welcome, <span className="font-medium">{teacherName}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
