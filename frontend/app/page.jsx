"use client"

import LoginScreen from "@/src/pages/login/login-screen"
import {  useAuthContext } from "@/src/components/context/AuthContext"

export default function Page() {
  const {userLogged, setUserLogged} = useAuthContext()
  
  return (
    <div>
      {userLogged.logged ? (
        <h1>
          hola
        </h1>
      ) : (
        <LoginScreen />
      )}
    </div>
  )
}
