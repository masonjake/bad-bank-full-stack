import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../utils/loginContext';

export function BalanceTable() {
	const { user, setUsers } = useContext(LoginContext);

	useEffect(() => {
		axios
			.post('/api/balance', {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				setUsers(response.data.users);
			})
			.catch((error) => {
				console.error('Error fetching users:', error);
			});
	}, [user]);

	return user ? (
		<div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">First Name</th>
						<th scope="col">Last Name</th>
						<th scope="col">Email</th>
						<th scope="col">Balance</th>
					</tr>
				</thead>
				<tbody>
					<tr key={user.email}>
						<td>{user.firstName}</td>
						<td>{user.lastName}</td>
						<td>{user.email}</td>
						<td>${user.balance}</td>
					</tr>
				</tbody>
			</table>
		</div>
	) : (
		<div>
			<p className="alert alert-danger" role="alert">
				You must be logged in to view your balance.
			</p>
		</div>
	);
}
