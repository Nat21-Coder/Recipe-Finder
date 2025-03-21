export interface Recipe {
  id: string
  title: string
  ingredients: string[]
  instructions: string[]
  cookTime: number
  prepTime: number
  totalTime: number
  servings: number
  cuisine: string
  course: string
  image?: string
  url: string
  matchedIngredients?: number
}

