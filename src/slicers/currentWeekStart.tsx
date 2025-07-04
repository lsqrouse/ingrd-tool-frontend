import { createSlice } from '@reduxjs/toolkit'
import { startOfWeek} from "date-fns";

// truncate our current date to just the day, then get the beginning of its week
const parseCurrentStart = () => {
  let today = new Date();
  today = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate())
    
    return startOfWeek(today)
}
export const currentWeekStart = createSlice({
  name: 'selectedDate',
  
  initialState: {
    value: parseCurrentStart(),
  },
  reducers: {
    updateCurrentWeekStart: (state, action) => {
        state.value = action.payload
        console.log("Updated state!")
    },
  },
})

// Action creators are generated for each case reducer function
export const {  updateCurrentWeekStart } = currentWeekStart.actions

export default currentWeekStart.reducer