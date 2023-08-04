export const getAllUsers = async (): Promise<User[] | undefined>  => {
	const users = await fetch(`${process.env.SITE_URL}/api/users`);

	const json: User[] = await users.json();

	return json;
}