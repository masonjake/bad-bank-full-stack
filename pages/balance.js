import { Balance } from '../components/balance';
import { NavBar } from '../components/navbar';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Balance</title>
			</Head>
			<NavBar />
			<Balance />
		</>
	);
}
