import { createSlice } from '@reduxjs/toolkit'

export const weekRecipeListSlice = createSlice({
  name: 'weekRecipeList',
  
  initialState: {
    value: new Array<string>(7),
  },
  reducers: {
    update: (state, action) => {
        state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {  update } = weekRecipeListSlice.actions

export default weekRecipeListSlice.reducer