const { createAccount } = require('../../utils/dal');

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res
			.status(405)
			.json({ success: false, message: 'Method not allowed' });
	}

	const { firstName, lastName, email, password, accountType, balance } =
		req.body;

	try {
		const accountData = {
			firstName,
			lastName,
			email,
			password,
			accountType,
			balance,
		};
		const user = await createAccount(accountData);
		res.status(201).json({ success: true, data: user });
	} catch (error) {
		console.error('Error in createAccount API handler:', error);
		res.status(500).json({ success: false, error: error.message });
	}
}
