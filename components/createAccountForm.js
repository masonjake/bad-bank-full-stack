import { useState, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../utils/loginContext';

export function CreateAccountForm() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [response, setResponse] = useState(null);
	const [accountType] = useState('user');
	const [balance] = useState(0);
	const { user, setUser } = useContext(LoginContext);

	function handleSubmit(e) {
		e.preventDefault();
		const userData = {
			firstName,
			lastName,
			email,
			password,
			accountType,
			balance,
		};

		axios
			.post('/api/createAccount', userData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				console.log('Account created:', response.data.success);
				setResponse(response.data.success);
				setUser(userData);
				clearForm(response.data.success);
			})
			.catch((error) => {
				setResponse(false);
				console.error('Error creating account:', error);
			});
	}

	function clearForm() {
		setFirstName('');
		setLastName('');
		setEmail('');
		setPassword('');
		setResponse(null);
	}

	return user ? (
		<div className="alert alert-success" role="alert">
			Account created and Logged in!
		</div>
	) : (
		<form id="create-account" onSubmit={(e) => handleSubmit(e)}>
			First Name
			<br />
			<input
				type="input"
				className="form-control"
				id="firstName"
				placeholder="Enter First Name"
				value={firstName}
				onChange={(e) => setFirstName(e.currentTarget.value)}
				required
			/>
			<br />
			Last Name
			<input
				type="input"
				className="form-control"
				id="lastName"
				placeholder="Enter Last Name"
				value={lastName}
				onChange={(e) => setLastName(e.currentTarget.value)}
				required
			/>
			<br />
			Email
			<br />
			<input
				type="email"
				className="form-control"
				id="email"
				placeholder="Enter Email"
				value={email}
				onChange={(e) => setEmail(e.currentTarget.value)}
				required
			/>
			<br />
			Password
			<br />
			<input
				type="password"
				className="form-control"
				id="password"
				placeholder="Enter Password"
				value={password}
				onChange={(e) => setPassword(e.currentTarget.value)}
				required
			/>
			<br />
			<button type="submit" className="btn btn-dark">
				Create Account
			</button>
			<div>
				<div>
					{response === true && (
						<p className="alert alert-success">Account Created!</p>
					)}
					{response === false && (
						<p className="alert alert-danger">Account not created</p>
					)}
				</div>
			</div>
		</form>
	);
}
