import React, { useState } from 'react'
import { nanoid } from 'nanoid';
import  'bootstrap/dist/css/bootstrap.min.css'

const AddRecipe = (props)=> {

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [comments, setComments] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const doWork = () => {
    const newRecipe = {
      id: nanoid(),
      name: name,
      ingredients: ingredients,
      instructions: instructions,
      comments: comments,
      image: URL.createObjectURL(selectedFile)
    }
    props.addRecipe(newRecipe);
  }

  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
  }
  

  return (
    <div className='container mt-4'>
      <div className='card'>
        <div className='card-header'>
          <h5>Add New Recipe</h5>
        </div>
        <div className='card-body'>
          <form>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>Recipe Name</label>
              <input 
                type='text' 
                className='form-control' 
                id='name' 
                value={name} 
                onChange={(event) => setName(event.target.value)} 
                required 
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='ingredients' className='form-label'>Ingredients</label>
              <textarea 
                className='form-control' 
                id='ingredients' 
                rows='3' 
                value={ingredients} 
                onChange={(event) => setIngredients(event.target.value)} 
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='instructions' className='form-label'>Instructions</label>
              <textarea 
                className='form-control' 
                id='instructions' 
                rows='3' 
                value={instructions} 
                onChange={(event) => setInstructions(event.target.value)} 
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='comments' className='form-label'>Comments</label>
              <textarea 
                className='form-control' 
                id='comments' 
                rows='3' 
                value={comments} 
                onChange={(event) => setComments(event.target.value)} 
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='image' className='form-label'>Recipe Image</label>
              <input 
                type='file' 
                className='form-control' 
                id='image' 
                onChange={imageUpdate} 
              />
            </div>
            <button 
              type='button' 
              className='btn btn-primary' 
              onClick={doWork}
            >
              Add Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddRecipe