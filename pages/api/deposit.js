import { updateAccount } from '../../utils/dal';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { email, amount } = req.body;

		try {
			const user = await updateAccount(email, amount);
			res.status(200).json({
				success: true,
				user: user,
			});
		} catch (error) {
			console.error('Error in deposit:', error);
			res.status(500).json({
				message: 'Internal server error',
			});
		}
	} else {
		res.status(405).end();
	}
}
