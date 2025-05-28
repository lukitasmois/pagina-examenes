import { GraduationCap, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LoginScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* App Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">MySchool App</h1>
          <p className="text-gray-600 text-sm">Welcome back! Please sign in to continue.</p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <h2 className="text-xl font-semibold text-center text-gray-700">Sign In</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4">
              {/* Email/Username Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email or Username
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email or username"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Login
              </Button>
            </form>

            {/* Forgot Password Link */}
            <div className="text-center">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
              >
                Forgot your password?
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">© 2025 MySchool</p>
        </div>
      </div>
    </div>
  )
}
