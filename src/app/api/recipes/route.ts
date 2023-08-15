import { addDoc, collection, doc, endAt, getDocs, getFirestore, orderBy, query, setDoc, startAt, where } from "firebase/firestore"
import app from '@/firebase/config';
import { NextResponse } from "next/server";

const db = getFirestore(app);

export const POST = async (req: Request) => {
	const data: Recipe = await req.json();

	const ref = doc(db, 'recipes', data.meta.id);

	try {
		await setDoc(ref, data);

		return NextResponse.json({"message": "Data sent"});

	} catch {
		return NextResponse.json({error: "Try again later"}, { status: 500 });
	}
} 

export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);

	const searchTerm = searchParams.get('searchTerm');

	if(!searchTerm) {
		return NextResponse.json({"message": 'Term not provided'}, {status: 400})
	}

	const recipesRef = collection(db, "recipes")

	const q = query(recipesRef, 
			orderBy('meta.title'),
			startAt(searchTerm),
			endAt(searchTerm+"\uf8ff")
		);

	const snapshots = await getDocs(q);

	const recipes: Recipe[] = [];

	snapshots.forEach(snap => {
		if(snap.exists()) {
			recipes.push(snap.data() as Recipe);
		}
 	});

	return NextResponse.json({"data": JSON.stringify(recipes)})
}