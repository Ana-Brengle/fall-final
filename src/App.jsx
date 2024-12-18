import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from 'nanoid'
import Recipe from './component/Recipe';
import AddRecipe from './component/AddRecipe';
import _ from 'lodash'



function App() {
 
  const [allRecipes, setAllRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeyWords] = useState('');

  useEffect(() => {
    if (localStorage) {
      const recipesLocalStorage = JSON.parse(localStorage.getItem('recipes'));

      if (recipesLocalStorage) {
        saveRecipes(recipesLocalStorage);
      } else {
        saveRecipes(recipes);
      }
    }
  }, []);
  

  const recipes= [{
    id: nanoid(),
    image: "images/image1.jpeg",
    name: "Fish Salad",
    ingredients: ["Fish fillets", "Lettuce", "Tomatoes", "Olives", "Cucumber", "Lemon", "Olive oil", "Salt", "Pepper"],
    instructions: "Grill or pan-fry fish fillets. Toss salad ingredients in a bowl. Top with grilled fish, drizzle with olive oil and lemon juice. Season with salt and pepper.",
    comments: []

  },
  {
    id: nanoid(),
    image: "images/image2.webp",
    name: "Pancakes",
    ingredients: ["Flour", "Eggs", "Milk", "Sugar", "Baking powder", "Butter", "Maple syrup", "Berries (optional)"],
    instructions: "Mix dry ingredients, then whisk in wet ingredients. Heat a pan with butter, pour batter, and cook until bubbles form. Flip and cook until golden. Serve with maple syrup and berries.",
    comments: []
  },
  {
    id: nanoid(),
    image: "images/image3.webp",
    name: "Salmon",
    ingredients: ["Salmon fillets", "Lemon", "Garlic", "Olive oil", "Salt", "Pepper", "Dill"],
    instructions: "Preheat oven to nanoid()00°F (200°C). Season salmon fillets with salt, pepper, garlic, and olive oil. Bake for nanoid5-20 minutes until cooked through. Serve with fresh lemon slices and dill.",
    comments: []
  },
  {
    id: nanoid(),
    image: "images/image4.webp",
    name: "Burger",
    ingredients: ["Ground beef", "Burger buns", "Lettuce", "Tomato", "Cheese", "Pickles", "Ketchup", "Mustard"],
    instructions: "Form patties with ground beef and grill or pan-fry to desired doneness. Toast burger buns. Assemble burgers with patties, cheese, lettuce, tomato, pickles, ketchup, and mustard.",
    comments: []
  },
  {
    id: nanoid(),
    image: "images/image5.jpeg",
    name: "BLT",
    ingredients: ["Bacon", "Lettuce", "Tomato", "Bread", "Mayo"],
    instructions: "Cook bacon until crispy. Toast bread and spread mayo. Layer lettuce, tomato, and bacon on bread to make the BLT sandwich.",
    comments: []
  }
]

const saveRecipes = (recipes) => {
  setAllRecipes(recipes);
  setSearchResults(recipes);

  if (localStorage) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
    console.log('saved to local storage');
  }
}

const addRecipe = (newRecipe) => {
  const updatedRecipes = [...allRecipes, newRecipe];
  saveRecipes(updatedRecipes);
}

const removeRecipe = (recipeToDelete) => {
  const updatedRecipeArray = allRecipes.filter(recipe => recipe.id !== recipeToDelete.id);
  saveRecipes(updatedRecipeArray);
};

const updateRecipe = (updatedRecipe) => {
  const updatedRecipeArray = allRecipes.map(recipe => recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe);
  saveRecipes(updatedRecipeArray);
};

const searchRecipes = () => {
  if (keywords) {
    const searchResults = allRecipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(keywords.toLowerCase()) || 
             recipe.ingredients.toLowerCase().includes(keywords.toLowerCase());
    });
    setSearchResults(searchResults);
  } else {
    setSearchResults(allRecipes);
  }
}

  return (
    <div className="container">
    <div className="row" id="allRecipes">
      <h3>Recipes</h3>
      {searchResults && searchResults.map((recipe) => (
        <div className="col-lg-4" key={recipe.id}>
          <Recipe recipe={recipe} removeRecipe={removeRecipe} updateRecipe={updateRecipe} />
        </div>
      ))}
      <AddRecipe addRecipe={addRecipe} />
    </div>
    <div className="row mt-4" id="searchRecipe">
      <h3>Search Recipes</h3>
      <div className="col-md-6">
        <label htmlFor="txtKeywords">Search by Recipe Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Search by Recipe Name"
          onChange={(e) => setKeyWords(e.currentTarget.value)}
          value={keywords}
        />
      </div>
      <div className="col-md-3 mt-3">
        <button type="button" className="btn btn-lg btn-primary" onClick={searchRecipes}>Search Recipes</button>
      </div>
    </div>
  </div>
   
  )
}

export default App
