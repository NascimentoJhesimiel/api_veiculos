import fs from 'node:fs/promises';
import path from 'node:path';
import { URL } from 'node:url';
import { th } from 'zod/locales';

const __filename = new URL('../db/users.json');
const __dirname = path.dirname(__filename);

class UserRepository {
	constructor() {
		this.dbPath = path.join(__dirname, 'users.json');
	}

	async readDB() {
		const data = await fs.readFile(this.dbPath, { encoding });
		return JSON.parse(data);
	}

	async registerUser(email, password) {
		try {
			const data = await this.readDB();

			const newUser = { id: data.nextId, email, password };

			data.users.push(newUser);
			data.nextId++;

			await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2), {
				encoding,
			});

			return newUser;
		} catch (error) {
			return 'Error registiring user';
		}
	}

	async updateUserCredentials(id, email, password) {
		const data = await this.readDB();
		const userIndex = data.users.findIndex((user) => user.id === id);

		if (userIndex === -1) {
			return 'Vehicle not found';
		}

		data.users[userIndex] = { id, email, password };
		await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2), {
			encoding,
		});

		return data.users[userIndex];
	}

	async deleteUser(id) {
		const data = await this.readDB();
		const userIndex = data.users.findIndex((user) => user.id === id);

		if (userIndex === -1) {
			return 'User not found';
		}

		const userToBeDeleted = data.users[userIndex];
		data.users.splice(userIndex, 1);

		await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2), {
			encoding,
		});

		return null;
	}
}
