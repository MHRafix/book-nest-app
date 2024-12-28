import { Drawer, Title } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

const DrawerWrapper: React.FC<
	PropsWithChildren<{
		opened: boolean;
		title: string;
		size: string;
		close: () => void;
	}>
> = ({ children, opened, title, close, size }) => {
	return (
		<>
			<Drawer
				position='right'
				size={size}
				zIndex={999999}
				opened={opened}
				onClose={close}
				title={
					<Title order={4} ff={'Nunito Sans,sans-serif'}>
						{title}
					</Title>
				}
				className='mt-[60px]  overflow-y-auto'
			>
				{children}
			</Drawer>
		</>
	);
};

export default DrawerWrapper;
