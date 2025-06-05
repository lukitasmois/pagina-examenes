"use client"

import {createContext, useContext, useState, useEffect} from "react"
import axios from "axios";

const AuthContext = createContext();

const useAuthContext = () =>{
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const [userLogged, setUserLogged] = useState({
        user: {_id: "", username: "", rol: "ESTUDIANTE"},
        logged: false
    })

    async function fetchUserLogged() {
        try{
            const response = await axios.post('http://localhost:3000/api/users/user-logged', userLogged,
                {
                    withCredentials: true
                }
            )
            console.log("Contenido completo de la respuesta:", response);            
            setUserLogged(response.data)
        } catch (error) {
            console.error("Error al verificar la sesion del usuario: ", error);
        } finally {

        }
    }

    function updateUserLogged(newUser){
        setUserLogged((prevState) => ({
            ...prevState,
            user: newUser 
        }))
    }

    useEffect(() =>{
        fetchUserLogged()
    }, [])

    return(
        <AuthContext.Provider
            value={{
                userLogged,
                setUserLogged,
                fetchUserLogged,
                updateUserLogged
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider, useAuthContext}