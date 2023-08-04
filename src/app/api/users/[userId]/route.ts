import firebase_app from "@/firebase/config";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

type Params = {
	params: {
		userId: string,
	}
}

const db = getFirestore(firebase_app);

export const POST = async (
	request: Request, 
	{ params: { userId } }: Params
) => {
	const data: User = await request.json() as User;

	const ref = doc(db, `/users/${userId}`);

	const res = await setDoc(ref, data);

	console.log('firebase response', res);

	return NextResponse.json({"message": "Data sent"});
}