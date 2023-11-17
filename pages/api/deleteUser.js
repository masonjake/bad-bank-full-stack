import { deleteAccount } from '../../utils/dal';

export default async function handler(req, res) {
	const { email } = req.body;

	try {
		const result = await deleteAccount(email);
		res.status(200).json(result);
	} catch (error) {
		console.error('Error in deleteUser:', error);
		res.status(500).json({ error: error.message });
	}
}
