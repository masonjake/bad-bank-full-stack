import { Home } from '../components/home.js';
import { NavBar } from '../components/navbar.js';
import Head from 'next/head';

export default function App() {
	return (
		<>
			<Head>
				<title>Bad Bank</title>
			</Head>
			<NavBar />
			<Home />
		</>
	);
}
