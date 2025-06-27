import { createSlice } from '@reduxjs/toolkit'

export const selectedDate = createSlice({
  name: 'selectedDate',
  
  initialState: {
    value: Date,
  },
  reducers: {
    updateSelectedDate: (state, action) => {
        state.value = action.payload
        console.log("Updated state!")
    },
  },
})

// Action creators are generated for each case reducer function
export const {  updateSelectedDate } = selectedDate.actions

export default selectedDate.reducer