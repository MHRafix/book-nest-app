import { IAuthPayload } from '@/pages/auth/verify-link';
import { AxiosInstance } from 'axios';
import httpReq from '../http';
import { IUser } from '../model/user.model';

class UserApiRepository {
	constructor(private httpReq: AxiosInstance) {}

	/**
	 * get single user api
	 * @param id string
	 * @returns
	 */
	getUser(id: string) {
		return this.httpReq.get<IUser>(`/user/${id}`);
	}

	/**
	 * get all user api
	 * @returns
	 */
	async getUsers() {
		const res = await this.httpReq.get<IUser[]>(`/user/all-users`);
		return res?.data;
	}

	/**
	 * send magic link api
	 * @param payload
	 * @returns
	 */
	sendMagicLink(payload: IAuthPayload) {
		return this.httpReq.post<{ token: string; _id: string }>(
			`/authentication/send-magic-link`,
			payload
		);
	}

	/**
	 * verify token and user signup api
	 * @param payload
	 * @returns
	 */
	verifyTokenAndSignup(payload: IAuthPayload) {
		return this.httpReq.post<{ token: string }>(
			`/authentication/verify-link`,
			payload
		);
	}

	/**
	 *  update user api
	 * @param id string
	 * @param payload
	 * @returns
	 */
	updateUser(id: string, payload: IUser) {
		return this.httpReq.patch(`/user/${id}`, payload);
	}
}

const userApiRepository = new UserApiRepository(httpReq);
export default userApiRepository;
