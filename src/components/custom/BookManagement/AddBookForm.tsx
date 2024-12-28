import bookApiRepository from '@/app/api/repositories/book.repo';
import { useGetSession } from '@/app/config/logic/getSession';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, NumberInput, Space } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface IBookFormProps {
	onRefetch: () => void;
	onClose: () => void;
}

const AddBookForm: React.FC<IBookFormProps> = ({ onRefetch, onClose }) => {
	const { user } = useGetSession();

	// form initialization
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IBookFormStateType>({
		resolver: yupResolver(Add_Book_Form_Validation),
	});

	// add book mutation
	const { mutate, isPending } = useMutation({
		mutationKey: ['Add_Book_Mutation'],
		mutationFn: (payload: IBookFormStateType) =>
			bookApiRepository.addBook(payload),
		onSuccess() {
			onRefetch();
			onClose();
			showNotification({
				title: 'Book added to list successfully.',
				color: 'teal',
				icon: <IconCheck size={16} />,
				message: '',
			});
		},
		onError(error) {
			showNotification({
				title: 'Failed to add book.',
				color: 'red',
				icon: <IconX size={16} />,
				message: error?.message,
			});
		},
	});

	// form submission
	const onSubmitForm = (payload: IBookFormStateType) => {
		mutate({ ...payload, creator: user?._id });
	};

	return (
		<form onSubmit={handleSubmit(onSubmitForm)}>
			<Input.Wrapper
				label='Title'
				error={<ErrorMessage errors={errors} name='title' />}
				size='md'
			>
				<Input size='md' placeholder='Book title' {...register('title')} />
			</Input.Wrapper>

			<Space h={'md'} />

			<Input.Wrapper
				label='Book Author'
				error={<ErrorMessage errors={errors} name='author' />}
				size='md'
			>
				<Input
					size='md'
					placeholder='Book author name'
					{...register('author')}
				/>
			</Input.Wrapper>

			<Space h={'md'} />

			<Input.Wrapper
				label='Book Genre'
				error={<ErrorMessage errors={errors} name='genre' />}
				size='md'
			>
				<Input size='md' placeholder='Book genre' {...register('genre')} />
			</Input.Wrapper>

			<Space h={'md'} />

			<Input.Wrapper
				label='Price'
				error={<ErrorMessage errors={errors} name='price' />}
				size='md'
			>
				<NumberInput
					size='md'
					placeholder='Book price'
					onChange={(e) => setValue('price', parseInt(e as string))}
				/>
			</Input.Wrapper>

			<Space h={'md'} />

			<Button size='md' loading={isPending} type='submit' fullWidth>
				Save
			</Button>
		</form>
	);
};

export default AddBookForm;

const Add_Book_Form_Validation = Yup.object().shape({
	title: Yup.string().required().label('Title'),
	author: Yup.string().required().label('Author'),
	genre: Yup.string().required().label('Genre'),
	price: Yup.number().required().label('Price'),
});

export interface IBookFormStateType {
	title: string;
	author: string;
	genre: string;
	price: number;
	creator?: string;
}
