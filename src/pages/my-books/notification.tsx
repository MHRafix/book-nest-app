import DashboardLayout from '@/components/custom/dashboard/DashboardLayout';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const NotificationPage: NextPage = () => {
	// socket io initial and connect here
	useEffect(() => {
		const socket = io('http://localhost:8800/book');
		socket.on('connect', () => {
			console.log('Connected to WebSocket server');
		});

		socket.on('bookAdded', (book) => {
			console.log('New book added:', book);
		});
	}, []);

	return <DashboardLayout title='Notifications'>Notification</DashboardLayout>;
};

export default NotificationPage;
