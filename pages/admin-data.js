import { AdminData } from '../components/adminData';
import { NavBar } from '../components/navbar';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Admin Data</title>
			</Head>
			<NavBar />
			<AdminData />
		</>
	);
}
