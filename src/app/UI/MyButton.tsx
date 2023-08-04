'use client'

import cn from 'classnames';
import { ButtonHTMLAttributes, MouseEventHandler } from 'react';

type Props = {
	variant?: 'plain' | 'outlined',
	size?: 'sm' | 'md' | 'lg' | 'xl',
	className?: string,
	children?: React.ReactNode,
	onClick?: MouseEventHandler<HTMLButtonElement>,
	type?: "button" | "submit" | "reset",
	unstyled?: boolean,  
}

export const MyButton = ({
	variant = 'plain', size = 'md', type = 'button',
	className, children, onClick, unstyled = false
}: Props) => {
	const primaryColor = '#d97706'; //#d97706

	const plain = `bg-skin-primary text-white`;
	const outlined = `border-2 border-skin-primary text-skin-primary bg-transparent `;

	const sizeStyles = {
		sm: 'rounded-sm px-2 py-1 text-sm',  
		md: 'rounded-md px-2.5 py-1.5 text-md',
		lg: 'rounded-lg px-3.5 py-2 text-lg',
		xl: 'rounded-lg border-0 px-4 py-2 text-xl'
	}

	const interactiveStyles = 'duration-200 drop-shadow-primary  hover:drop-shadow-md active:drop-shadow-none hover:drop-shadow-none'

	const styles =
		variant === 'plain' 
		? plain
		: variant === 'outlined' ?
			outlined
		: '';
	
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if(type === 'button') {
			e.preventDefault();
		}

		if(onClick) onClick(e);
	}

	return (
		<button 
			className={cn(
				!unstyled ? styles : '', 
				!unstyled ? sizeStyles[size] : '', 
				!unstyled ? interactiveStyles : '', 
			className)} 
			onClick={handleClick}
			type={type}
		>
			{children}
		</button>
	)
}