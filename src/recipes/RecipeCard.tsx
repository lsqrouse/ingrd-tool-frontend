import { useSelector, useDispatch } from 'react-redux'
import { RecipeDef } from "../types"


type RecipeCardProps = {
    recipeData: RecipeDef;
    updateFunc: () => void;
};


// displays informatio for a single recipe. Also includes functionality to schedule that recipe on the selected day
function RecipeCard({ recipeData, updateFunc}: RecipeCardProps) {
    const selectedDate = useSelector((state: any) => state.selectedDate.value)
    const dispatch = useDispatch();

    const handleScheduleRecipe = () => {
        if (selectedDate == null) {
            console.log("No Date Currently Selected!")
            return;
        }
        console.log("Querying Backend to schedule recipe on ", selectedDate)
        fetch(`http://localhost:8080/api/scheduledRecipes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            recipeDefId :recipeData.id,
            scheduledDate: selectedDate
        }),
        
        credentials: "include", // Needed if using cookies/authentication
        })
        .then((response) => {
            console.log("Calling update function")
            updateFunc()
        })
        
    }    
    
    return (
        <div className="recipecard" >
            <h1>Recipe Title</h1>
            {recipeData.recipeName}
            <button onClick={() => {handleScheduleRecipe()}}>Schedule Recipe for Selected Day </button>
        </div>
    )
}

export default RecipeCard;