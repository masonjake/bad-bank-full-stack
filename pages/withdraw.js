import { Withdraw } from '../components/withdraw';
import { NavBar } from '../components/navbar';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Withdraw</title>
			</Head>
			<NavBar />
			<Withdraw />
		</>
	);
}
