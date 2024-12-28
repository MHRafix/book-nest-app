import { IBookFormStateType } from '@/components/custom/BookManagement/AddBookForm';
import { AxiosInstance } from 'axios';
import httpReq from '../http';
import { IBookWithPagination } from '../model/book.model';

class BookApiRepository {
	constructor(private httpReq: AxiosInstance) {}

	/**
	 * add book api
	 * @param payload
	 * @returns
	 */
	addBook(payload: IBookFormStateType) {
		return this.httpReq.post(`/book/create`, payload);
	}

	/**
	 * get all book api
	 * @returns
	 */
	async getAllBook(
		publicationDate?: string,
		priceRange?: number[],
		genre?: string,
		sortType?: string,
		sortBy?: string,
		limit?: number,
		page?: number
	) {
		const res = await this.httpReq.get<IBookWithPagination>(
			`/book/all-books?publicationDate=${publicationDate}&minPrice=${priceRange?.[0]}&maxPrice=${priceRange?.[1]}&genre=${genre}&order=${sortType}&sortBy=${sortBy}&limit=${limit}&page=${page}`
		);
		return res?.data;
	}
}

const bookApiRepository = new BookApiRepository(httpReq);
export default bookApiRepository;
