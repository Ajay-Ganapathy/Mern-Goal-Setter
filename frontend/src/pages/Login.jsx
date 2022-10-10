import React from 'react'
import { useState , useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify" 
import { login , reset} from '../features/auth/authSlice'
import {FaSignInAlt, FaSignOutAlt,FaUser} from "react-icons/fa"
import Spinner from '../components/Spinner'
const Login = () => {
  const [formData,setFormData] = useState({
    email : '',
    password : '',
  })

  const {email,password} = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user , isLoading , isSuccess , isError , message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate("/")
    }
    dispatch(reset())

  },[user,isError,isSuccess , message,navigate , dispatch])
  

  const onChange = (e) => {
    setFormData((prevstate) => ({
      ...prevstate,
      [e.target.name] : e.target.value,
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
     email,password
    }
    dispatch(login(userData))
  }
  if(isLoading){
    return <Spinner />
  }
  return (
    <>
    <section className = "heading">
      <h1><FaSignInAlt /> Login</h1>
      <p>Login and start setting goals</p>
    </section>
    <section>
      <form onSubmit={handleSubmit}>
       

        <div className="form-group">

        <input 
          type = "email"
          name = "email"
          id = "email"
          className='form-control'
          value = {email}
          placeholder = "Enter the email"
          onChange = {onChange}
          />

        </div>

        <div className="form-group">

        <input 
          type = "password"
          name = "password"
          id = "password"
          className='form-control'
          value = {password}
          placeholder = "Enter the password"
          onChange = {onChange}
          />

        </div>

        <div className='form-group'>
          <button type = "submit" className = "btn btn-block">Login</button>
        </div>
        
      </form>
    </section>
    </>
  )
}

export default Login