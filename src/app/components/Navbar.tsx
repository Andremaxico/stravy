'use client'

import Image from 'next/image';
import Link from 'next/link';
import { FaSign, FaSignInAlt } from 'react-icons/fa';
import { MyButton } from '../UI/MyButton';
import { auth } from '@/firebase/config';
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { HeaderProfileInfo } from './HeaderProfileInfo';

type Props = {};

export const Navbar = ({}: Props) => {
	const [currUser, setCurrUser] = useState<User | null>(auth.currentUser);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log('user', user);
		  setCurrUser(user);
		} else {
		  setCurrUser(null);
		}
	});
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
				{currUser ?
					<HeaderProfileInfo user={currUser} />
				: 	<Link href={'/login'}>
						<FaSignInAlt className={'text-base text-primary'} />
					</Link>
				}
			</div>
		</header>
	)
}
