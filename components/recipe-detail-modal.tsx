"use client"

import { X } from "lucide-react"
import type { Recipe } from "@/types/recipe"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface RecipeDetailModalProps {
  recipe: Recipe | null
  isOpen: boolean
  onClose: () => void
}

export function RecipeDetailModal({ recipe, isOpen, onClose }: RecipeDetailModalProps) {
  if (!recipe) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{recipe.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <DialogDescription>
            {recipe.cuisine} • {recipe.course} • {recipe.cookTime + recipe.prepTime} mins total
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 md:grid-cols-2">
          <div className="relative h-64 w-full md:h-full">
            <Image
              src={recipe.image || "/placeholder.svg?height=300&width=400"}
              alt={recipe.title}
              fill
              className="rounded-md object-cover"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Preparation Time</h3>
              <div className="mt-1 grid grid-cols-3 gap-2 text-sm">
                <div className="rounded-md border border-gray-200 p-2 text-center dark:border-gray-800">
                  <div className="font-medium">{recipe.prepTime} mins</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Prep</div>
                </div>
                <div className="rounded-md border border-gray-200 p-2 text-center dark:border-gray-800">
                  <div className="font-medium">{recipe.cookTime} mins</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Cook</div>
                </div>
                <div className="rounded-md border border-gray-200 p-2 text-center dark:border-gray-800">
                  <div className="font-medium">{recipe.servings}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Servings</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Ingredients</h3>
              <ul className="mt-2 space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Instructions</h3>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3">
                <Badge variant="default" className="h-6 w-6 shrink-0 rounded-full p-0 flex items-center justify-center">
                  {index + 1}
                </Badge>
                <p>{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  )
}

