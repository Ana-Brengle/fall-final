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
    <div className="row my-5" id="addRecipe">
    <h3>Add Recipe</h3>
    <div className="col-md-6">
      <label htmlFor="txtName" className="form-label">Recipe Name</label>
      <input
        type="text"
        id="txtName"
        placeholder="Recipe Name"
        className="form-control"
        onChange={(event) => setName(event.currentTarget.value)}
        value={name}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="txtIngredients" className="form-label">Ingredients (comma separated)</label>
      <input
        type="text"
        id="txtIngredients"
        placeholder="Ingredients"
        className="form-control"
        onChange={(event) => setIngredients(event.currentTarget.value)}
        value={ingredients}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="txtInstructions" className="form-label">Instructions</label>
      <input
        type="text"
        id="txtInstructions"
        placeholder="Instructions"
        className="form-control"
        onChange={(event) => setInstructions(event.currentTarget.value)}
        value={instructions}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="txtComments" className="form-label">Comments (comma separated)</label>
      <input
        type="text"
        id="txtComments"
        placeholder="Comments"
        className="form-control"
        onChange={(event) => setComments(event.currentTarget.value)}
        value={comments}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="fileUpload" className="form-label">Recipe Image</label>
      <input
        type="file"
        id="fileUpload"
        className="form-control"
        onChange={imageUpdate}
      />
    </div>
    <div className="col-md-6">
      <button type="button" className="btn btn-success btn-lg" id="btnAdd" onClick={doWork}>
        Add Recipe
      </button>
    </div>
  </div>
  )
}

export default AddRecipe