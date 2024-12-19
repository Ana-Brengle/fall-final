import React from 'react'
import { useState, useEffect } from 'react';
import './Recipe.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faMagicWandSparkles, faWarning } from '@fortawesome/free-solid-svg-icons'



const Recipe = (props) => {

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [comments, setComments] = useState('');


  useEffect(() => {
    if (props.recipe) {
      setName(props.recipe.name || '');
      setIngredients(Array.isArray(props.recipe.ingredients) ? props.recipe.ingredients : []);
      setInstructions(props.recipe.instructions || '');
      setComments(props.recipe.comments || '');
    }
  },[])
  
  const saveRecipe = () =>{
    setEditMode(false);
    const updatedRecipe = { name: name, ingredients: ingredients, instructions: instructions, comments: comments, id: props.recipe.id, image: props.recipe.image };
    props.updateRecipe(updatedRecipe)
  };
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  

  return (
    <div className="card recipe-card m-3" style={{ maxWidth: '600px' }}>
      {props.recipe.image && (
        <img src={props.recipe.image} alt={name} className="card-img-top" />
      )}
      <div className="card-body">
        <h5 className="card-title">
          {editMode ? (
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
          ) : (
            name
          )}
        </h5>
        <h6>Ingredients:</h6>
        {editMode ? (
          <div>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row mb-2">
                <input type="text" value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)} className="form-control mb-2" />
                <button type="button" onClick={() => handleRemoveIngredient(index)} className="btn btn-danger btn-sm mb-2">Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient} className="btn btn-primary mb-3">Add Ingredient</button>
            </div>
        ) : (
          <ul>
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)
            ) : (<li>No Ingredients</li>)}
          </ul>
        )}
        <h6>Instructions:</h6>
        {editMode ? (
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} className="form-control mb-3"/>
        ) : (
          <p>{instructions}</p>)}
          <h6>Comments:</h6>
          {editMode ? (
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} className="form-control mb-3"/>
            ) : (<p>{comments}</p>)}
            <div className="row d-flex justify-content-between">
              <button className="btn btn-warning m-1" onClick={() => setEditMode(!editMode)}> {editMode ? 'Cancel' : 'Edit Recipe'} <FontAwesomeIcon icon={faMagicWandSparkles} /></button>
              {editMode && (<button className="btn btn-secondary m-1" onClick={saveRecipe}>Save Recipe</button>)}
              <button className="btn btn-danger m-1" onClick={() => props.removeRecipe(props.recipe)}>Delete Recipe <FontAwesomeIcon icon= {faWarning} /></button>
        </div>
      </div>
    </div>
  )
};
     

export default Recipe