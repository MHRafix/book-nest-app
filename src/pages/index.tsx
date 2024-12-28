import { IBook } from '@/app/api/model/book.model';
import bookApiRepository from '@/app/api/repositories/book.repo';
import ProtectWithSession from '@/app/config/authProtection/protectWithSession';
import DrawerWrapper from '@/components/common/Drawer/DrawerWrapper';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import AddBookForm from '@/components/custom/BookManagement/AddBookForm';
import DashboardLayout from '@/components/custom/dashboard/DashboardLayout';
import {
	Button,
	Input,
	Paper,
	RangeSlider,
	Select,
	Skeleton,
	Space,
	Text,
	Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import PageTitleArea from '../components/common/PageTitleArea';

const HomePage: NextPage = () => {
	// router
	const router = useRouter();

	// drawer controller state
	const [opened, drawerHandler] = useDisclosure();
	const [publicationDate, setPublicationDate] = useState<string | null>(null);
	const [priceRange, setPriceRange] = useState<number[]>();
	const [genre, setGenre] = useState<string>('');
	const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
	const [sortBy, setSortBy] = useState<string>('');
	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);

	// get all book list
	const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
		queryKey: ['all-book-list'],
		queryFn: () => bookApiRepository.getAllBook(handleFilter()),
		enabled: false,
	});

	// fetch all book
	useEffect(() => {
		refetch();
	}, [limit, page]);

	// handle filtering
	const handleFilter = () => {
		let url = `/book/all-books?limit=${limit}&page=${page}&order=${sortType}`;

		if (publicationDate) {
			url += `&publicationDate=${publicationDate}`;
		}
		if (priceRange?.length) {
			url += `&minPrice=${priceRange[0]}`;
			url += `&maxPrice=${priceRange[1]}`;
		}
		if (sortBy) {
			url += `&sortBy=${sortBy}`;
		}
		if (genre) {
			url += `&genre=${genre.charAt(0).toUpperCase() + genre.slice(1)}`;
		}

		return url;
	};

	const handlePageClick = (event: any) => {
		setPage(event?.selected + 1);
		console.log(event);
	};

	return (
		<DashboardLayout title='Book Management'>
			<PageTitleArea
				title='Book Management'
				tagline='Manage books catalog'
				actionComponent={
					<div className='lg:flex grid gap-3 items-center'>
						{' '}
						Price range:{' '}
						<RangeSlider
							minRange={1}
							bg={'teal'}
							p={10}
							min={0}
							max={10000}
							w={220}
							defaultValue={[1, 1000]}
							onChange={setPriceRange}
						/>
						<Input
							onChange={(e) => setGenre(e.target.value)}
							defaultValue={genre}
							placeholder='Filter by Genre'
						/>
						<DateInput
							onChange={(e: Date) =>
								setPublicationDate(new Date(e).toISOString().split('T')[0])
							}
							placeholder='Filter by publication date'
						/>
						<Select
							data={[
								{ label: 'Asc', value: 'asc' },
								{ label: 'Desc', value: 'desc' },
							]}
							placeholder='Sort type'
							onChange={(e) => setSortType(e as any)}
							defaultValue={sortType}
						/>
						<Select
							data={[
								{ label: 'Title', value: 'title' },
								{ label: 'Genre', value: 'genre' },
								{ label: 'CreatedAt', value: 'createdAt' },
								{ label: 'UpdatedAt', value: 'updatedAt' },
							]}
							placeholder='Sort by'
							clearable
							onChange={(e) => setSortBy(e!)}
							value={sortBy}
						/>
						<Button
							onClick={() => refetch()}
							leftIcon={<IconFilter />}
							variant='light'
							color='teal'
							loading={isFetching}
						>
							Filter
						</Button>
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
						</div>
						<div className='md:w-8/12 mx-auto'>
							{' '}
							<EmptyPanel
								title='No Book found.'
								isShow={!Boolean(data?.books?.length)}
							/>
						</div>
						{data?.books?.length ? (
							<div className='flex gap-5 justify-center items-center my-5'>
								<Select
									data={[
										'5',
										'10',
										'20',
										'30',
										'40',
										'50',
										'60',
										'70',
										'80',
										'90',
										'100',
									]}
									onChange={(e) => {
										setLimit(parseInt(e as string));
										setPage(1);
									}}
									value={limit.toString()}
								/>
								<ResponsivePagination
									current={page}
									total={Math.ceil(data?.totalCount! / data?.limit!)}
									onPageChange={setPage}
								/>
							</div>
						) : null}
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

export default ProtectWithSession(HomePage);
