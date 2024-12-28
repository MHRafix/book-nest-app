import { signOut } from '@/app/config/logic/signOut';
import { Avatar, Box, Burger, Group, Menu, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { openConfirmModal } from '@mantine/modals';
import {
	IconBooks,
	IconLogout,
	IconSun,
	IconSunFilled,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

interface Props {
	opened: boolean;
	setOpened: (state: boolean) => void;
}

const DashboardHeader: React.FC<Props> = ({ opened, setOpened }) => {
	// theme mode
	const [mode = 'light', setMode] = useLocalStorage<any>({
		key: 'mode',
	});

	return (
		<Box
			className={`${mode === 'light' ? 'bg-[#FFFFFF]' : 'bg-slate-800'} lg:block flex justify-between items-center fixed w-full top-0 z-[99999] px-3 py-5 border-[0px] border-b-[1px] ${mode === 'light' ? 'border-b-300' : 'border-b-slate-600'}   border-solid`}
		>
			<Burger
				className='block lg:!hidden'
				opened={opened}
				onClick={() => setOpened(!opened)}
				size={40}
				// @ts-ignore
				color={opened && 'red'}
			/>

			<div className='flex justify-end items-center'>
				<Group>
					{mode === 'dark' ? (
						<IconSunFilled
							className='cursor-pointer'
							onClick={() => setMode('light')}
							size={30}
						/>
					) : (
						<IconSun
							className='cursor-pointer'
							onClick={() => setMode('dark')}
							size={30}
						/>
					)}

					<Menu width={200} withArrow>
						<Menu.Target>
							<Avatar
								variant='filled'
								className='cursor-pointer'
								color={'violet'}
								size={'lg'}
								radius={100}
							>
								M
							</Avatar>
						</Menu.Target>

						<Menu.Dropdown w={200}>
							<Menu.Item color='violet' icon={<IconBooks />}>
								<Link href={'/my-books'}>My Books</Link>
							</Menu.Item>
							<Menu.Item
								color='red'
								icon={<IconLogout />}
								onClick={() =>
									openConfirmModal({
										title: 'are you sure to log out?',
										children: (
											<Text>Proceed yes button to perform the action.</Text>
										),
										centered: true,
										labels: {
											confirm: 'Yes',
											cancel: 'No',
										},
										onConfirm: () => signOut(),
										onCancel: () => {},
									})
								}
							>
								Logout
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</div>
		</Box>
	);
};

export default DashboardHeader;
