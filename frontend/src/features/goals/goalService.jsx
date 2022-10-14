import React from 'react'
import axios from 'axios'
const createGoal = (goalData,token) => {
  const config = {
    headers: {
      Authorization : `Bearer ${token}`
    }
  }
  const res = axios.post(`/api/goals`, goalData , config)
  return res.data
}

const deleteGoal = (goalId,token) => {
  const config = {
    headers: {
      Authorization : `Bearer ${token}`
    }
  }
  const res = axios.delete(`/api/goals/${goalId}` , config)
  return res.data
}

const getGoals = (token) => {
  const config = {
    headers: {
      Authorization : `Bearer ${token}`
    }
  }
  const res = axios.get(`/api/goals` , config)
  return res.data
}
const goalService = {createGoal , getGoals , deleteGoal}

export default goalService