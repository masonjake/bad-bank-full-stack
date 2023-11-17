import Link from 'next/link';
import { useContext } from 'react';
import { LoginContext } from '../utils/loginContext.js';

export function NavBar() {
	const { user, setUser } = useContext(LoginContext);

	function handleLogout() {
		setUser(null);
	}

	return (
		<nav className="navbar navbar-expand bg-body-tertiary">
			<div className="container-fluid">
				<ul className="navbar-nav me-auto">
					<li className="nav-item">
						<Link className="nav-link" href="/">
							Home
						</Link>
					</li>

					<li className="nav-item">
						<Link className="nav-link" href="/deposit">
							Deposit
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" href="/withdraw">
							Withdraw
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" href="/transfer">
							Transfer
						</Link>
					</li>
					{user && user.accountType === 'admin' ? (
						<li className="nav-item">
							<Link className="nav-link" href="/admin-data">
								Admin Data
							</Link>
						</li>
					) : (
						<li className="nav-item">
							<Link className="nav-link" href="/balance">
								Balance
							</Link>
						</li>
					)}
				</ul>
				<ul className="navbar-nav ms-auto">
					{user ? (
						<li className="nav-item ml-auto">
							<a className="nav-link" onClick={handleLogout}>
								Logout of {user.email}
							</a>
						</li>
					) : (
						<>
							<li className="nav-item mx-auto">
								<Link className="nav-link" href="/create-account">
									Create Account
								</Link>
							</li>
							<li className="nav-item mr-auto">
								<Link className="nav-link" href="/login">
									Login
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}
