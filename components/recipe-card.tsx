"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock, Users } from "lucide-react"

import type { Recipe } from "@/types/recipe"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RecipeDetailModal } from "@/components/recipe-detail-modal"

interface RecipeCardProps {
  recipe: Recipe
  userIngredients: string[]
}

export function RecipeCard({ recipe, userIngredients }: RecipeCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  // Determine which ingredients the user has and which they need
  const userHasIngredient = (ingredient: string) => {
    return userIngredients.some((userIng) => ingredient.toLowerCase().includes(userIng.toLowerCase()))
  }

  const hasIngredients = recipe.ingredients.filter((ing) => userHasIngredient(ing))
  const needIngredients = recipe.ingredients.filter((ing) => !userHasIngredient(ing))

  // Limit the display of needed ingredients to 5
  const displayedNeedIngredients = needIngredients.slice(0, 5)
  const hiddenIngredientsCount = needIngredients.length - 5

  return (
    <>
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-800">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image || "/placeholder.svg?height=192&width=384"}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle>{recipe.title}</CardTitle>
          <CardDescription className="flex items-center gap-4">
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {recipe.cookTime} mins
            </span>
            <span className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              {recipe.servings} servings
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Ingredients you have:</h4>
            <div className="flex flex-wrap gap-1">
              {hasIngredients.map((ingredient, index) => (
                <Badge key={index} variant="success" className="text-xs">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
          {needIngredients.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">You'll also need:</h4>
              <div className="flex flex-wrap gap-1">
                {displayedNeedIngredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {ingredient}
                  </Badge>
                ))}
                {hiddenIngredientsCount > 0 && (
                  <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-800">
                    +{hiddenIngredientsCount} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full border-black dark:border-white"
            onClick={() => setShowDetails(true)}
          >
            View Recipe
          </Button>
        </CardFooter>
      </Card>

      <RecipeDetailModal recipe={recipe} isOpen={showDetails} onClose={() => setShowDetails(false)} />
    </>
  )
}

