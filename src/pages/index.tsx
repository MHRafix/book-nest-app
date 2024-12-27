import protectWithSession from '@/app/config/authProtection/protectWithSession';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
	return <div className='flex justify-center items-center h-screen'>aaaa</div>;
};

export default protectWithSession(HomePage);
