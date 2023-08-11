'use client'

import Image from 'next/image';
import Link from 'next/link';
import { FaSign, FaSignInAlt } from 'react-icons/fa';
import { MyButton } from '../UI/MyButton';
import { auth } from '@/firebase/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect } from 'react';

type Props = {};

export const Navbar = ({}: Props) => {
	//auth
	const provider = new GoogleAuthProvider();

	const signUp = () => {
		console.log('sign in with popup');
		signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			// The signed-in user info.
			const user = result.user;
			console.log('user', user);
			// IdP data available using getAdditionalUserInfo(result)
			// ...
		}).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
	}

	return (
		<header className='
			sticky inset-x-0 top-0
			h-16 w-screen
			p-3
			flex justify-between items-center
			drop-shadow-xl
			bg-white
			z-10
		'>
			{/* logo*/}
			<div className="">
				{/* i'll change this to mine */}
				<img
					alt='logo(temporary)'
					src={'https://cdn.shopify.com/s/files/1/0504/1229/0242/files/PEROGIE_HOUSE_logo_480x480.png?v=1619113286'}
					width={40}
					height={40}
				/>
			</div>
			{/* add recipe */}
			{/* <MyButton variant='outlined'>
				<Link href={'/add-recipe'}>Add Recipe</Link>
			</MyButton> */}
			
			{/* account or login */}
			<div className="">
				<Link href={'/login'}>
					<FaSignInAlt className={'text-base text-primary'} />
				</Link>
			</div>
		</header>
	)
}
