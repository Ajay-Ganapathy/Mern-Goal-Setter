import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import {useSelector , useDispatch} from "react-redux"
import GoalForm from '../components/GoalForm';
import { getGoals } from '../features/goals/goalSlice';
import { reset } from '../features/goals/goalSlice';
import Spinner from "../components/Spinner"
import GoalItem from '../components/GoalItem';
import {toast} from "react-toastify" 

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)
  const {goals , isLoading , isError , message , isSuccess} = useSelector((state) => state.goals)
  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess){
      toast.success("Added Successfully")
    }
    if(!user){
      navigate("/login")
    }

    dispatch(getGoals())
    return () => {
      dispatch(reset())
    } 
  },[user , navigate , isError , dispatch, message])

  if(isLoading){
    return <Spinner />
  }
  return (
    <>

    <section className='heading'>
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
      <GoalForm />
     
    </section>
    
    </>
  )
}

export default Dashboard