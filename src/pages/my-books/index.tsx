import { IBook } from '@/app/api/model/book.model';
import bookApiRepository from '@/app/api/repositories/book.repo';
import ProtectWithSession from '@/app/config/authProtection/protectWithSession';
import { useGetSession } from '@/app/config/logic/getSession';
import DrawerWrapper from '@/components/common/Drawer/DrawerWrapper';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import PageTitleArea from '@/components/common/PageTitleArea';
import AddBookForm from '@/components/custom/BookManagement/AddBookForm';
import DashboardLayout from '@/components/custom/dashboard/DashboardLayout';
import { Button, Paper, Skeleton, Space, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useEffect } from 'react';
import 'react-responsive-pagination/themes/classic.css';

const MyBooksPage: NextPage = () => {
	// user session
	const { isLoading: isSessionLoading, user: loggedUser } = useGetSession();

	// drawer controller state
	const [opened, drawerHandler] = useDisclosure();

	// get all book list
	const { isLoading, data, refetch, isFetching } = useQuery({
		queryKey: [`my-books-${loggedUser?._id}`],
		queryFn: () => bookApiRepository.getMyBook(loggedUser?._id as string),
		enabled: false,
	});
	// fetch all book
	useEffect(() => {
		refetch();
	}, [loggedUser]);

	return (
		<DashboardLayout title='My Books'>
			<PageTitleArea
				title='My Books'
				tagline='Manage my books'
				actionComponent={
					<div className='lg:flex grid gap-3 items-center'>
						<Button
							onClick={drawerHandler.open}
							leftIcon={<IconPlus />}
							variant='filled'
							color='violet'
						>
							Add new
						</Button>
					</div>
				}
			/>

			<Space h={50} />

			{/* book list */}
			<div>
				{isLoading || isFetching ? (
					<div className='grid lg:grid-cols-3  md:grid-cols-2 gap-5'>
						{new Array(15).fill(15).map((_, idx: number) => (
							<Skeleton key={idx} radius={10} h={200} />
						))}
					</div>
				) : (
					<div>
						<div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5'>
							{data?.map((book: IBook, idx: number) => (
								<Paper key={idx} px={15} py={20} withBorder>
									<Title color='violet' order={3} fw={700}>
										{book?.title}
									</Title>{' '}
									<Text>{book?.author}</Text>
									<Text>{book?.genre}</Text>
									<Text>{book?.price ?? 0.0} BDT</Text>
									<Text>{book?.views ?? 0} Views</Text>
								</Paper>
							))}
						</div>
						<div className='md:w-8/12 mx-auto'>
							{' '}
							<EmptyPanel
								title='No Book found.'
								isShow={!Boolean(data?.length)}
							/>
						</div>
					</div>
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

export default ProtectWithSession(MyBooksPage);
