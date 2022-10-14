import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService";
const initialState = {
  goals : [],
  isError : false,
  isSuccess : false,
  isLoading : false,
  message : ""
}

// Create a goal

export const createGoal = createAsyncThunk("goals/create",async (goalData,ThunkAPI) => {
  try{
    const token = ThunkAPI.getState().auth.user.token;
    return await goalService.createGoal(goalData,token);
   // console.log(user);
  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();

    return ThunkAPI.rejectWithValue(message)
  }
})

// Delete a goal

export const deleteGoal = createAsyncThunk("goals/delete",async (goalData,ThunkAPI) => {
  try{
    const token = ThunkAPI.getState().auth.user.token;
    return await goalService.deleteGoal(goalData,token);
   // console.log(user);
  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();

    return ThunkAPI.rejectWithValue(message)
  }
})

// Get goals

export const getGoals = createAsyncThunk("goals/getAll",async (_,ThunkAPI) => {
  try{
    const token = ThunkAPI.getState().auth.user.token;
    return await goalService.getGoals(token);
  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();

    return ThunkAPI.rejectWithValue(message)
  }
})



export const goalSlice = createSlice({
  name : "goals",
  initialState,
  reducers : {
    reset : (state) => initialState
  },
  extraReducers : (builder) => {
    builder.addCase(createGoal.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createGoal.fulfilled , (state,actions) => {
      state.isLoading = false
      state.isSuccess = true
      state.goals.push(actions.payload)
    })
    .addCase(createGoal.rejected , (state,action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(getGoals.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getGoals.fulfilled , (state,action) => {
      state.isLoading = false
      state.isSuccess = true
      state.goals = action.payload;
    })
    .addCase(getGoals.rejected , (state,action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(deleteGoal.pending, (state) => {
      state.isLoading = true
    })
    .addCase(deleteGoal.fulfilled , (state,action) => {
      state.isLoading = false
      state.isSuccess = true
      state.goals = state.goals.filter((g) => g._id !== action.payload.id);
    })
    .addCase(deleteGoal.rejected , (state,action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })

  }

})

export const {reset} = goalSlice.actions
export default goalSlice.reducer