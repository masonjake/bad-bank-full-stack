import { find } from '../../utils/dal.js';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { email } = req.body;

		try {
			const user = await find(email);

			res.status(200).json({ success: true, user: user });
		} catch (error) {
			console.error('Error in login:', error);
			res.status(500).json({ message: 'Internal server error' });
		}
	} else {
		res.status(405).end();
	}
}
