import { createContext, useEffect, useState } from "react";
import { httpRequest } from "../axios";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  )

  const login = async (cred) => {
    const resp = await httpRequest.post("/auth/login", cred, {
      withCredentials: true,
    })

    console.log(resp)

    setCurrentUser(resp.data)
  }

  const logout = async () => {

    try {
      await httpRequest.post('/auth/logout')
      localStorage.setItem("user", null)
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={
      {
        currentUser
        , login
        , logout
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}