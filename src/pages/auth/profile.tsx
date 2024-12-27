// import authenticationApiRepository from '@/app/api/repositories/authentication.repo';
// import { ErrorMessage } from '@hookform/error-message';

// import { yupResolver } from '@hookform/resolvers/yup';
// import {
// 	Box,
// 	Button,
// 	Flex,
// 	Input,
// 	PasswordInput,
// 	TextInput,
// 	Title,
// } from '@mantine/core/';
// import { showNotification } from '@mantine/notifications';
// import {
// 	IconAt,
// 	IconCheck,
// 	IconLock,
// 	IconLogin,
// 	IconMail,
// 	IconX,
// } from '@tabler/icons-react';
// import { useMutation } from '@tanstack/react-query';
// import Cookies from 'js-cookie';
// import { NextPage } from 'next';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useForm } from 'react-hook-form';
// import * as Yup from 'yup';

// const MyAccountProfilePage: NextPage = () => {
// 	const router = useRouter();

// 	// register form
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm({
// 		defaultValues: { name: '', email: '', password: '' },
// 		resolver: yupResolver(Register_Form_Validation_Schema),
// 	});

// 	// execute after success
// 	const onSuccess = (res: { token: string }) => {
// 		Cookies.set('user', JSON.stringify(res), {
// 			expires: 3 / (24 * 60),
// 			sameSite: 'None',
// 		});
// 		if (router?.query?.callback) {
// 			router?.push(router?.query?.callback as string);
// 		} else {
// 			router?.push('/');
// 		}
// 	};

// 	// register mutation
// 	const { mutate, isPending } = useMutation({
// 		mutationKey: ['Register_Mutation'],
// 		mutationFn: (payload: IAuthPayload) =>
// 			authenticationApiRepository.verifyTokenAndSignup(payload),
// 		onSuccess(res) {
// 			showNotification({
// 				title: 'Registration successful.',
// 				color: 'teal',
// 				icon: <IconCheck size={16} />,
// 				message: '',
// 			});
// 			onSuccess(res?.data);
// 		},
// 		onError(error) {
// 			showNotification({
// 				title: 'Failed to register.',
// 				color: 'red',
// 				icon: <IconX size={16} />,
// 				message: error?.message,
// 			});
// 		},
// 	});

// 	// handle registration form submission
// 	const handleRegister = async (payload: IAuthPayload) => {
// 		mutate(payload);
// 	};

// 	return (
// 		<Flex justify='center' align='center' h='100vh'>
// 			<Box className='xs:w-11/12 lg:w-5/12 bg-white  p-5 drop-shadow-xl rounded-md'>
// 				<Title order={2} mb={10} ff={'Nunito sans, sans-serif'}>
// 					Register Now
// 				</Title>
// 				<form onSubmit={handleSubmit(handleRegister)}>
// 					<Input.Wrapper
// 						label='Name'
// 						my={10}
// 						error={<ErrorMessage errors={errors} name='name' />}
// 					>
// 						<TextInput
// 							disabled={isPending}
// 							{...register('name')}
// 							icon={<IconAt size={20} />}
// 							placeholder='Mehedi H. Rafiz'
// 							size='md'
// 							variant='filled'
// 						/>
// 					</Input.Wrapper>
// 					<Input.Wrapper
// 						label='Email'
// 						my={10}
// 						error={<ErrorMessage errors={errors} name='email' />}
// 					>
// 						<TextInput
// 							disabled={isPending}
// 							{...register('email')}
// 							icon={<IconMail size={20} />}
// 							placeholder='example@gmail.com'
// 							size='md'
// 							variant='filled'
// 						/>
// 					</Input.Wrapper>
// 					<Input.Wrapper
// 						label='Password'
// 						my={10}
// 						error={<ErrorMessage errors={errors} name='password' />}
// 					>
// 						<PasswordInput
// 							disabled={isPending}
// 							{...register('password')}
// 							icon={<IconLock size={20} />}
// 							placeholder='**** ****'
// 							size='md'
// 							variant='filled'
// 						/>
// 					</Input.Wrapper>
// 					<Button
// 						type='submit'
// 						color='violet'
// 						size='md'
// 						loading={isPending}
// 						fullWidth
// 						mt={10}
// 					>
// 						Register Now
// 					</Button>
// 				</form>
// 				<div className='text-left mt-3 text-pink-300'>
// 					<Link href='/auth/login'>
// 						<Button color='violet' leftIcon={<IconLogin size={18} />}>
// 							Login now
// 						</Button>
// 					</Link>
// 				</div>
// 			</Box>
// 		</Flex>
// 	);
// };

// export default MyAccountProfilePage;

// export const Register_Form_Validation_Schema = Yup.object().shape({
// 	name: Yup.string().required().label('Name'),
// 	email: Yup.string().email().required().label('Email'),
// 	password: Yup.string().required().min(8).max(20).label('Password'),
// });

// export interface IAuthPayload {
// 	token: string;
// }

const profile = () => {
	return <div>profile</div>;
};

export default profile;
