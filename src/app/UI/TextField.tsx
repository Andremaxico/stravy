'use client';

import React, { HTMLInputTypeAttribute, useState } from 'react'
import cn from 'classnames';
import { FaEye } from 'react-icons/fa';
import { inputConfig } from '@/configs/inputConfig';
import FormControl from '@mui/base/FormControl';
import Input from '@mui/base/Input';

type Props = {
	value: string,
	onChange: (value: string) => void,
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
	plaсeholder?: string,
	className?: string,
	id?: string, 
	type?: HTMLInputTypeAttribute,
	size?: 'sm' |'md' | 'lg' | 'xl',
	error?: string,
	labelText?: string,
	required?: boolean,
	parentStyles?: string,
	renderButton?: () => React.ReactNode,
}

export const TextField = ({
	onChange, type = 'text', value, className, id, 
	plaсeholder, error, onFocus, onBlur, size = 'md', 
	labelText, required = false, parentStyles,
	renderButton
}: Props) => {
	const [currType, setCurrType] = useState<HTMLInputTypeAttribute>(type);



	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		onChange(value);
	}

	return (
		<FormControl className={cn('flex flex-col', parentStyles ? parentStyles : '')}>
			<label className='text-sm' htmlFor={id}>{labelText}{required && <span className='text-red-600'>*</span>}</label>
			<div className="flex">
				<input
					type={type}
					id={id}
					onChange={handleChange}
					onFocus={onFocus}
					onBlur={onBlur}
					value={value}
					className={`input w-full mr-1 ${inputConfig[size]} ${className} ${error ? 'border-red-600' : ''}`}
					placeholder={plaсeholder}
				/>
				{renderButton && renderButton()}
			</div>
			{error && 
				<p className={`error-text text-sm text-red-600`}>{error}</p>
			}

		</FormControl>
	)
}