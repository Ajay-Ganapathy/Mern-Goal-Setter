import React from 'react'
import { Link } from 'react-router-dom'
import {FaSignInAlt, FaSignOutAlt,FaUser} from "react-icons/fa"
import { useSelector , useDispatch } from 'react-redux'
import { logout , reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/")
  }
  return (
    <header className = "header"> 

      <div className = "logo">
        <Link to = "/">Goal Setter</Link>
      </div>
      <ul>
        <li>
          {
            user? <button className='btn' onClick = {onLogout}>
            <FaSignInAlt /> Logout
          </button>: <Link to = "/login" className='btn' >
            <FaSignInAlt /> Login
          </Link>
          }
          
        </li>

        <li>
          <Link to = "/register">
            <FaUser /> Register
          </Link>
        </li>
      </ul>

    </header>
  )
}

export default Header