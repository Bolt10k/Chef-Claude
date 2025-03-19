import React from "react"
import IngredientsList from "./ingredientsList"
import ClaudeRecipe from "./claudeRecipe"
import { getRecipeFromMistral } from "./ai"

export default function Main(){

    
    const [ingredients,setIngredients] = React.useState([])


    
    const [recipe,setRecipe] = React.useState("")

    async function getArecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients=>[...prevIngredients,newIngredient])
    }

    return(
        
        <main>
            <form action={addIngredient} className="main-form center" >
                <input type="text" placeholder="e.g. Oregano" aria-label="Add ingredient" name="ingredient"/>
                <button>+ Add ingredient</button>
            </form>

            {ingredients.length>0 && <IngredientsList ingredients={ingredients} function={getArecipe}/>}

            {recipe && 
                <ClaudeRecipe recipe={recipe}/>}
            
        </main>
        
    )
}