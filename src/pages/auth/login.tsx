import protectWithoutSession from '@/app/config/authProtection/potectWithoutSession';

import authenticationApiRepository from '@/app/api/repositories/authentication.repo';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Flex, Input, Title } from '@mantine/core/';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconMail, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const LoginPage: NextPage = () => {
	const router = useRouter();

	// login form
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: { email: '' },
		resolver: yupResolver(Login_Form_Validation_Schema),
	});

	// execute after success
	// const onSuccess = (res: { token: string; _id: string }) => {
	// 	Cookies.set('user', JSON.stringify(res), {
	// 		expires: 5,
	// 		sameSite: 'strict',
	// 	});
	// 	if (router?.query?.callback) {
	// 		router?.push(router?.query?.callback as string);
	// 	} else {
	// 		router?.push('/');
	// 	}
	// };

	// login mutation
	const { mutate, isPending } = useMutation({
		mutationKey: ['Login_Mutation'],
		mutationFn: (payload: ISendMagicLinkPayload) =>
			authenticationApiRepository.sendMagicLink(payload),
		onSuccess(res) {
			showNotification({
				title: 'Link successfully has been sent to your email.',
				color: 'teal',
				icon: <IconCheck size={16} />,
				message: 'Please check your email inbox.',
			});
		},
		onError(error) {
			showNotification({
				title: 'Failed to send link.',
				color: 'red',
				icon: <IconX size={16} />,
				message: error?.message,
			});
		},
	});

	// handle form submission
	const handleLogin = (payload: ISendMagicLinkPayload) => {
		mutate(payload);
	};

	return (
		<Flex justify='center' align='center' h='100vh'>
			<Box className='xs:w-11/12 lg:w-5/12 bg-white  p-5 drop-shadow-xl rounded-md'>
				<Title order={2} mb={10} ff={'Nunito sans, sans-serif'}>
					Login Now
				</Title>
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

					<Button
						type='submit'
						color='violet'
						size='md'
						loading={isPending}
						fullWidth
						mt={10}
					>
						Login now
					</Button>
				</form>
			</Box>
		</Flex>
	);
};

export default protectWithoutSession(LoginPage);

export const Login_Form_Validation_Schema = Yup.object().shape({
	email: Yup.string().email().required().label('Email'),
});

export interface ISendMagicLinkPayload {
	email: string;
}
