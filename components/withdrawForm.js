import { useState, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../utils/loginContext';

export function WithdrawForm() {
	const [amount, setAmount] = useState(0);
	const [response, setResponse] = useState(null);
	const { user, setUser } = useContext(LoginContext);

	function handleSubmit(e) {
		e.preventDefault();
		const withdrawData = {
			email: user.email,
			amount: Number(amount),
		};

		axios
			.post('/api/withdraw', withdrawData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				setResponse('Withdrawal successful!');
				clearForm();

				if (response.data.success) {
					setUser((prevUser) => ({
						...prevUser,
						balance: response.data.user.balance,
					}));
				}
			})
			.catch((error) => {
				if (error.response) {
					setResponse('Withdrawal Failure!');
				} else {
					setResponse('Withdrawal Failure!');
					console.error('Error withdrawing:', error);
				}
			});
	}

	function clearForm() {
		setAmount(0);
	}

	return user ? (
		<>
			<h5>Balance: ${user.balance}</h5>
			<form id="withdraw" onSubmit={(e) => handleSubmit(e)}>
				Amount:
				<br />
				<input
					type="number"
					step={0.01}
					className="form-control"
					id="amount"
					placeholder="Enter Amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
				<br />
				{amount <= user.balance ? (
					<button type="submit" className="btn btn-dark">
						Withdraw
					</button>
				) : (
					<button type="submit" className="btn btn-dark" disabled>
						Amount must be less than the user balance
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
			You must be logged in to withdraw.
		</div>
	);
}
