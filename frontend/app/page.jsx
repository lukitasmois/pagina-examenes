"use client"

import LoginScreen from "@/src/pages/login/login-screen"
import {  useAuthContext } from "@/src/components/context/AuthContext"
import CreateExamForm from "@/src/pages/create-exam-form"
import StudentDashboard from "@/src/pages/dashboards/student-dashboard"
import TeacherDashboard from "@/src/pages/dashboards/teacher-dashboard"

export default function Page() {
  const {userLogged, setUserLogged} = useAuthContext()
  console.log('userLogged', userLogged);
  
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
