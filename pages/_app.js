import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import react, { useState } from 'react';
import { LoginContext } from '../utils/loginContext';

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState(null);
	return (
		<LoginContext.Provider value={{ user, setUser }}>
			<Component {...pageProps} />
		</LoginContext.Provider>
	);
}

export default MyApp;
