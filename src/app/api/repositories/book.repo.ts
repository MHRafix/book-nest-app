import { IBookFormStateType } from '@/components/custom/BookManagement/AddBookForm';
import { AxiosInstance } from 'axios';
import httpReq from '../http';
import { IBook, IBookWithPagination } from '../model/book.model';

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
	async getAllBook(url: string) {
		const res = await this.httpReq.get<IBookWithPagination>(url);
		return res?.data;
	}
	/**
	 * get books by user id
	 * @returns
	 */
	async getMyBook(id: string) {
		const res = await this.httpReq.get<IBook[]>(`/book/my-books/${id}`);
		return res?.data;
	}
}

const bookApiRepository = new BookApiRepository(httpReq);
export default bookApiRepository;
