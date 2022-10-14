import React from 'react'
import axios from "axios"


// Registering a user

const register = async (userData) => {
  const res = await axios.post(`http:localhost:5000/api/users/`, userData)
  if(res.data){
    localStorage.setItem("user", JSON.stringify(res.data))
  }
  return res.data
}

const login = async (userData) => {
  const res = await axios.post(`/api/users/login`, userData)
  if(res.data){
    localStorage.setItem("user", JSON.stringify(res.data))
  }
  return res.data
}

const logout = async () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login
}

export default authService