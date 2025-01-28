import RecipeCard from "./RecipeCard"

type RecipeCardListProps = {
    recipes: string[];
};

function RecipeCardList ({recipes}: RecipeCardListProps) {
    return (
        <div className="row">
            {recipes.map((recipe, index) => {
                return (<div className="col"> <RecipeCard key={index} recipeData={recipe} /> </div>);
            })}

        </div> 
        )
}

export default RecipeCardList;