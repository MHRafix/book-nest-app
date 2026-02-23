import protectWithoutSession from '@/app/config/authProtection/protectWithoutSession';

import authenticationApiRepository from '@/app/api/repositories/authentication.repo';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, Input, Paper, Title, Group, Stack } from '@mantine/core/';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconMail, IconX, IconLock } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Image from 'next/image';

const LoginPage: NextPage = () => {
	const router = useRouter();

	// login form
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: { email: '', password: '' },
		resolver: yupResolver(Login_Form_Validation_Schema),
	});

	// login mutation
	const { mutate, isPending } = useMutation({
		mutationKey: ['Login_Mutation'],
		mutationFn: (payload: ILoginPayload) =>
			authenticationApiRepository.login(payload),
		onSuccess(res) {
			showNotification({
				title: 'Login successful.',
				color: 'teal',
				icon: <IconCheck size={16} />,
				message: 'Redirecting to dashboard...',
			});
		},
		onError(error) {
			showNotification({
				title: 'Login failed.',
				color: 'red',
				icon: <IconX size={16} />,
				message: error?.message,
			});
		},
	});

	// handle form submission
	const handleLogin = (payload: ILoginPayload) => {
		mutate(payload);
	};

	return (
		<Flex justify='center' align='center' h='100vh'>
			<Paper className='xs:w-11/12 lg:w-5/12 p-5 drop-shadow-xl rounded-md'>
				<Stack align='center' gap='md' mb={20}>
					<Image
						src='/assets/Logo/logo.png'
						alt='BookNest Logo'
						width={60}
						height={60}
					/>
					<div>
						<Title order={2} ff={'Nunito sans, sans-serif'} ta='center'>
							BookNest
						</Title>
						<Title order={4} c='dimmed' ff={'Nunito sans, sans-serif'} ta='center' fw={400}>
							Sign in to your account
						</Title>
					</div>
				</Stack>

				<form onSubmit={handleSubmit(handleLogin)}>
					<Input.Wrapper
						label='Email'
						my={10}
						error={<ErrorMessage errors={errors} name='email' />}
					>
						<Input
							disabled={isPending}
							{...register('email')}
							icon={<IconMail size={20} />}
							placeholder='Your email'
							size='md'
							variant='filled'
							style={{
								fontFamily: 'Nunito sans, sans-serif !important',
							}}
						/>
					</Input.Wrapper>

					<Input.Wrapper
						label='Password'
						my={10}
						error={<ErrorMessage errors={errors} name='password' />}
					>
						<Input
							disabled={isPending}
							{...register('password')}
							icon={<IconLock size={20} />}
							placeholder='Your password'
							type='password'
							size='md'
							variant='filled'
							style={{
								fontFamily: 'Nunito sans, sans-serif !important',
							}}
						/>
					</Input.Wrapper>

					<Button
						type='submit'
						color='violet'
						size='md'
						loading={isPending}
						fullWidth
						mt={15}
					>
						Login now
					</Button>
				</form>
			</Paper>
		</Flex>
	);
};

export default protectWithoutSession(LoginPage);

export const Login_Form_Validation_Schema = Yup.object().shape({
	email: Yup.string().email('Please enter a valid email').required('Email is required').label('Email'),
	password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').label('Password'),
});

export interface ILoginPayload {
	email: string;
	password: string;
}
