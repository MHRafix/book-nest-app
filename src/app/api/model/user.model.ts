export interface IUser {
	_id: string;
	name: string;
	email: string;
	avatar: string;
	accessToken: string;
	role: 'LEARNER' | 'ADMIN';
}
