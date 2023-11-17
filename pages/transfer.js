import { Transfer } from '../components/transfer';
import { NavBar } from '../components/navbar';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Transfer</title>
			</Head>
			<NavBar />
			<Transfer />
		</>
	);
}
