type RecipeCardProps = {
    recipeData: string;
};

function RecipeCard({ recipeData }: RecipeCardProps) {
        return (
        <div className="recipecard">
            <h1>Recipe Title</h1>
            {recipeData}
        </div>
    )
}

export default RecipeCard;