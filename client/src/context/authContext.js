import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const test_user = {
    user_id: 1,
    username: 'jim42',
    email: 'jim@email.com',
    firstname: 'Jim',
    middlename: null,
    lastname: 'Bim',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper at lectus eu vulputate. Quisque laoreet neque ac felis accumsan molestie. Donec id ex velit. Cras nec est et purus maximus laoreet.',
    image: 'user-photo.jpg',
    city: 'Pau',
    country: 'France',
    followers: 10000,
    following: 15,
    registered: '2023-11-21'
  }

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || JSON.stringify(test_user))
    // null
  )

  const login = () => {
    // TO DO
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={
        {
          currentUser
          ,login
        }
      }>
      {children}
    </AuthContext.Provider>
  )
}