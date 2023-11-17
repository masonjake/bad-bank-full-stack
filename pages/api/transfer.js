import { transferFunds } from '../../utils/dal';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { senderEmail, recipientEmail, amount } = req.body;

		try {
			const user = await transferFunds(senderEmail, recipientEmail, amount);
			res.status(200).json({
				success: true,
				user: user,
			});
		} catch (error) {
			console.error('Error in transfer:', error);
			if (error.message === 'Recipient not found') {
				res.status(404).json({
					success: false,
					message: 'Recipient not found',
				});
			} else {
				res.status(500).json({
					success: false,
					message: 'Internal server error',
				});
			}
		}
	} else {
		res.status(405).end();
	}
}
