'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { Controller, useForm } from 'react-hook-form'
import { TextField } from '../UI/TextField'
import { MyButton } from '../UI/MyButton'
import { sendRecipe } from '@/lib/recipes/sendRecipe'
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { sendRecipeImg } from '@/lib/recipes/sendRecipeImg'
import Image from 'next/image'
import { Preloader } from './Preloader'
import { storage } from '@/firebase/config'
import MarkdownEditor from '@uiw/react-markdown-editor';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable, uploadString } from 'firebase/storage'
import Editor from '../UI/Editor'
import { headingsPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin } from '@mdxeditor/editor'
import FormControl from '@mui/base/FormControl'

const fileToBlob = async (file: File) => {
	return new Blob([
		new Uint8Array(await file.arrayBuffer())
	], {
		type: file.type 
	});
}

type Props = {}

type FieldValues = Recipe & {
	currIngridientName: string,
	imageFile: FileList,
	content: any,
}

export const AddRecipeForm = ({}: Props) => {
	const { 
		control, formState: { errors }, setValue, 
		watch, getValues, handleSubmit, setError,
		clearErrors, register, trigger
	} = useForm<FieldValues>();

	const [currSelectedImgSrc, setCurrSelectedImgSrc] = useState<string | null>(null);
	const [isImageUploading, setIsImageUploading] = useState<boolean>(false);  

	const router = useRouter();

	const formRef = useRef<HTMLFormElement>(null);

	//submit btn click(middleware for custom validation)
	const handleClick = async () => { 
		console.log('ings', getValues('meta.ingridients'));

		//custom validation
		if(!getValues('meta.ingridients') || getValues('meta.ingridients').length === 0) {

			setError('meta.ingridients', {
				message: 'Пропишіть інгредієнти, будь ласка',
				type: 'required',
			})

		} else if (formRef.current) {
			console.log('form submit');
			await trigger();
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

	const onSubmit = async (data: FieldValues) => {
		console.log('submit', data);
		const { currIngridientName, ...restData } = data;

		const id = v4();

		console.log('imageFile', data.imageFile[0]);

		// if(data.imageFile[0] && data.imageFile[0].size < 71680) {
		// 	setIsImageUploading(true);
		// 	console.log('uload image');
		// 	const storageRef = ref(storage, `recipes/${data.imageFile[0].name}`);
		// 	//await uploadBytes(storageRef, data.imageFile[0])
		// 	//const { error, ok } = await sendRecipeImg(data.imageFile[0], id);

		// 	console.log('storage ref', storageRef);
		// 	const res = await uploadBytes(storageRef, data.imageFile[0]);

		// 	console.log('res', res);

		// 	setIsImageUploading(false);
		// } else {
		// 	alert('file is too big');
		// }

		const finalData: Recipe = {
			...restData,
			meta: {
				...restData.meta,
				photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
				id: id,
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


	useEffect(() => {
			//remove error if user provided ingridient
		if(getValues('meta.ingridients') && getValues('meta.ingridients').length > 0) {
			clearErrors('meta.ingridients');
		} else {
			//set error if ingridients isnt provided by user
			setError('meta.ingridients', {
				message: 'Пропишіть інгредієнти, будь ласка',
				type: 'required',
			})
		}
	}, [watch('meta.ingridients')]);

	useEffect(() => {
		(async () => {
			if(getValues('imageFile')[0]) {
				const file = getValues('imageFile')[0];
				const blob = await fileToBlob(file);
		
				console.log('file', file, 'blob', blob);
		
				const reader = new FileReader();
				reader.readAsDataURL(blob);

				reader.onload = () => {
					const src = reader.result as string;
					setCurrSelectedImgSrc(src);
				}
			}
		})()
	}, [watch('imageFile')]);

	//console.log(watch('content'));

	return (
		<form 
			className='max-w-xl md:max-w-xs w-full' 
			onSubmit={handleSubmit(onSubmit)}
			ref={formRef}
		>
			<h2 className='text-xl font-bold text-center mb-2'>Додайте свою страву</h2>
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

			{/* ingriidients */}
			<div className="mb-2"> 
				{/* input here */}
				<div className="flex mb-1">
					<Controller 
						control={control}
						name='currIngridientName'
						render={({field: { onChange, value }}) => (
							<TextField	
								plaсeholder='інгредієнт'
								labelText='інгредієнти'
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
			</div>

			{/* image upload */}
			<div className="">
				<label 
					htmlFor='imgUpload' 
					className='cursor-pointer'
				>
					<span className='text-sm'>Завантажте фото Вашої страви</span>
					<input type="file" id='imgUpload' { ...register('imageFile') } className='opacity-0 invisible w-0 h-0 absolute -z-10' />
					{/* body of the upload */}
					<div 
						className="
							w-full h-10
							flex items-center justify-center
							bg-orange-100 border-orange-400
							rounded-lg
						"
					>
						<FaPlus className='text-xl'/>
					</div>

					{errors.imageFile && <span className='text-red-600 text-sm'>{errors.imageFile.message}</span>}
				</label>

				{/* selected image */}
				{currSelectedImgSrc && 
					// image wrapper
					<div className="aspect-video overflow-hidden">
						<Image 
							src={currSelectedImgSrc}
							alt='Обране зображення'
							width={320}
							height={320}
						/>
					</div>
				}
			</div>

			<Controller 
				control={control}
				name={'content'}
				rules={{
					required: `Це поле є обов'язковим`
				}}
				render={({field: { value, onChange }}) => (
					<FormControl>					
						<label htmlFor='mdedit' className={'text-sm'} >Напишіть про страву</label>	

						<MarkdownEditor
							id='mdedit'
							value={value}
							height="200px"
							onChange={onChange}
						/>

						{errors.content && <span className='text-sm text-red-600'>{errors.content.message as string}</span>}
					</FormControl>
				)}
			/>

			{isImageUploading && <Preloader />}

			<MyButton 
				//onClick={handleClick}
				type='submit'
				size='sm' 
				className='mt-2'
			>
				Зберегти
			</MyButton>
		</form>
	)
}