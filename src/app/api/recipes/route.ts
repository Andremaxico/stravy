import { addDoc, doc, getFirestore, setDoc } from "firebase/firestore"
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