import { findAll } from '../../utils/dal.js';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const user = await findAll();
			res.status(200).json({
				success: true,
				users: user,
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
