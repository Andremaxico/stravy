import Image from 'next/image'
import React from 'react'
import cover from 'public/cover.jpg'

type Props = {}

export const CoverImage = ({}: Props) => {
	return (
		<div className="w-screen h-screen absolute top-0 left-0 brightness-50 z-0">
			<Image
				className='object-cover h-full' 
				alt='food' 
				src={cover} 
			/>
		</div>
	)
}