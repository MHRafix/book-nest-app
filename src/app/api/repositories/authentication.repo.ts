import { ISendMagicLinkPayload } from '@/pages/auth/login';
import { IAuthPayload } from '@/pages/auth/verify-link';
import { AxiosInstance } from 'axios';
import httpReq from '../http';

class AuthenticationApiRepository {
	constructor(private httpReq: AxiosInstance) {}

	/**
	 * send magic link api
	 * @param payload
	 * @returns
	 */
	sendMagicLink(payload: ISendMagicLinkPayload) {
		return this.httpReq.post<{ token: string }>(
			`/authentication/send-magic-link`,
			payload
		);
	}

	/**
	 * verify token and user signup api
	 * @param payload
	 * @returns
	 */
	verifyTokenAndSignup({ token }: IAuthPayload) {
		return this.httpReq.get<{ token: string }>(
			`/authentication/verify-link?token=${token}`
		);
	}
}

const authenticationApiRepository = new AuthenticationApiRepository(httpReq);
export default authenticationApiRepository;
