export type IngredientDef = {
    id: number,
    ingredientName: string,
    ttl: string
}

export type Ingredient = {
    id: number,
    ingredientDef: IngredientDef,
    expirationDate: Date,
    quantity: number
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

export type ScheduledRecipe = {
    scheduledDate: Date
    recipeDef: RecipeDef
}


