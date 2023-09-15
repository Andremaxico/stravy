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
		uploadDate: object,    
		authorId: string,
		authorFullname: string,
		likes: number,
	},
	text: string,
}
 
type Recipe = {
	meta: RecipeMeta,
	text: string,
	content: string,
	reviews: Review[],
}

type AccountData = {
	uid: string,
	avatarUrl: string,
	name: string,
	surname: string,
	email: string,
}

type Color = 'primary' | 'a11y'

type ReqRes = {
	error: null | string,
	ok: boolean,
}