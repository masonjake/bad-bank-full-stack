const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
	'mongodb+srv://jake:he5Dl8yxPqB15YsV@cluster0.taydgpr.mongodb.net/badBank?tls=true';
const dbName = 'badBank';
let db = null;

async function connectDB() {
	if (db) return db;

	try {
		const client = new MongoClient(uri, {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			},
		});

		await client.connect();
		db = client.db(dbName);
		return db;
	} catch (error) {
		console.error('Database connection error:', error);
		throw new Error('Failed to connect to database');
	}
}

async function createAccount(accountData) {
	try {
		const db = await connectDB();
		const collection = db.collection('accounts');
		const result = await collection.insertOne(accountData);
		return result;
	} catch (error) {
		console.error('Error in createAccount:', error);
		throw new Error('Failed to create account');
	}
}

async function find(email) {
	try {
		const db = await connectDB();
		const collection = db.collection('accounts');
		const account = await collection.findOne({ email: email });
		return account;
	} catch (error) {
		console.error('Error in find:', error);
		throw new Error('Failed to find account');
	}
}

async function findAll() {
	try {
		const db = await connectDB();
		const collection = db.collection('accounts');
		return collection.find({}).toArray();
	} catch (error) {
		console.error('Error in findAll:', error);
		throw new Error('Failed to find all accounts');
	}
}

async function updateAccount(email, amount) {
	try {
		const db = await connectDB();
		const collection = db.collection('accounts');
		return collection.findOneAndUpdate(
			{ email: email },
			{ $inc: { balance: amount } },
			{ returnDocument: 'after' }
		);
	} catch (error) {
		console.error('Error in updateAccount:', error);
		throw new Error('Failed to update account');
	}
}

async function transferFunds(senderEmail, recipientEmail, amount) {
	try {
		const db = await connectDB();
		const collection = db.collection('accounts');

		const recipient = await collection.findOne({ email: recipientEmail });
		if (!recipient) {
			throw new Error('Recipient not found');
		}

		await collection.findOneAndUpdate(
			{ email: senderEmail },
			{ $inc: { balance: -amount } },
			{ returnDocument: 'after' }
		);

		await collection.findOneAndUpdate(
			{ email: recipientEmail },
			{ $inc: { balance: amount } },
			{ returnDocument: 'after' }
		);

		const updatedUser = await collection.findOne({ email: senderEmail });

		return {
			success: true,
			user: updatedUser,
		};
	} catch (error) {
		console.error('Error in transferFunds:', error);
		throw new Error('Failed to transfer funds');
	}
}

async function deleteAccount(email) {
	try {
		const db = await connectDB();
		const collection = db.collection('accounts');
		return collection.deleteOne({ email: email });
	} catch (error) {
		console.error('Error in deleteAccount:', error);
		throw new Error('Failed to delete account');
	}
}

module.exports = {
	createAccount,
	find,
	findAll,
	deleteAccount,
	updateAccount,
	transferFunds,
};
