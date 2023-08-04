export const sendRecipe = async (data: Recipe) => {
	const res = await fetch(`http://localhost:3000/api/recipes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	console.log(res);

	if(!res.ok) {
		return {
			error: new Error('Something happened! Try again later'),
			ok: false,
		}
	}

	return {
		ok: true,
		error: undefined,
	}
}