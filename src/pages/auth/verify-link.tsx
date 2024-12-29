import authenticationApiRepository from '@/app/api/repositories/authentication.repo';
import ProtectWithoutSession from '@/app/config/authProtection/protectWithoutSession';

import { Flex, Loader } from '@mantine/core/';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const VerifyMagicLinkAndAuthenticationPage: NextPage = () => {
	const router = useRouter(); // router instance

	// execute after success
	const onSuccess = (res: { token: string }) => {
		Cookies.set('user', JSON.stringify(res), {
			expires: 15 / (24 * 60),
			sameSite: 'strict',
		});
		if (router?.query?.callback) {
			router?.push(router?.query?.callback as string);
		} else {
			router?.push('/');
		}
	};

	// register mutation
	const { mutate } = useMutation({
		mutationKey: ['Register_Mutation'],
		mutationFn: () =>
			authenticationApiRepository.verifyTokenAndSignup({
				token: router?.query?.token as string,
			}),
		onSuccess(res) {
			showNotification({
				title: 'Registration successful.',
				color: 'teal',
				icon: <IconCheck size={16} />,
				message: '',
			});
			onSuccess(res?.data);
		},
		onError(error) {
			showNotification({
				title: 'Token has been expired.',
				color: 'red',
				icon: <IconX size={16} />,
				message: error?.message,
			});
		},
	});

	// verify token
	useEffect(() => {
		if (router?.query?.token) {
			mutate();
		}
	}, [router?.query?.token]);

	return (
		<Flex justify='center' align='center' h='100vh'>
			<Loader color={'violet'} size='lg' />
		</Flex>
	);
};

export default ProtectWithoutSession(VerifyMagicLinkAndAuthenticationPage);

export interface IAuthPayload {
	token: string;
}
