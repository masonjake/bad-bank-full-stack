import { useState, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../utils/loginContext';

export function LoginForm() {
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const { user, setUser } = useContext(LoginContext);
	const [response, setResponse] = useState(null);

	function handleSubmit(e) {
		e.preventDefault();
		const loginData = {
			email: loginEmail,
			password: loginPassword,
		};

		axios
			.post('/api/login', loginData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				console.log('Login successful:', response.data.success);
				setUser(response.data.user);
				clearForm(response.data.success);
				setResponse('Login successful');
			})
			.catch((error) => {
				console.error('Error creating account:', error);
				setResponse('Login failed');
			});
	}

	function clearForm() {
		setLoginEmail('');
		setLoginPassword('');
		setResponse(null);
	}

	return user ? (
		<div className="alert alert-success" role="alert">
			Logged in
		</div>
	) : (
		<form id="login" onSubmit={(e) => handleSubmit(e)}>
			Email
			<br />
			<input
				type="email"
				className="form-control"
				id="email"
				placeholder="Enter Email"
				value={loginEmail}
				onChange={(e) => setLoginEmail(e.currentTarget.value)}
				required
			/>
			<br />
			Password
			<br />
			<input
				type="password"
				className="form-control"
				id="password"
				placeholder="Enter password"
				value={loginPassword}
				onChange={(e) => setLoginPassword(e.currentTarget.value)}
				required
			/>
			<br />
			<button type="submit" className="btn btn-dark">
				Login
			</button>
			<br />
			{user && (
				<div>
					<br />
					{response === 'Login successful' ? (
						<div className="alert alert-success" role="alert">
							{response}
						</div>
					) : (
						<div className="alert alert-danger" role="alert">
							{response}
						</div>
					)}
				</div>
			)}
		</form>
	);
}
