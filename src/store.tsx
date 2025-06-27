import { configureStore } from '@reduxjs/toolkit'
import selectedDateReducer from './slicers/selectedDate'
import currentWeekStartReducer from './slicers/currentWeekStart'

export default configureStore({
    reducer: {
        selectedDate: selectedDateReducer,
        currentWeekStart: currentWeekStartReducer
        
    },
})
