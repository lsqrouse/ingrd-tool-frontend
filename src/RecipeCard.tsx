import { useSelector, useDispatch } from 'react-redux'
import { update } from './slicers/recipeList';
import { RecipeDef } from "./types"


type RecipeCardProps = {
    recipeData: RecipeDef;

    selectedDateIdx: number;
};



function RecipeCard({ recipeData, selectedDateIdx}: RecipeCardProps) {
    const weeklyRecipeList = useSelector((state: any) => state.weekRecipeList.value)
    const dispatch = useDispatch()

    const handleOnClick = () => {
        console.log("Setting the thing!")
        if (selectedDateIdx != -1) {
            const updatedRecipeList  = Object.assign([], weeklyRecipeList);
            updatedRecipeList[selectedDateIdx] = recipeData.recipeName
            
            dispatch(update(updatedRecipeList))
        }

        // TODO: 
        // the problem here is because we're setting something in the map, REACT doesn't recognize state has changed, and thus doesn't refresh
    }    
    
    return (
        <div className="recipecard">
            <h1>Recipe Title</h1>
            {recipeData.recipeName}
            <button onClick={() => {handleOnClick()}} />
        </div>
    )
}

export default RecipeCard;