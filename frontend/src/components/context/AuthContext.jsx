"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState({
    user: { _id: "", username: "", rol: "ESTUDIANTE" },
    logged: false,
  })

  const [loading, setLoading] = useState(true) // <- nuevo estado

  async function fetchUserLogged() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/user-logged",
        userLogged,
        { withCredentials: true }
      )
      console.log("Contenido completo de la respuesta:", response)
      setUserLogged(response.data)
    } catch (error) {
      console.error("Error al verificar la sesión del usuario: ", error)
      setUserLogged({
        user: { _id: "", username: "", rol: "ESTUDIANTE" },
        logged: false,
      })
    } finally {
      setLoading(false) // <- se terminó de verificar
    }
  }

  function updateUserLogged(newUser) {
    setUserLogged((prevState) => ({
      ...prevState,
      user: newUser,
    }))
  }

  useEffect(() => {
    fetchUserLogged()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        userLogged,
        setUserLogged,
        fetchUserLogged,
        updateUserLogged,
        loading, // <- lo exponemos al contexto
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider, useAuthContext }
