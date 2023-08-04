import Image from 'next/image';
import Link from 'next/link';
import { MyButton } from '../UI/MyButton';

type Props = {};

export const Navbar = ({}: Props) => {
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
				<Image 
					alt='logo(temporary)'
					src={'https://cdn.shopify.com/s/files/1/0504/1229/0242/files/PEROGIE_HOUSE_logo_480x480.png?v=1619113286'}
					width={40}
					height={40}
				/>
			</div>
			{/* add recipe */}
			<MyButton variant='outlined'>
				<Link href={'/add-recipe'}>Add Recipe</Link>
			</MyButton>
			
			{/* account or login */}
			<div className="">
				<MyButton variant='outlined'>
					MyButton
				</MyButton>
			</div>
		</header>
	)
}
