import React from 'react'
import { useState , useEffect } from 'react'
import {FaSignInAlt, FaSignOutAlt,FaUser} from "react-icons/fa"
const Register = () => {
  const [formData,setFormData] = useState({
    name : '',
    email : '',
    password : '',
    cpassword : ''
  })

  const {name,email,password,cpassword} = formData;

  const onChange = (e) => {
    setFormData((prevstate) => ({
      ...prevstate,
      [e.target.name] : e.target.value,
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
    <section className = "heading">
      <h1><FaUser /> Register</h1>
      <p>Please Create an Account</p>
    </section>
    <section>
      <form onSubmit={handleSubmit}>
        <div className="form-group">

        <input 
          type = "text"
          name = "name"
          id = "name"
          className='form-control'
          value = {name}
          placeholder = "Enter the Name"
          onChange = {onChange}
          />

        </div>

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

        <div className="form-group">

        <input 
          type = "password"
          name = "cpassword"
          id = "cpassword"
          className='form-control'
          value = {cpassword}
          placeholder = "Confirm password"
          onChange = {onChange}
          />

        </div>

        <div className='form-group'>
          <button type = "submit" className = "btn btn-block">Submit</button>
        </div>
        
      </form>
    </section>
    </>
  )
}

export default Register