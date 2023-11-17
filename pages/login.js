import { NavBar } from '../components/navbar';
import Head from 'next/head';
import { Login } from '../components/login';

export default function Home() {
	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<NavBar />
			<Login />
		</>
	);
}
