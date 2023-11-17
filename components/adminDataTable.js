import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../utils/loginContext';

export function AdminDataTable() {
	const [users, setUsers] = useState([]);
	const { user } = useContext(LoginContext);

	const fetchUsers = () => {
		axios
			.post(
				'/api/adminData',
				{},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((response) => {
				setUsers(response.data.users);
			})
			.catch((error) => {
				console.error('Error fetching users:', error);
			});
	};

	function handleDelete(e, index) {
		e.preventDefault();
		const email = users[index].email;

		axios
			.post(
				'/api/deleteUser',
				{ email },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((response) => {
				console.log('User deleted:', response);
				fetchUsers(); // Re-fetch users to update the list
			})
			.catch((error) => {
				console.error('Error deleting user:', error);
			});
	}

	useEffect(() => {
		if (user && user.accountType === 'admin') {
			fetchUsers();
		}
	}, [user]);

	return user && user.accountType === 'admin' ? (
		<div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">First Name</th>
						<th scope="col">Last Name</th>
						<th scope="col">Email</th>
						<th scope="col">Password</th>
						<th scope="col">Account Type</th>
						<th scope="col">Balance</th>
						<th scope="col">Delete</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={user.email}>
							<td>{user.firstName}</td>
							<td>{user.lastName}</td>
							<td>{user.email}</td>
							<td>{user.password}</td>
							<td>{user.accountType}</td>
							<td>${user.balance}</td>
							<td>
								<button
									className="btn btn-dark"
									onClick={(e) => handleDelete(e, index)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	) : (
		<div>
			<p className="alert alert-danger" role="alert">
				You must be logged in as an admin to view this page.
			</p>
		</div>
	);
}
