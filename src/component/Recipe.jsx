import React from 'react'
import { useState, useEffect } from 'react';

const Recipe = (props) => {

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [comments, setComments] = useState('');
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    setName(props.recipe.name);
    setIngredients(props.recipe.ingredients);
    setInstructions(props.recipe.instructions);
    setComments(props.recipe.comments);
  }, []);

  const saveRecipe = () => {
    setEditMode(false);
    const updatedRecipe = { 
      name: name, 
      ingredients: ingredients, 
      instructions: instructions, 
      comments: comments, 
      id: props.recipe.id, 
      image: props.recipe.image
    };
    props.updateRecipe(updatedRecipe);
  }
  const toggleInfo = () => {setShowInfo(!showInfo);}
 
    

  return (

    <div className='card'>
      <div className='row' onClick={toggleInfo}>
        {/* Image Section */}
        <div className='col-md-4'>
          <img src={props.recipe.image} alt='Recipe' className='card-img-top' />
        </div>

        {/* Recipe Info Section */}
        <div className='col-md-8'>
          {showInfo && (
            <>
              {!editMode ? (
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item text-center'>{name}</li>
                  <li className='list-group-item text-center'>
                    <h4>Ingredients</h4>
                    <ul>
                      {props.recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </li>
                  <li className='list-group-item text-center'>Instructions: {props.recipe.instructions}</li>
                  <li className='list-group-item text-center'>Comments: {props.recipe.comments.join(', ')}</li>
                  <button type='button' className='btn btn-danger' onClick={() => props.removeRecipe(props.recipe)}>Delete Recipe</button>
                  <button type='button' className='btn btn-warning' onClick={() => setEditMode(true)}>Edit</button>
                </ul>
              ) : (
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item text-center'>
                    <input
                      type='text'
                      className='form-control'
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                    />
                  </li>
                  <li className='list-group-item text-center'>
                    <input
                      type='text'
                      className='form-control'
                      value={ingredients}
                      onChange={(e) => setIngredients(e.currentTarget.value)}
                    />
                  </li>
                  <li className='list-group-item text-center'>
                    <input
                      type='text'
                      className='form-control'
                      value={instructions}
                      onChange={(e) => setInstructions(e.currentTarget.value)}
                    />
                  </li>
                  <li className='list-group-item text-center'>
                    <input
                      type='text'
                      className='form-control'
                      value={comments}
                      onChange={(e) => setComments(e.currentTarget.value)}
                    />
                  </li>
                  <li className='list-group-item text-center'>
                    <button type='button' className='btn btn-secondary' onClick={saveRecipe}>Save</button>
                  </li>
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>

     
     
  )
}

export default Recipe