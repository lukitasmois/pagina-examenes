"use client"

import LoginScreen from "@/src/pages/login/login-screen"
import {  useAuthContext } from "@/src/components/context/AuthContext"
import CreateExamForm from "@/src/pages/create-exam-form"
import StudentDashboard from "@/src/pages/dashboards/student-dashboard"
import TeacherDashboard from "@/src/pages/dashboards/teacher-dashboard"

export default function Page() {
  const {userLogged, loading} = useAuthContext()

  if (loading) {
  return <div className="w-screen h-screen flex items-center justify-center">Cargando...</div>;
}


  return (
    <div>
      {userLogged.logged ? (
        userLogged.user.role === 'STUDENT' ? (
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
