import { NavBar } from '../components/navbar';
import Head from 'next/head';
import { CreateAccount } from '../components/createAccount';

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Account</title>
			</Head>
			<NavBar />
			<CreateAccount />
		</>
	);
}
