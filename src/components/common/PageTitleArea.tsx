import { Box, Indicator, Text, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import React from 'react';

interface IPageTitleProps {
	title: string;
	tagline?: string;
	currentPathName?: string;
	othersPath?: IOthersPathType[];
	actionComponent?: JSX.Element;
}

const PageTitleArea: React.FC<IPageTitleProps> = ({
	title,
	tagline,
	actionComponent,
}) => {
	// theme mode
	const [mode = 'light'] = useLocalStorage<any>({
		key: 'mode',
	});

	return (
		<Box className='lg:flex justify-between items-center grid gap-y-3'>
			<div>
				<Title
					order={3}
					fw={500}
					my={5}
					className={`${mode === 'dark' ? '!text-[#FFFFFF]' : '!text-slate-800'}`}
				>
					{title}
				</Title>
				{tagline && (
					<Indicator color='violet' position='middle-start' size={8}>
						<Text
							className={`${mode === 'dark' ? '!text-gray-400' : '!text-slate-800'} ml-2`}
							size='md'
						>
							{tagline}
						</Text>
					</Indicator>
				)}
			</div>
			{/* {currentPathName && (
				<div className='flex sm:justify-end justify-start items-center gap-3'>
					{othersPath?.map((path: IOthersPathType, idx: number) => (
						<Link
							key={idx}
							href={path?.href}
							className='no-underline text-violet-500 flex items-center gap-1'
						>
							{path?.pathName}
						</Link>
					))}

					<IconArrowRight size='20' />

					<Text>{currentPathName}</Text>
				</div>
			)} */}

			{actionComponent}
		</Box>
	);
};

export default PageTitleArea;

interface IOthersPathType {
	pathName: string;
	href: string;
}
