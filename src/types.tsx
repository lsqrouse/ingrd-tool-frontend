export type IngredientDef = {
    id: number,
    ingredientName: string,
    ttl: string
}

export type RecipeIngredient = {
    id: number,
    quantity: number,
    ingredientDef: IngredientDef
}

export type RecipeDef = {
    id: number,
    recipeName: string,
    types: string[],
    ingredientList: RecipeIngredient[]
}

export type RecipeDay = {
    date: Date,
    scheduledRecipe: string
}


