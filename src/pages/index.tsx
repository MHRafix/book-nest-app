import { IBook } from '@/app/api/model/book.model';
import bookApiRepository from '@/app/api/repositories/book.repo';
import ProtectWithSession from '@/app/config/authProtection/protectWithSession';
import DrawerWrapper from '@/components/common/Drawer/DrawerWrapper';
import AddBookForm from '@/components/custom/BookManagement/AddBookForm';
import DashboardLayout from '@/components/custom/dashboard/DashboardLayout';
import { Button, Paper, Skeleton, Space, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useEffect } from 'react';
import PageTitleArea from '../components/common/PageTitleArea';

const HomePage: NextPage = () => {
	// drawer controller state
	const [opened, drawerHandler] = useDisclosure();

	// get all book list
	const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
		queryKey: ['all-book-list'],
		queryFn: () => bookApiRepository.getAllBook(),

		enabled: false,
	});

	useEffect(() => {
		refetch();
	}, []);
	console.log({ data: data });

	return (
		<DashboardLayout title='Book Management'>
			<PageTitleArea
				title='Book Management'
				tagline='Manage books catalog'
				actionComponent={
					<Button
						onClick={drawerHandler.open}
						leftIcon={<IconPlus />}
						variant='filled'
						color='violet'
					>
						Add new
					</Button>
				}
			/>

			<Space h={50} />

			{/* book list */}
			<div className='grid grid-cols-3 gap-5'>
				{isLoading ? (
					<>
						{new Array(15).fill(15).map((_, idx: number) => (
							<Skeleton key={idx} radius={10} h={200} />
						))}
					</>
				) : (
					<>
						{data?.books?.map((book: IBook, idx: number) => (
							<Paper key={idx} px={15} py={20}>
								<Title color='violet' order={3} fw={700}>
									{book?.title}
								</Title>{' '}
								<Text>{book?.author}</Text>
								<Text>{book?.genre}</Text>
								<Text>{book?.price ?? 0.0} BDT</Text>
								<Text>{book?.views ?? 0} Views</Text>
							</Paper>
						))}
					</>
				)}
			</div>

			{/* add new catalog form */}
			<DrawerWrapper
				opened={opened}
				close={drawerHandler.close}
				size='lg'
				title='Add new book catalog'
			>
				<AddBookForm onRefetch={refetch} onClose={drawerHandler.close} />
			</DrawerWrapper>
		</DashboardLayout>
	);
};

export default ProtectWithSession(HomePage);
