import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

const GoalForm = () => {
  const [text,setText] = useState('')
  const dispatch = useDispatch()
  const {goals , isLoading , isError , message} = useSelector((state) => state.goals)
  const onChange = (e) => {
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
     dispatch(createGoal({text}))
     setText('')
  }
  return (
    <section className='form'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor = "text">Goal</label>
          <input type = "text" name="text" id = "text" placeholder = "Enter Goal" value = {text} onChange = {onChange} />
        </div>
        <div className='form-group'>
          <button type = "submit" className = "btn btn-block">Add Goal</button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm