import { getRecipeById } from '@/lib/recipes/getRecipeById'
import React from 'react'

type Props = {
	params: {
		recipeId: string
	}
}

export default async function Recipe({ params: { recipeId } }: Props) {
	const recipeData = await getRecipeById(recipeId);

	return (
		<div>dsdsdsdsdsdsdsdsssssdds</div>
	)
}