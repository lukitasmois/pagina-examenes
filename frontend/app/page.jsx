"use client"

import LoginScreen from "@/src/pages/login/login-screen"
import {  useAuthContext } from "@/src/components/context/AuthContext"
import CreateExamForm from "@/src/pages/create-exam-form"

export default function Page() {
  const {userLogged, setUserLogged} = useAuthContext()
  return <CreateExamForm></CreateExamForm>
  // return (
  //   <div>
  //     {userLogged.logged ? (
  //       <h1>
  //         hola
  //       </h1>
  //     ) : (
  //       <LoginScreen />
  //     )}
  //   </div>
  // )
}
