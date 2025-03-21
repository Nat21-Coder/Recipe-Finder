import type { Recipe } from "@/types/recipe"
import { recipeData } from "@/data/recipes"

export async function findRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Filter recipes based on ingredients
  const matchedRecipes = recipeData
    .map((recipe) => {
      // Count how many of the user's ingredients match this recipe
      const matchedCount = recipe.ingredients.filter((recipeIng) =>
        ingredients.some((userIng) => recipeIng.toLowerCase().includes(userIng.toLowerCase())),
      ).length

      // Only include recipes that match at least one ingredient
      return {
        ...recipe,
        matchedIngredients: matchedCount,
      }
    })
    .filter((recipe) => recipe.matchedIngredients > 0)

  // Sort by number of matched ingredients (descending)
  return matchedRecipes.sort((a, b) => (b.matchedIngredients || 0) - (a.matchedIngredients || 0))
}

