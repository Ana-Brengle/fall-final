import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from 'nanoid'
import Recipe from './component/Recipe';
import AddRecipe from './component/AddRecipe';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSadTear, faSearch } from '@fortawesome/free-solid-svg-icons';



function App() {
 
  const [allRecipes, setAllRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeyWords] = useState('');
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if(localStorage){
      const recipesLocalStorage = JSON.parse(localStorage.getItem('recipes'));
      if(recipesLocalStorage){
        saveRecipes(recipesLocalStorage);
      }else{
        saveRecipes(recipe)
      }
    }
  }, [])



  const recipe= [{
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
    instructions: "Preheat oven to 300°F. Season salmon fillets with salt, pepper, garlic, and olive oil. Bake for 5-20 minutes until cooked through. Serve with fresh lemon slices and dill.",
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
  const addRecipe = (newRecipe) => {
    const updatedRecipe = [...allRecipes, newRecipe]
    saveRecipes(updatedRecipe);
    setShowModal(false);
  }

  const removeRecipe = (recipeToDelete) => {
    const updatedRecipeArray = allRecipes.filter(recipe => recipe.id !== recipeToDelete.id);
    saveRecipes(updatedRecipeArray);
  };

  const updateRecipe = (updatedRecipe) => {
    const updatedRecipeArray = allRecipes.map(recipe => recipe.id == updatedRecipe.id ?
      {...recipe, ...updatedRecipe} : recipe);
      saveRecipes(updatedRecipeArray)
  }

  const searchRecipes = () => {
    let keywordsArray = [];

    if(keywords){
      keywordsArray= keywords.toLowerCase().split(' ');
    }

    if(keywordsArray.length > 0 ){
      const searchResults = allRecipes.filter(recipe => {
        for(const word of keywordsArray){
          if(recipe.name.toLowerCase().includes(word)){
              return true;
             }
        }
        return false
      });
      setSearchResults(searchResults);
    }else{
      setSearchResults(allRecipes)
    }
  }

  const saveRecipes = (recipes) => {
    setAllRecipes(recipes);
    setSearchResults(recipes);

    if(localStorage){
      localStorage.setItem('recipes', JSON.stringify(recipes));
      console.log('saved to local storage');
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center mt-4">
        <div className="col-md-6">
          <h3>Recipe Search </h3>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search by Recipe Name" onChange={(e) => setKeyWords(e.currentTarget.value)} value={keywords}/>
            <button className="btn btn-primary" onClick={searchRecipes}>Search <FontAwesomeIcon icon = {faSearch} /></button>
          </div>
          <button type="button" className="btn btn-success ms-3" onClick={() => setShowModal(true)}>Add Recipe</button>
        </div>
      </div>
      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="addRecipeModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <AddRecipe addRecipe={addRecipe} />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <h3>My Recipes</h3>
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((recipe) => (
            <div className="col-lg-3" key={recipe.id}>
              <Recipe recipe={recipe} removeRecipe={removeRecipe} updateRecipe={updateRecipe}/>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <h5>No recipes found.</h5>
          </div>
        )}
      </div>
    </div>
    
  )
}

export default App
