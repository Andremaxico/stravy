import React from 'react'
import { SearchRecipe } from '../components/SearchRecipe'
import { AddRecipeForm } from '../components/AddRecipeForm'

export default function AddRecipe() {
	return (
		<main className='
			h-full w-screen
			flex justify-center items-center
		'>
			<AddRecipeForm />
		</main>
	)
}     
