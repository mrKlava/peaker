import { createContext, useEffect, useState } from "react";
import { httpRequest } from "../axios";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  )

  const login = async (cred) => {
   try {
    const resp = await httpRequest.post("/auth/login", cred, { withCredentials: true,})

    setCurrentUser(resp.data)
   } catch (err) {
    console.log(err)
   }
  }

  const logout = async () => {

    try {
      await httpRequest.post('/auth/logout')
      localStorage.setItem("user", null)
      setCurrentUser(null)
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