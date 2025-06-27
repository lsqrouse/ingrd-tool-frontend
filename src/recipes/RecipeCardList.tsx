import RecipeCard from "./RecipeCard"
import { RecipeDef } from "../types"
import { Key } from "react";

type RecipeCardListProps = {
    recipes: RecipeDef[];
};

function RecipeCardList ({recipes}: RecipeCardListProps) {
    return (
        <div className="row">
            {recipes.map((recipe, index) => {
                return (<div className="col" key={ index as unknown as Key}> <RecipeCard recipeData={recipe} /> </div>);
            })}

        </div> 
        )
}

export default RecipeCardList;