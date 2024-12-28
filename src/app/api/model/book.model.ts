export interface IBookWithPagination {
	books: IBook[];
	page: number;
	limit: number;
	totalResult: number;
	totalCount: number;
	totalPages: number;
}

export interface IBook {
	_id: string;
	title: string;
	author: string;
	genre: string;
	price: number;
	views: number;
	createdAt: Date;
	updatedAt: Date;
}
