"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, Search, X } from "lucide-react"

import { findRecipesByIngredients } from "@/lib/recipe-service"
import type { Recipe } from "@/types/recipe"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { RecipeCard } from "@/components/recipe-card"

export function RecipeFinder() {
  const [currentIngredient, setCurrentIngredient] = useState("")
  const [ingredients, setIngredients] = useState<string[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const { toast } = useToast()

  const addIngredient = () => {
    const trimmedIngredient = currentIngredient.trim().toLowerCase()

    if (!trimmedIngredient) return

    if (ingredients.includes(trimmedIngredient)) {
      toast({
        title: "Ingredient already added",
        description: "You've already added this ingredient to your list.",
        variant: "destructive",
      })
      return
    }

    if (ingredients.length >= 5) {
      toast({
        title: "Maximum ingredients reached",
        description: "You can only search with up to 5 ingredients at a time.",
        variant: "destructive",
      })
      return
    }

    setIngredients([...ingredients, trimmedIngredient])
    setCurrentIngredient("")
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredient))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addIngredient()
    }
  }

  const searchRecipes = async () => {
    if (ingredients.length < 1) {
      toast({
        title: "No ingredients added",
        description: "Please add at least one ingredient to search for recipes.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    try {
      const results = await findRecipesByIngredients(ingredients)
      setRecipes(results)

      if (results.length === 0) {
        toast({
          title: "No recipes found",
          description: "Try different ingredients or add more to your list.",
        })
      }
    } catch (error) {
      toast({
        title: "Error searching recipes",
        description: "An error occurred while searching for recipes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="mb-8 border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle>What's in your kitchen?</CardTitle>
          <CardDescription>Add 3-5 ingredients you have available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {ingredients.map((ingredient) => (
              <Badge key={ingredient} variant="secondary" className="text-sm py-1.5">
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label={`Remove ${ingredient}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {ingredients.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">No ingredients added yet. Add some below!</p>
            )}
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter an ingredient (e.g., chicken, rice, tomatoes)"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border-gray-300 dark:border-gray-700"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addIngredient}
              disabled={!currentIngredient.trim()}
              className="border-black dark:border-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={searchRecipes}
            disabled={ingredients.length === 0 || isSearching}
            className="w-full bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black"
          >
            {isSearching ? (
              <>Searching...</>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Find Recipes
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {recipes.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
            Found {recipes.length} Recipe{recipes.length !== 1 ? "s" : ""}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} userIngredients={ingredients} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

