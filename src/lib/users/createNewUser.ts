export const createNewUser = async (data: User) => {
	const res = await fetch(`${process.env.SITE_URL}/api/users/${data.uid}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if(!res.ok) return undefined;

	return true;
}