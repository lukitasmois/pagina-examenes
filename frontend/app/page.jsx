"use client"

import LoginScreen from "@/src/pages/login/login-screen"
import {  useAuthContext } from "@/src/components/context/AuthContext"
import CreateExamForm from "@/src/pages/create-exam-form"

export default function Page() {
  const {userLogged, setUserLogged} = useAuthContext()

  return (
    <div>
      {userLogged.logged ? (
        <CreateExamForm></CreateExamForm>
      ) : (
        <LoginScreen />
      )}
    </div>
  )
}
