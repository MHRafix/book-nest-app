import { bookNestApplicationEmotionCache } from '@/utils/emotionCache';

import { MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { Notifications, showNotification } from '@mantine/notifications';
import { IconNotification } from '@tabler/icons-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import '../styles/global.css';
import '../styles/tailwindcss.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL;

	const socket = io(SOCKET_URL, {
		transports: ['websocket'], // Ensures WebSocket is used
		reconnection: true, // Enables reconnection
	});

	useEffect(() => {
		socket.on('connected', (data) => {
			// console.log('Connected to WebSocket server');
			// console.log(data);
		});

		// Listen for messages from the server
		socket.on('bookAdded', (data) => {
			const audio = new Audio('/assets/audio/notify.mp3').play(); // Path to your audio file
			showNotification({
				title: data,
				icon: <IconNotification />,
				color: 'teal',
				message: '',
			});
		});

		socket.on('disconnected', (data) => {
			console.log(data.message);
		});
		// Cleanup on component unmount
		return () => {
			socket.off('message');
		};
	}, []);
	// theme mode
	const [mode = 'light', setMode] = useLocalStorage<any>({
		key: 'mode',
	});

	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider
				emotionCache={bookNestApplicationEmotionCache}
				theme={{
					fontFamily: 'Nunito sans, sans-serif',
					colorScheme: mode || 'light',
					primaryColor: 'violet',
					breakpoints: {
						xs: '500',
						sm: '800',
						md: '1000',
						lg: '1200',
						xl: '1400',
					},
				}}
			>
				<Notifications position='top-right' zIndex={99999} />
				<ModalsProvider>
					<Component {...pageProps} />
				</ModalsProvider>
			</MantineProvider>
		</QueryClientProvider>
	);
}
