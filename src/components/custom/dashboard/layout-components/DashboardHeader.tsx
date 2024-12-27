import { Burger } from '@mantine/core';
import React from 'react';

interface Props {
	opened: boolean;
	setOpened: (state: boolean) => void;
}

const DashboardHeader: React.FC<Props> = ({ opened, setOpened }) => {
	return (
		<div className='px-3 py-2 border-[0px] border-b-[1px] border-b-slate-300 sm:!block md:!hidden border-solid'>
			<Burger
				// className='sm:!block md:!hidden'
				opened={opened}
				onClick={() => setOpened(!opened)}
				// @ts-ignore
				color={opened && 'red'}
			/>
		</div>
	);
};

export default DashboardHeader;
