import { configureStore } from '@reduxjs/toolkit'
import weekRecipeListReducer from './slicers/recipeList'
import recipeList from './slicers/recipeList'

export default configureStore({
    reducer: {
        weekRecipeList: weekRecipeListReducer,
    },
})