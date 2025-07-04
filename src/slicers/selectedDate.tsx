import { createSlice } from '@reduxjs/toolkit'

export const selectedDate = createSlice({
  name: 'selectedDate',
  
  initialState: {
    value: Date,
  },
  reducers: {
    updateSelectedDate: (state, action) => {
      console.log("Updated selected date from ", state.value, "to", action.payload )

      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {  updateSelectedDate } = selectedDate.actions

export default selectedDate.reducer