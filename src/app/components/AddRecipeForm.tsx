'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { Controller, useForm } from 'react-hook-form'
import { TextField } from '../UI/TextField'
import { MyButton } from '../UI/MyButton'
import { sendRecipe } from '@/lib/recipes/sendRecipe'
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';

type Props = {}

type FieldValues = Recipe & {
	currIngridientName: string,
}

export const AddRecipeForm = ({}: Props) => {
	const { 
		control, formState: { errors }, setValue, 
		watch, getValues, handleSubmit, setError,
		clearErrors
	} = useForm<FieldValues>();

	const router = useRouter();

	const formRef = useRef<HTMLFormElement>(null);

	//submit btn click(middleware for custom validation)
	const handleClick = () => { 
		console.log('ings', getValues('meta.ingridients'));

		//custom validation
		if(!getValues('meta.ingridients') || getValues('meta.ingridients').length === 0) {

			setError('meta.ingridients', {
				message: 'Пропишіть інгрідієнти, будь ласка',
				type: 'required',
			})

		} else if(formRef.current) {
			formRef.current.submit();
		}
	}

	const addIngridient = () => {
		const currIngs = getValues('meta.ingridients') || [];
		const currIngName = getValues('currIngridientName');

		//if empty field => setError
		if(currIngName && currIngName.length > 0) {
			if(!currIngs.includes(currIngName)) {
				setValue('meta.ingridients', [...currIngs, currIngName]);
			}
			setValue('currIngridientName', ''); 
		} else {
			setError('currIngridientName', { message: 'Напишіть щось' })
		}

	}
	const deleteIngridient = (ing: string) => {
		const currIngs = getValues('meta.ingridients') || [];

		setValue('meta.ingridients', currIngs.filter(currIng => currIng !== ing));
	}

	console.log('errors', errors);

	const onSubmit = async (data: FieldValues) => {
		//check if ingridients provided
		if(data.meta.ingridients && data.meta.ingridients.length < 1) {
			setError('meta.ingridients', {
				type: 'required', 
				message: 'Пропишіть інгрідієнти, будь ласка'
			})
		}

		const { currIngridientName, ...restData } = data;

		const finalData: Recipe = {
			...restData,
			meta: {
				...restData.meta,
				id: v4(),
			}
		}

		const {error, ok} = await sendRecipe(finalData);

		console.log('error', error, 'ok', ok);

		if(ok) {
			console.log('sent successfully');
			router.push('/');
		} else {
			console.log('error', error);
		}
	}

	//remove error if user provided ingridient
	useEffect(() => {
		if(getValues('meta.ingridients') && getValues('meta.ingridients').length > 0) {
			clearErrors('meta.ingridients');
		}
	}, [watch('meta.ingridients')]);

	return (
		<form 
			className='max-w-xl md:max-w-sm w-full' 
			onSubmit={handleSubmit(onSubmit)}
			ref={formRef}
		>
			<Controller 
				control={control}
				rules={{
					required: `Це поле є обов'язковим`
				}}
				name={'meta.title'}
				render={({field: { onChange, value }}) => (
					<TextField 
						onChange={onChange}
						value={value}
						error={errors.meta?.title?.message}
						labelText='Назва страви'
						plaсeholder='Назва страви'
						required
						parentStyles='mb-2'
					/>
				)}
			/>

			{/* insgb  idients */}
			<div className=""> 
				{/* selected */}
				<div className="flex mb-1 max-w-full flex-wrap gap-1">
					{errors.meta?.ingridients ? 
						<p className='text-sm text-red-600'>{errors.meta.ingridients.message}</p>
					: 	
						watch('meta.ingridients')?.map((ing) => (
							// single  ingridient
							<div className="flex items-center bg-gray-300 rounded-full py-px px-2" key={ing}>
								<span className='text-sm mr-1'>{ing}</span>
								<MyButton onClick={() => deleteIngridient(ing)} unstyled>
									<GrClose className='text-sm' />
								</MyButton>
							</div>
					))}
				</div>

				{/* input here */}
				<div className="flex">
					<Controller 
						control={control}
						name='currIngridientName'
						render={({field: { onChange, value }}) => (
							<TextField	
								plaсeholder='Інгрідієнт'
								labelText='Інгрідієнти'
								className='mr-1'
								parentStyles='basis-full'
								value={value}
								onChange={onChange}
								required
								error={errors.currIngridientName?.message}
								renderButton={() => (
									<MyButton
										onClick={addIngridient}
										className='h-full'
									>
										<FaPlus />
									</MyButton>
								)}
							/>
						)}
					/>
				</div>
			</div>


			<MyButton 
				onClick={handleClick}
				size='sm' 
				className='mt-2'
			>
				Зберегти
			</MyButton>
		</form>
	)
}