import { collection, getDocs, getFirestore, query } from "firebase/firestore"
import { NextResponse } from "next/server";
import firebase_app from '@/firebase/config';

const db = getFirestore(firebase_app)

export const GET = async () => {
	const q = query(collection(db, 'users'));

	console.log('get recipes');

	const snapshot = await getDocs(q);

	const users: User[] = [];

	snapshot.forEach(snap => {
		if(snap.exists()) {
			users.push(snap.data() as User);
		}
	})

	console.log(users); 

	return NextResponse.json(JSON.stringify(users));
}
