"use client"

import LoginScreen from "@/src/pages/login/login-screen"
import {  useAuthContext } from "@/src/components/context/AuthContext"
import CreateExamForm from "@/src/pages/create-exam-form"
import StudentDashboard from "@/src/pages/dashboards/student-dashboard"
import TeacherDashboard from "@/src/pages/dashboards/teacher-dashboard"

export default function Page() {
  const {userLogged, setUserLogged} = useAuthContext()

  return (
    <div>
      {userLogged.logged ? (
        userLogged.rol === 'ESTUDIANTE' ? (
          <StudentDashboard></StudentDashboard>
        ) : (
          <TeacherDashboard></TeacherDashboard>
        )
      ) : (
        <LoginScreen />
      )}
    </div>
  )
}
