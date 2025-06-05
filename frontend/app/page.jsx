"use client"

import LoginScreen from "@/src/pages/login/login-screen"
import {  useAuthContext } from "@/src/components/context/AuthContext"
import StudentDashboard from "@/src/pages/student/dashboard/student-dashboard"

export default function Page() {
  const {userLogged, setUserLogged} = useAuthContext()
  
  return (
    <div>
      {userLogged.logged ? (
        userLogged.user.role == "STUDENT" ? (
          <StudentDashboard>
            
          </StudentDashboard>
        ) : (
          <h1>
            Hola otro
          </h1>
        )
      ) : (
        <LoginScreen />
      )}
    </div>
  )
}
