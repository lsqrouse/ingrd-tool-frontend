import RecipeCard from "./RecipeCard"
import { RecipeDef } from "../types"
import { Key } from "react";

type RecipeCardListProps = {
    recipes: RecipeDef[];
    updateDataFunc: () => void;
};

function RecipeCardList ({recipes, updateDataFunc}: RecipeCardListProps) {
    return (
        <div className="row">
            {recipes.map((recipe, index) => {
                return (<div className="col" key={ index as unknown as Key}> <RecipeCard recipeData={recipe} updateFunc={updateDataFunc}/> </div>);
            })}

        </div> 
        )
}

export default RecipeCardList;