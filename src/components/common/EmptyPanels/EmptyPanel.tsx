import { Paper, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

const EmptyPanel: React.FC<{
	isShow: boolean;
	title: string;
}> = ({ isShow, title }) => {
	if (!isShow) {
		return null;
	}

	return (
		<Paper className='text-center shadow-md rounded-lg p-4'>
			<Image
				src={'/assets/emptyPanel/book.png'}
				alt='image'
				width={150}
				height={150}
				className='mx-auto'
			/>

			<Text mt={20} ff={'Nunito sans, sans-serif'} fw={700}>
				{title}
			</Text>
			<Text my={5} ff={'Nunito sans, sans-serif'}>
				There is no data available.
			</Text>
		</Paper>
	);
};

export default EmptyPanel;
