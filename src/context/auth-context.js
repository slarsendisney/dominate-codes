import React, { useContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import Login from "../components/login/Login"
export const isBrowser = () => typeof window !== "undefined"

const AuthContext = React.createContext()

export const AuthProvider = ({ ...props }) => {
  const [user, setUser] = useLocalStorage("user", {})

  const isLoggedIn = !!user.email

  if (!isLoggedIn) {
    return <Login setUser={setUser} />
  }
  const logout = () => {
      setUser({})
  }

  const name = user.name || user.displayName || "Unknown."

  return <AuthContext.Provider value={{ user, isLoggedIn, logout, name}} {...props} />
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
