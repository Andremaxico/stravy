type RecipeMeta = {
	title: string,
	uploadDate: Date,
	photoUrl: string,
	rating: number, 
	ingridients: string[],
	id: string,
}

type Review = {
	meta: {
		title: string, 
		uploadDate: Date,
		authorId: string,
		authorFullname: string,
		likes: number,
	},
	text: string,
}
 
type Recipe = {
	meta: RecipeMeta,
	reviews: Review[],
}

type User = {
	uid: string,
	avatarUrl: string,
	name: string,
	surname: string,
	email: string,
}

type Color = 'primary' | 'a11y'