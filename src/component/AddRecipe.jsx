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
    
  )
}

export default AddRecipe