import React from 'react'

type Props = {
	params: {
		recipeId: string
	}
}

export default function page({ params: { recipeId } }: Props) {
	return (
		<div>page</div>
	)
}