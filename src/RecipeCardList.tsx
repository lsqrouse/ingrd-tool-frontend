import RecipeCard from "./RecipeCard"
import { RecipeDef } from "./types"

type RecipeCardListProps = {
    recipes: RecipeDef[];
    selectedDateIdx: number;

};

function RecipeCardList ({recipes, selectedDateIdx}: RecipeCardListProps) {
    return (
        <div className="row">
            {recipes.map((recipe, index) => {
                return (<div className="col"> <RecipeCard key={index} recipeData={recipe}  selectedDateIdx={selectedDateIdx}  /> </div>);
            })}

        </div> 
        )
}

export default RecipeCardList;