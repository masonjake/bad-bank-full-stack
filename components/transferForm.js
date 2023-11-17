import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { LoginContext } from '../utils/loginContext';

export function TransferForm() {
	const [amount, setAmount] = useState(0);
	const [recipientEmail, setRecipientEmail] = useState('');
	const [response, setResponse] = useState(null);
	const { user, setUser } = useContext(LoginContext);

	function handleSubmit(e) {
		e.preventDefault();
		const transferData = {
			senderEmail: user.email,
			recipientEmail,
			amount: Number(amount),
		};

		axios
			.post('/api/transfer', transferData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				setResponse('Transfer successful');
				clearForm(response.data.success);
				console.log(response.data);
				if (response.data.success) {
					setUser((prevUser) => ({
						...prevUser,
						balance: response.data.user.user.balance,
					}));
				}
			})
			.catch((error) => {
				if (error.response) {
					setResponse('user not found');
				} else {
					console.error('Error transferring:', error);
				}
			});
	}

	function clearForm() {
		setAmount(0);
	}

	return user ? (
		<>
			<div>Balance: ${user.balance}</div>
			<form id="transfer" onSubmit={(e) => handleSubmit(e)}>
				Recipient Email:
				<br />
				<input
					type="email"
					step={0.01}
					className="form-control"
					id="email"
					placeholder="Enter Email"
					value={recipientEmail}
					required
					onChange={(e) => setRecipientEmail(e.target.value)}
				/>
				<br />
				Amount:
				<input
					type="number"
					step={0.01}
					className="form-control"
					id="amount"
					placeholder="Enter Amount"
					value={amount}
					required
					onChange={(e) => setAmount(e.target.value)}
				/>
				<br />
				{amount >= 0.01 ? (
					<button type="submit" className="btn btn-dark">
						Transfer
					</button>
				) : (
					<button type="submit" className="btn btn-dark" disabled>
						Amount must be greater then $0.01
					</button>
				)}
				<br />
				{response && (
					<div>
						<br />
						{response ? (
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
		</>
	) : (
		<div className="alert alert-danger" role="alert">
			You must be logged in to transfer.
		</div>
	);
}
