import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('stocksnap_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('stocksnap_user', JSON.stringify(user))
    else localStorage.removeItem('stocksnap_user')
  }, [user])

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload)
    localStorage.setItem('stocksnap_token', data.token)
    setUser(data)
    return data
  }

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload)
    localStorage.setItem('stocksnap_token', data.token)
    setUser(data)
    return data
  }

  const logout = () => {
    localStorage.removeItem('stocksnap_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
