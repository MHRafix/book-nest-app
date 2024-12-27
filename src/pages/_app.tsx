import { bookNestApplicationEmotionCache } from '@/utils/emotionCache';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import '../styles/global.css';
import '../styles/tailwindcss.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider
				emotionCache={bookNestApplicationEmotionCache}
				theme={{
					fontFamily: 'Nunito sans, sans-serif',
					colorScheme: 'light',
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
