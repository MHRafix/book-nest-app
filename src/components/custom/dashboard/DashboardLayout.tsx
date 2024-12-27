import { AppShell } from '@mantine/core';
import Head from 'next/head';
import { PropsWithChildren, useState } from 'react';
import DashboardHeader from './layout-components/DashboardHeader';
import DashboardNavbar from './layout-components/DashboardNavbar';

interface Props {
	title?: string;
	Actions?: React.ReactNode;
}

const DashboardLayout: React.FC<PropsWithChildren<Props>> = ({
	children,
	title,
	Actions,
}) => {
	const [opened, setOpened] = useState(false);
	return (
		<div>
			<Head>
				<title>Asia admin - {title ? title : 'Dashboard'}</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			<AppShell
				header={<DashboardHeader opened={opened} setOpened={setOpened} />}
				// navbarOffsetBreakpoint='sm'
				// asideOffsetBreakpoint='sm'
				navbar={<DashboardNavbar opened={opened} onOpened={setOpened} />}
			>
				<main className='sm:pr-2 px-0'>{children}</main>
			</AppShell>
		</div>
	);
};

export default DashboardLayout;
