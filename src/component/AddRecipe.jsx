import React, { useState } from 'react'
import { nanoid } from 'nanoid';
import  'bootstrap/dist/css/bootstrap.min.css'
import './AddRecipe.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'


const AddRecipe = (props)=> {

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [comments, setComments] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const doWork = () => {
    const newRecipe = {
      'id': nanoid(),
      'name': name,
      'ingredients': ingredients,
      'instructions': instructions,
      'comments': comments,
      'image': URL.createObjectURL(selectedFile)
    }
    props.addRecipe(newRecipe);
  }

  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const addIngredient = () => {
    if (ingredients && !ingredientsList.includes(ingredients)) {
      setIngredientsList([...ingredientsList, ingredients]);
      setIngredients(''); 
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredientsList(ingredientsList.filter((item) => item !== ingredient));
  };
  

  return (
    <div className="container my-5" id="addRecipe">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Add Recipe</h3>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="txtName" className="form-label">Recipe Name</label>
              <input type="text" id="txtName" placeholder="Recipe Name" className="form-control" onChange={(event) => setName(event.currentTarget.value)} value={name}/>
            </div>
            <div className='row'>
            <div className="col-md-6">
              <label htmlFor="txtIngredients" className="form-label">Ingredients</label>
              <div className="input-group">
                <input type="text" id="txtIngredients" placeholder="Add Ingredient" className="form-control" onChange={(event) => setIngredients(event.currentTarget.value)} value={ingredients}/>
                <button type="button" className="btn btn-outline-secondary" onClick={addIngredient}>Add</button>
              </div>
              <ul className="mt-2">
                {ingredientsList.map((ingredient, index) => (
                  <li key={index} className="d-flex justify-content-between align-items-center">
                    <span>{ingredient}</span>
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => removeIngredient(ingredient)}>Remove</button>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <label htmlFor="txtInstructions" className="form-label">Instructions</label>
              <textarea id="txtInstructions" placeholder="Enter recipe instructions" className="form-control"  onChange={(event) => setInstructions(event.currentTarget.value)} value={instructions}/>
            </div>
            <div className="col-md-6">
              <label htmlFor="txtComments" className="form-label">Comments</label>
              <textarea id="txtComments" placeholder="Comments" className="form-control"  onChange={(event) => setComments(event.currentTarget.value)}value={comments}/>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <label htmlFor="fileUpload" className="form-label">Recipe Image</label>
              <input type="file" id="fileUpload" className="form-control" onChange={imageUpdate}/>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <button type="button" className="btn btn-success btn-lg w-100" id="btnAdd" onClick={doWork}>Add Recipe <FontAwesomeIcon icon={faPlusCircle} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default AddRecipe