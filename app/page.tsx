import { RecipeFinder } from "@/components/recipe-finder"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          Kitchen{" "}
          <span className="text-black dark:text-white border-b-2 border-black dark:border-white">Recipe Finder</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-700 dark:text-gray-300">
          Enter 3-5 ingredients you have in your kitchen, and we'll find delicious recipes you can make right now.
        </p>
        <RecipeFinder />
      </div>
      <Toaster />
    </main>
  )
}

