import { Deposit } from '../components/deposit';
import { NavBar } from '../components/navbar';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Deposit</title>
			</Head>
			<NavBar />
			<Deposit />
		</>
	);
}
