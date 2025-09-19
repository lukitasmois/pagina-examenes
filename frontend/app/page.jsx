"use client"

import {  useAuthContext } from "@src/components/context/AuthContext"
import StudentDashboard from "./student-dashboard/page";
import TeacherDashboard from "./teacher-dashboard/page";
import LoginScreen from "./login/page";

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
        <LoginScreen/>
      )}
    </div>
  )
}
