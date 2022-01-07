import { createContext } from "react"

export const AuthContext = createContext({
    token: null,
    userId: null, 
    login: false,
    logout: false,
    isAuthentificated: false
})