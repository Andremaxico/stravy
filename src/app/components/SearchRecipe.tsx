'use client'

import { FaSearch } from 'react-icons/fa';
import { Controller, Field, FieldValue, useForm } from 'react-hook-form';
import { MyButton } from '../UI/MyButton';
import { TextField } from '../UI/TextField';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {}
type FieldValues = {
	searchTerm: string,
	ingridients: string[],
}

export const SearchRecipe = ({}: Props) => {
	const router = useRouter();

	const { register, handleSubmit, formState: { errors }, control } = useForm<FieldValues>();

	const onSubmit = (data: FieldValues) => {
		console.log('submitted');

		router.push(`/searchResults/${data.searchTerm}`);
	}

	return (
		<form 
			className='flex z-10'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Controller 
				control={control}
				name='searchTerm'
				render={({field: {onChange, value}}) => (
					<TextField 
						onChange={onChange}
						value={value}
						className='mr-1'
						plaсeholder='Назва страви'
					/>
				)}
			/>

			<MyButton type='submit'>
				<FaSearch />
			</MyButton>
		</form>
	)
}